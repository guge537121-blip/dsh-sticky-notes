import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { homedir } from 'node:os'

export const name = 'dsh-sticky-notes'

// Host 依赖：真实 DSH web profile 提供 webServer。
export const inject = ['webServer']

const API_PREFIX = '/dsh-sticky-notes/api'
const DATA_FILE_NAME = 'sticky-notes.json'
const DATA_VERSION = 1
const DEFAULT_PAGE_SIZE = 10
const MAX_CONTENT_LENGTH = 256 * 1024
const MAX_NOTES = 5000
const BODY_LIMIT = 1024 * 1024

function getDshHome() {
  // DSH 的默认 home 在当前目标环境中通常位于 ~/.dsh。
  // 如运行环境通过 DSH_HOME 显式指定，则优先使用它。
  return process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')
}

function getDataPath() {
  return join(getDshHome(), DATA_FILE_NAME)
}

function normalizeString(value) {
  return typeof value === 'string' ? value : ''
}

function isIsoDate(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function normalizeNote(value) {
  if (!value || typeof value !== 'object') return null
  const id = normalizeString(value.id)
  const content = normalizeString(value.content)
  const createdAt = normalizeString(value.createdAt)
  const updatedAt = normalizeString(value.updatedAt)
  if (!id || !createdAt || !updatedAt) return null
  if (!isIsoDate(createdAt) || !isIsoDate(updatedAt)) return null
  if (content.length > MAX_CONTENT_LENGTH) return null
  const pinned = value.pinned === true
  return { id, content, createdAt, updatedAt, pinned }
}

function normalizeDocument(value) {
  if (Array.isArray(value)) {
    // 兼容最早的数组格式。
    return {
      version: DATA_VERSION,
      notes: value.map(normalizeNote).filter(Boolean),
    }
  }
  if (!value || typeof value !== 'object') {
    return { version: DATA_VERSION, notes: [] }
  }
  const rawNotes = Array.isArray(value.notes) ? value.notes : []
  return {
    version: DATA_VERSION,
    notes: rawNotes.map(normalizeNote).filter(Boolean),
  }
}

async function ensureStorage() {
  const file = getDataPath()
  await mkdir(dirname(file), { recursive: true })
  try {
    await stat(file)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
    await atomicWrite(file, { version: DATA_VERSION, notes: [] })
  }
  return file
}

async function loadDocument() {
  const file = await ensureStorage()
  try {
    const raw = await readFile(file, 'utf8')
    const parsed = JSON.parse(raw)
    const normalized = normalizeDocument(parsed)

    // 若旧格式或脏数据被规范化，进行一次迁移保存。
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      await atomicWrite(file, normalized)
    }
    return normalized
  } catch (error) {
    const backup = `${file}.corrupt-${Date.now()}`
    try {
      await rename(file, backup)
    } catch {
      // 如果备份失败，不阻断恢复流程。
    }
    const recovered = { version: DATA_VERSION, notes: [] }
    await atomicWrite(file, recovered)
    console.error(`[${name}] sticky notes data was corrupted; recovered as empty store`, error)
    return recovered
  }
}

async function atomicWrite(file, document) {
  const temp = `${file}.tmp-${process.pid}-${Date.now()}`
  const payload = `${JSON.stringify(document, null, 2)}\n`
  await writeFile(temp, payload, 'utf8')
  await rename(temp, file)
}

function sortNotes(notes, sortBy) {
  return [...notes].sort((a, b) => {
    // 置顶优先
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1

    if (sortBy === 'oldest') {
      return Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
    } else if (sortBy === 'title') {
      const ta = (a.content.split('\n')[0] || '').trim().toLocaleLowerCase()
      const tb = (b.content.split('\n')[0] || '').trim().toLocaleLowerCase()
      return ta.localeCompare(tb)
    } else if (sortBy === 'title-desc') {
      const ta = (a.content.split('\n')[0] || '').trim().toLocaleLowerCase()
      const tb = (b.content.split('\n')[0] || '').trim().toLocaleLowerCase()
      return tb.localeCompare(ta)
    }
    // 默认：最新优先
    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
  })
}

function searchNotes(notes, query) {
  const q = normalizeString(query).trim().toLocaleLowerCase()
  if (!q) return notes
  return notes.filter(note => note.content.toLocaleLowerCase().includes(q))
}

function parsePage(value) {
  const page = Number.parseInt(value ?? '1', 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

function parsePageSize(value) {
  const size = Number.parseInt(value ?? String(DEFAULT_PAGE_SIZE), 10)
  if (!Number.isFinite(size) || size <= 0) return DEFAULT_PAGE_SIZE
  return Math.min(size, 50)
}

function setJson(res, status, payload) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

async function readJsonBody(req) {
  const chunks = []
  let total = 0
  for await (const chunk of req) {
    total += chunk.length
    if (total > BODY_LIMIT) {
      throw Object.assign(new Error('request body too large'), { statusCode: 413 })
    }
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  let value
  try {
    value = JSON.parse(raw)
  } catch {
    throw Object.assign(new Error('invalid JSON'), { statusCode: 400 })
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw Object.assign(new Error('request body must be an object'), { statusCode: 400 })
  }
  return value
}

function validateContent(value) {
  const content = normalizeString(value)
  if (content.length > MAX_CONTENT_LENGTH) {
    throw Object.assign(new Error(`content exceeds ${MAX_CONTENT_LENGTH} characters`), { statusCode: 400 })
  }
  return content
}

export function apply(ctx) {
  // 单进程串行写队列，避免连续编辑产生乱序落盘。
  let writeChain = Promise.resolve()

  async function persist(document) {
    writeChain = writeChain.then(() => atomicWrite(getDataPath(), document))
    return writeChain
  }

  async function listNotes(url) {
    const document = await loadDocument()
    const filtered = searchNotes(document.notes, url.searchParams.get('query') ?? '')
    const sortBy = url.searchParams.get('sort') ?? 'newest'
    const sorted = sortNotes(filtered, sortBy)
    const page = parsePage(url.searchParams.get('page'))
    const pageSize = parsePageSize(url.searchParams.get('pageSize'))
    const total = sorted.length
    const pageCount = Math.max(1, Math.ceil(total / pageSize))
    const safePage = Math.min(page, pageCount)
    const start = (safePage - 1) * pageSize
    const notes = sorted.slice(start, start + pageSize)

    return {
      notes,
      total,
      page: safePage,
      pageSize,
      pageCount,
    }
  }

  async function getNote(id) {
    const document = await loadDocument()
    return document.notes.find(note => note.id === id) ?? null
  }

  async function createNote(content) {
    const value = validateContent(content)
    const document = await loadDocument()
    if (document.notes.length >= MAX_NOTES) {
      throw Object.assign(new Error(`maximum of ${MAX_NOTES} notes reached`), { statusCode: 400 })
    }
    const now = new Date().toISOString()
    const note = {
      id: randomUUID(),
      content: value,
      createdAt: now,
      updatedAt: now,
      pinned: false,
    }
    document.notes.push(note)
    await persist(document)
    return note
  }

  async function updateNote(id, content, pinned) {
    const value = validateContent(content)
    const document = await loadDocument()
    const index = document.notes.findIndex(note => note.id === id)
    if (index < 0) {
      throw Object.assign(new Error('note not found'), { statusCode: 404 })
    }
    const previous = document.notes[index]
    const note = {
      ...previous,
      content: value,
      updatedAt: new Date().toISOString(),
      pinned: typeof pinned === 'boolean' ? pinned : previous.pinned,
    }
    document.notes[index] = note
    await persist(document)
    return note
  }

  async function togglePin(id) {
    const document = await loadDocument()
    const index = document.notes.findIndex(note => note.id === id)
    if (index < 0) {
      throw Object.assign(new Error('note not found'), { statusCode: 404 })
    }
    const previous = document.notes[index]
    const note = {
      ...previous,
      pinned: !previous.pinned,
      updatedAt: new Date().toISOString(),
    }
    document.notes[index] = note
    await persist(document)
    return note
  }

  async function deleteNote(id) {
    const document = await loadDocument()
    const index = document.notes.findIndex(note => note.id === id)
    if (index < 0) {
      return { success: false }
    }
    document.notes.splice(index, 1)
    await persist(document)
    return { success: true }
  }

  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix',
    path: API_PREFIX,
    handler: async (req, res) => {
      try {
        const method = req.method ?? 'GET'
        const requestUrl = new URL(req.url ?? API_PREFIX, 'http://localhost')
        const pathname = requestUrl.pathname
        const suffix = pathname.slice(API_PREFIX.length).replace(/^\/+/, '')
        const parts = suffix ? suffix.split('/') : []

        if (method === 'GET' && parts[0] === 'list') {
          setJson(res, 200, await listNotes(requestUrl))
          return
        }

        if (method === 'GET' && parts[0] === 'get' && parts[1]) {
          const note = await getNote(parts[1])
          setJson(res, 200, note)
          return
        }

        if (method === 'POST' && parts[0] === 'create') {
          const body = await readJsonBody(req)
          setJson(res, 201, await createNote(body.content))
          return
        }

        if (method === 'PUT' && parts[0] === 'update' && parts[1]) {
          const body = await readJsonBody(req)
          setJson(res, 200, await updateNote(parts[1], body.content, body.pinned))
          return
        }

        if (method === 'POST' && parts[0] === 'pin' && parts[1]) {
          setJson(res, 200, await togglePin(parts[1]))
          return
        }

        if (method === 'DELETE' && parts[0] === 'delete' && parts[1]) {
          setJson(res, 200, await deleteNote(parts[1]))
          return
        }

        if (method === 'GET' && (parts.length === 0 || parts[0] === 'health')) {
          setJson(res, 200, {
            ok: true,
            name,
            version: DATA_VERSION,
            dataPath: getDataPath(),
          })
          return
        }

        setJson(res, 404, { error: 'not found' })
      } catch (error) {
        const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500
        const message = error instanceof Error ? error.message : String(error)
        console.error(`[${name}] route error:`, error)
        setJson(res, status, { error: message })
      }
    },
  }), `${name}: http api`)

  // 确保首次启动就创建存储目录和文件。
  void ensureStorage().catch(error => {
    console.error(`[${name}] failed to initialize storage`, error)
  })
}
