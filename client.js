window.__ModuleLoader__.load({
  id: 'dsh-sticky-notes',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    var React = require('react')

    var API = '/dsh-sticky-notes/api'
    var PAGE_SIZE = 10
    var CSS = [
      ':root{--dsn-text:var(--dsw-alias-label-primary);--dsn-muted:var(--dsw-alias-label-secondary);--dsn-accent:var(--dsw-static-deepseek-450);--dsn-danger:var(--dsw-alias-state-error-primary);}',
      '.dsn-trigger{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:30px;padding:0 8px;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:12px;line-height:18px;} .dsn-trigger:hover{background:rgba(255,255,255,.08);color:var(--dsn-text);} .dsn-trigger[aria-pressed="true"]{background:rgba(255,255,255,.10);color:var(--dsn-text);}',
      '.dsn-root{position:fixed;display:flex;flex-direction:column;overflow:visible;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(18,18,24,.92);backdrop-filter:blur(28px) saturate(1.5);-webkit-backdrop-filter:blur(28px) saturate(1.5);box-shadow:0 8px 48px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);color:var(--dsn-text);pointer-events:auto;z-index:9999;}',
      '.dsn-root *{box-sizing:border-box;}',
      '.dsn-header{height:52px;flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(28,28,38,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);cursor:move;user-select:none;}',
      '.dsn-title-wrap{min-width:0;display:flex;align-items:baseline;gap:8px;}',
      '.dsn-title{font-size:14px;font-weight:650;white-space:nowrap;}',
      '.dsn-count{color:var(--dsn-muted);font-size:11px;white-space:nowrap;}',
      '.dsn-actions{display:flex;align-items:center;gap:6px;}',
      '.dsn-btn{height:30px;padding:0 9px;border:1px solid rgba(255,255,255,.10);border-radius:7px;background:rgba(255,255,255,.06);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--dsn-text);cursor:pointer;font-size:12px;transition:background .15s,border-color .15s;} .dsn-btn:hover:not(:disabled){background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.18);} .dsn-btn:disabled{opacity:.45;cursor:not-allowed;}',
      '.dsn-btn-primary{background:rgba(var(--dsn-accent-rgb,74,144,226),.85);color:#fff;border-color:transparent;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);} .dsn-btn-primary:hover:not(:disabled){filter:brightness(1.1);}',
      '.dsn-btn-danger{background:rgba(220,50,50,.75);color:#fff;border-color:transparent;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);} .dsn-btn-danger:hover:not(:disabled){filter:brightness(1.1);}',
      '.dsn-close{width:30px;height:30px;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsn-muted);cursor:pointer;font-size:18px;transition:background .15s,color .15s;} .dsn-close:hover{background:rgba(255,255,255,.10);color:var(--dsn-text);}',
      '.dsn-search{flex:0 0 auto;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(22,22,30,.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);}',
      '.dsn-search input{width:100%;height:34px;padding:0 11px;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:rgba(255,255,255,.04);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--dsn-text);outline:none;transition:border-color .15s;} .dsn-search input:focus{border-color:var(--dsn-accent);}',
      '.dsn-sort-bar{display:flex;align-items:center;gap:6px;margin-top:8px;}',
      '.dsn-sort-label{color:var(--dsn-muted);font-size:11px;}',
      '.dsn-sort-select{height:26px;padding:0 6px;border:1px solid rgba(255,255,255,.08);border-radius:6px;background:rgba(255,255,255,.08);color:var(--dsn-text);font-size:11px;cursor:pointer;outline:none;} .dsn-sort-select:focus{border-color:var(--dsn-accent);} .dsn-sort-select option{background:#1e1e2e;color:var(--dsn-text);}',
      '.dsn-row-pin{flex:0 0 34px;align-self:center;width:30px;height:30px;margin-right:4px;padding:0;border:0;border-radius:7px;background:transparent;color:rgba(255,255,255,.25);cursor:pointer;font-size:14px;transition:all .15s;opacity:0.5;} .dsn-row:hover .dsn-row-pin{opacity:1;} .dsn-row-pin:hover{background:rgba(255,255,255,.08);opacity:1;} .dsn-row-pin-active{color:var(--dsn-accent);opacity:1 !important;}',
      '.dsn-list-wrap{height:232px;flex:0 0 232px;min-height:0;display:flex;flex-direction:column;border-bottom:1px solid rgba(255,255,255,.04);background:rgba(16,16,22,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}',
      '.dsn-list{min-height:0;flex:1;overflow:auto;padding:8px;}',
      '.dsn-row{position:relative;display:flex;align-items:stretch;min-height:42px;margin-bottom:4px;border:1px solid rgba(255,255,255,.08);border-radius:9px;background:transparent;cursor:pointer;user-select:none;transition:background .15s,border-color .15s;} .dsn-row:hover{border-color:rgba(255,255,255,.15);background:rgba(255,255,255,.06);} .dsn-row-selected{border-color:rgba(var(--dsn-accent-rgb,74,144,226),.55);background:rgba(var(--dsn-accent-rgb,74,144,226),.10);}',
      '.dsn-row-main{min-width:0;flex:1;padding:7px 10px;display:flex;align-items:center;}',
      '.dsn-row-content{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:12px;line-height:18px;white-space:pre-wrap;word-break:break-word;color:var(--dsn-text);}',
      '.dsn-row-insert{flex:0 0 34px;align-self:center;width:30px;height:30px;margin-right:7px;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsn-muted);cursor:pointer;font-size:17px;transition:background .15s,color .15s;} .dsn-row-insert:hover{background:rgba(255,255,255,.10);color:var(--dsn-text);}',
      '.dsn-pagination{height:38px;flex:0 0 38px;display:flex;align-items:center;justify-content:center;gap:8px;border-top:1px solid rgba(255,255,255,.04);background:rgba(14,14,20,.70);}',
      '.dsn-page-btn{width:26px;height:26px;padding:0;border:1px solid rgba(255,255,255,.08);border-radius:6px;background:rgba(255,255,255,.05);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);color:var(--dsn-text);cursor:pointer;transition:background .15s;} .dsn-page-btn:hover:not(:disabled){background:rgba(255,255,255,.12);} .dsn-page-btn:disabled{opacity:.4;cursor:not-allowed;}',
      '.dsn-status{color:var(--dsn-muted);font-size:10px;}',
      '.dsn-detail{min-height:0;flex:1;display:flex;flex-direction:column;background:rgba(14,14,20,.65);}',
      '.dsn-detail-body{min-height:0;flex:1;padding:10px 12px;overflow:auto;}',
      '.dsn-editor{width:100%;height:100%;min-height:0;resize:none;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px;background:rgba(255,255,255,.04);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:var(--dsn-text);font:inherit;line-height:1.55;outline:none;transition:border-color .15s;} .dsn-editor:focus{border-color:var(--dsn-accent);}',
      '.dsn-detail-footer{min-height:48px;flex:0 0 48px;display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-top:1px solid rgba(255,255,255,.05);background:rgba(24,24,32,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);}',
      '.dsn-footer-left{min-width:0;display:flex;align-items:center;gap:8px;}',
      '.dsn-footer-status{color:var(--dsn-muted);font-size:10px;}',
      '.dsn-empty{display:flex;height:100%;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:var(--dsn-muted);padding:20px;text-align:center;}',
      '.dsn-empty-icon{font-size:28px;}',
      '.dsn-error{position:absolute;left:12px;right:12px;bottom:58px;padding:8px 10px;border:1px solid rgba(220,60,60,.30);border-radius:8px;background:rgba(40,15,15,.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:var(--dsn-danger);font-size:11px;line-height:16px;box-shadow:0 6px 24px rgba(0,0,0,.20);}',
      '.dsn-toast{position:absolute;left:50%;bottom:56px;transform:translateX(-50%);padding:7px 10px;border:1px solid rgba(255,255,255,.10);border-radius:7px;background:rgba(30,30,40,.90);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:var(--dsn-text);font-size:11px;box-shadow:0 6px 24px rgba(0,0,0,.20);white-space:nowrap;pointer-events:none;}',
      '.dsn-context{position:fixed;min-width:156px;padding:5px;border:1px solid rgba(255,255,255,.10);border-radius:10px;background:rgba(26,26,36,.94);backdrop-filter:blur(28px) saturate(1.3);-webkit-backdrop-filter:blur(28px) saturate(1.3);box-shadow:0 10px 36px rgba(0,0,0,.30);z-index:10000;pointer-events:auto;}',
      '.dsn-context button{display:flex;width:100%;align-items:center;height:30px;padding:0 9px;border:0;border-radius:6px;background:transparent;color:var(--dsn-text);cursor:pointer;text-align:left;font-size:12px;transition:background .12s;} .dsn-context button:hover{background:rgba(255,255,255,.08);} .dsn-context .danger{color:var(--dsn-danger);}',
      '.dsn-resize{position:absolute;z-index:25;}',
      '.dsn-resize-n{top:-4px;left:8px;right:8px;height:8px;cursor:n-resize;}',
      '.dsn-resize-s{bottom:-4px;left:8px;right:8px;height:8px;cursor:s-resize;}',
      '.dsn-resize-e{top:8px;bottom:8px;right:-4px;width:8px;cursor:e-resize;}',
      '.dsn-resize-w{top:8px;bottom:8px;left:-4px;width:8px;cursor:w-resize;}',
      '.dsn-resize-ne{top:-4px;right:-4px;width:12px;height:12px;cursor:ne-resize;}',
      '.dsn-resize-nw{top:-4px;left:-4px;width:12px;height:12px;cursor:nw-resize;}',
      '.dsn-resize-se{bottom:-4px;right:-4px;width:12px;height:12px;cursor:se-resize;}',
      '.dsn-resize-sw{bottom:-4px;left:-4px;width:12px;height:12px;cursor:sw-resize;}',
      '@media (max-width:720px){.dsn-list-wrap{height:220px;flex-basis:220px;}}',
    ].join('\n')

    function injectStyles() {
      if (typeof document === 'undefined') return
      if (document.querySelector('style[data-plugin-css="dsh-sticky-notes"]')) return
      var style = document.createElement('style')
      style.dataset.pluginCss = 'dsh-sticky-notes'
      style.textContent = CSS
      document.head.appendChild(style)
    }

    function jsonFetch(url, options) {
      return fetch(url, options).then(function (res) {
        return res.text().then(function (text) {
          var data = null
          if (text) {
            try { data = JSON.parse(text) } catch (_) { data = null }
          }
          if (!res.ok) {
            var message = data && data.error ? data.error : ('HTTP ' + res.status)
            throw new Error(message)
          }
          return data
        })
      })
    }

    var PANEL_STATE_KEY = 'dsh-sticky-notes-panel'
    var DEFAULT_PANEL = { top: 72, left: -1, width: 580, height: 560 }

    function loadPanelState() {
      try {
        var raw = localStorage.getItem(PANEL_STATE_KEY)
        if (raw) {
          var s = JSON.parse(raw)
          return {
            top: typeof s.top === 'number' ? s.top : DEFAULT_PANEL.top,
            left: typeof s.left === 'number' ? s.left : DEFAULT_PANEL.left,
            width: typeof s.width === 'number' ? Math.max(380, s.width) : DEFAULT_PANEL.width,
            height: typeof s.height === 'number' ? Math.max(320, s.height) : DEFAULT_PANEL.height,
          }
        }
      } catch (_) {}
      return null
    }

    function savePanelState(state) {
      try {
        localStorage.setItem(PANEL_STATE_KEY, JSON.stringify(state))
      } catch (_) {}
    }

    function getInitialPanel() {
      var saved = loadPanelState()
      if (saved) return saved
      // 默认：右上角定位（用 right 而非 left）
      var w = Math.min(580, window.innerWidth - 32)
      var h = Math.min(560, window.innerHeight - 96)
      return { top: 72, left: window.innerWidth - w - 24, width: w, height: h }
    }

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val))
    }

    function copyText(text) {
      if (!text) return Promise.resolve(false)
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        return navigator.clipboard.writeText(text).then(function () {
          return true
        }).catch(function () {
          return false
        })
      }
      return Promise.resolve(false)
    }

    function resolveComposerContext(ctx) {
      try {
        var sessions = typeof ctx.get === 'function' ? ctx.get('sessions') : undefined
        var conversation = ctx.conversation
        if (!conversation && typeof ctx.get === 'function') conversation = ctx.get('conversation')
        if (!sessions || !conversation) return null
        var list = sessions.list && sessions.list.getSnapshot ? sessions.list.getSnapshot() : null
        var id = list && list.current
        if (id === undefined || id === null) return null
        var actx = typeof sessions.scope === 'function' ? sessions.scope(id) : undefined
        if (!actx) return null
        var input = conversation.input && typeof conversation.input.for === 'function'
          ? conversation.input.for(actx)
          : null
        if (!input) return null
        var state = input.state && typeof input.state.getSnapshot === 'function'
          ? input.state.getSnapshot()
          : null
        if (!state) return null
        return { input: input, state: state, actx: actx }
      } catch (_) {
        return null
      }
    }

    function NoteRow(props) {
      var note = props.note
      var selected = props.selected
      var onSelect = props.onSelect
      var onInsert = props.onInsert
      var onContext = props.onContext

      function handleMouseDown(event) {
        if (event.button === 2) {
          event.preventDefault()
          event.stopPropagation()
          onContext(note, event.clientX, event.clientY)
        }
      }

      return React.createElement(
        'div',
        {
          className: 'dsn-row ' + (selected ? 'dsn-row-selected' : ''),
          onClick: function () { onSelect(note) },
          onMouseDown: handleMouseDown,
          onContextMenu: function (event) {
            event.preventDefault()
            event.stopPropagation()
            onContext(note, event.clientX, event.clientY)
          },
        },
        React.createElement(
          'div',
          { className: 'dsn-row-main' },
          React.createElement('div', { className: 'dsn-row-content' }, note.content || '空白便签'),
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'dsn-row-insert',
            title: '一键插入到 DSH 输入框',
            'aria-label': '一键插入到 DSH 输入框',
            onClick: function (event) {
              event.stopPropagation()
              onInsert(note)
            },
          },
          '↵',
        ),
      )
    }

    function ContextMenu(props) {
      if (!props.note) return null
      var style = {
        left: props.x + 'px',
        top: props.y + 'px',
      }
      return React.createElement(
        'div',
        {
          className: 'dsn-context',
          style: style,
          role: 'menu',
          onContextMenu: function (event) {
            event.preventDefault()
            event.stopPropagation()
          },
        },
        React.createElement('button', {
          type: 'button',
          onClick: function () { props.onInsert(props.note) },
        }, '↵ 插入到输入框'),
        React.createElement('button', {
          type: 'button',
          onClick: function () { props.onCopy(props.note.content) },
        }, '复制'),
        React.createElement('button', {
          type: 'button',
          onClick: function () { props.onTogglePin(props.note) },
        }, props.note.pinned ? '取消置顶' : '📌 置顶'),
        React.createElement('div', {
          style: { height: '1px', margin: '4px 3px', background: 'rgba(255,255,255,.08)' },
        }),
        React.createElement('button', {
          type: 'button',
          className: 'danger',
          onClick: function () { props.onDelete(props.note.id) },
        }, '删除'),
      )
    }

    function NotesSurface(props) {
      var close = props.close
      var getComposer = props.getComposer
      var [notes, setNotes] = React.useState([])
      var [selected, setSelected] = React.useState(null)
      var [query, setQuery] = React.useState('')
      var [sort, setSort] = React.useState('newest')
      var [page, setPage] = React.useState(1)
      var [pageCount, setPageCount] = React.useState(1)
      var [total, setTotal] = React.useState(0)
      var [loading, setLoading] = React.useState(true)
      var [saving, setSaving] = React.useState(false)
      var [error, setError] = React.useState('')
      var [toast, setToast] = React.useState('')
      var [draft, setDraft] = React.useState('')
      var [menu, setMenu] = React.useState(null)

      var debounceRef = React.useRef(null)
      var saveRef = React.useRef(null)
      var saveRequestRef = React.useRef(Promise.resolve())
      var saveGenerationRef = React.useRef(0)
      var requestSeqRef = React.useRef(0)
      var mountedRef = React.useRef(true)
      var toastRef = React.useRef(null)
      var dragRef = React.useRef(null)
      var panelInit = getInitialPanel()
      var panelRef = React.useRef(panelInit)
      var [, setPanelTick] = React.useState(0)

      function getPanelStyle() {
        var p = panelRef.current
        return {
          top: p.top + 'px',
          left: p.left + 'px',
          width: p.width + 'px',
          height: p.height + 'px',
          minWidth: '380px',
          minHeight: '320px',
        }
      }

      function showToast(message) {
        setToast(message)
        if (toastRef.current) clearTimeout(toastRef.current)
        toastRef.current = setTimeout(function () {
          if (mountedRef.current) setToast('')
        }, 1800)
      }

      function refresh(targetPage, targetQuery, preserveSelectedId, targetSort) {
        var requestId = ++requestSeqRef.current
        setLoading(true)
        setError('')
        var params = new URLSearchParams({
          page: String(targetPage),
          pageSize: String(PAGE_SIZE),
        })
        if (targetQuery.trim()) params.set('query', targetQuery.trim())
        if (targetSort) params.set('sort', targetSort)
        return jsonFetch(API + '/list?' + params.toString())
          .then(function (data) {
            if (!mountedRef.current || requestId !== requestSeqRef.current) return
            var nextNotes = Array.isArray(data?.notes) ? data.notes : []
            setNotes(nextNotes)
            setTotal(Number(data?.total || 0))
            setPage(Number(data?.page || targetPage))
            setPageCount(Math.max(1, Number(data?.pageCount || 1)))
            setLoading(false)
            setError('')

            var wanted = preserveSelectedId || (selected && selected.id)
            var found = wanted ? nextNotes.find(function (item) { return item.id === wanted }) : null
            if (found) {
              setSelected(found)
              setDraft(found.content)
            } else if (nextNotes.length > 0) {
              setSelected(nextNotes[0])
              setDraft(nextNotes[0].content)
            } else {
              setSelected(null)
              setDraft('')
            }
          })
          .catch(function (err) {
            if (!mountedRef.current || requestId !== requestSeqRef.current) return
            setLoading(false)
            setError(err instanceof Error ? err.message : String(err))
          })
      }

      React.useEffect(function () {
        mountedRef.current = true
        refresh(1, '', null, sort)
        return function () {
          mountedRef.current = false
          if (debounceRef.current) clearTimeout(debounceRef.current)
          if (saveRef.current) clearTimeout(saveRef.current)
          if (toastRef.current) clearTimeout(toastRef.current)
        }
      }, [])

      React.useEffect(function () {
        function closeMenu() {
          setMenu(null)
        }
        window.addEventListener('click', closeMenu)
        window.addEventListener('resize', closeMenu)
        window.addEventListener('scroll', closeMenu, true)
        return function () {
          window.removeEventListener('click', closeMenu)
          window.removeEventListener('resize', closeMenu)
          window.removeEventListener('scroll', closeMenu, true)
        }
      }, [])

      function selectNote(note) {
        setMenu(null)
        setSelected(note)
        setDraft(note.content)
      }

      function editNote(note) {
        setMenu(null)
        setSelected(note)
        setDraft(note.content)
      }

      function createNote() {
        setMenu(null)
        setError('')
        jsonFetch(API + '/create', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ content: '' }),
        }).then(function (note) {
          if (!mountedRef.current) return
          setSelected(note)
          setDraft(note.content)
          return refresh(1, query, note.id, sort)
        }).catch(function (err) {
          if (!mountedRef.current) return
          setError(err instanceof Error ? err.message : String(err))
        })
      }

      function commitSave(value) {
        if (!selected) return
        var id = selected.id
        var generation = ++saveGenerationRef.current
        saveRequestRef.current = saveRequestRef.current
          .catch(function () {})
          .then(function () {
            if (!mountedRef.current || !selected || selected.id !== id) return null
            return jsonFetch(API + '/update/' + encodeURIComponent(id), {
              method: 'PUT',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ content: value }),
            })
          })
          .then(function (updated) {
            if (!updated || !mountedRef.current || !selected || selected.id !== id) return
            // 只有当前 generation 才能把服务端结果写回当前选中项。
            if (generation === saveGenerationRef.current) {
              setSelected(updated)
              setSaving(false)
              return refresh(page, query, id, sort)
            }
          })
          .catch(function (err) {
            if (!mountedRef.current) return
            if (generation === saveGenerationRef.current) {
              setSaving(false)
              setError(err instanceof Error ? err.message : String(err))
            }
          })
      }

      function scheduleSave(value) {
        setDraft(value)
        if (!selected) return
        if (saveRef.current) clearTimeout(saveRef.current)
        setSaving(true)
        saveRef.current = setTimeout(function () {
          commitSave(value)
        }, 500)
      }

      function deleteNote(id) {
        setMenu(null)
        setError('')
        jsonFetch(API + '/delete/' + encodeURIComponent(id), {
          method: 'DELETE',
        }).then(function (result) {
          if (!mountedRef.current) return
          if (result && result.success === false) {
            showToast('便签不存在或已被删除')
            return
          }
          if (selected?.id === id) {
            setSelected(null)
            setDraft('')
          }
          var nextPage = notes.length === 1 && page > 1 ? page - 1 : page
          refresh(nextPage, query, null, sort)
          showToast('已删除')
        }).catch(function (err) {
          if (!mountedRef.current) return
          setError(err instanceof Error ? err.message : String(err))
        })
      }

      function onSearch(value) {
        setQuery(value)
        setPage(1)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(function () {
          refresh(1, value, null, sort)
        }, 300)
      }

      function doCopy(text) {
        setMenu(null)
        copyText(text).then(function (ok) {
          if (ok) {
            showToast('已复制')
            setError('')
          } else {
            setError('复制失败，请手动选择并复制文本。')
          }
        })
      }

      function togglePin(note) {
        setMenu(null)
        jsonFetch(API + '/pin/' + encodeURIComponent(note.id), {
          method: 'POST',
        }).then(function (updated) {
          if (!mountedRef.current) return
          if (updated && updated.id) {
            setSelected(updated)
            if (selected && selected.id === updated.id) setDraft(updated.content)
            refresh(page, query, updated.id, sort)
            showToast(updated.pinned ? '已置顶' : '已取消置顶')
          }
        }).catch(function (err) {
          if (!mountedRef.current) return
          setError(err instanceof Error ? err.message : String(err))
        })
      }

      function doInsert(note) {
        setMenu(null)
        var text = String(note?.content || '')
        if (!text) {
          showToast('空白便签没有可插入的内容')
          return
        }

        // 方式1：尝试通过 DSH composer API 注入
        try {
          var composer = getComposer()
          if (composer && composer.input && composer.input.setDraft) {
            var state = composer.state
            var currentDraft = String(state?.draft || '')
            var next = currentDraft
              ? currentDraft + (/\n\s*$/.test(currentDraft) ? '' : '\n\n') + text
              : text
            composer.input.setDraft(next)
            showToast('已插入到 DSH 输入框')
            setError('')
            return
          }
        } catch (_) {}

        // 方式2：DOM 注入 — 找到 DSH 聊天输入框并用 execCommand 插入
        try {
          var target = findChatInput()
          if (target) {
            target.focus()
            // execCommand 在 Chromium 对 textarea 和 contenteditable 都有效
            var ok = document.execCommand('insertText', false, text)
            if (ok) {
              showToast('已插入到 DSH 输入框')
              setError('')
              return
            }
            // execCommand 失败时用剪贴板写入
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(function () {
                document.execCommand('paste')
                showToast('已粘贴到 DSH 输入框')
              }).catch(function () {
                showToast('无法插入，请手动粘贴')
              })
              return
            }
          }
        } catch (_) {}

        // 方式3：全部失败，提示用户
        showToast('无法访问 DSH 输入框，请手动粘贴')
      }

      function findChatInput() {
        // 策略1：placeholder 包含"发消息"的 textarea
        var tas = document.querySelectorAll('textarea')
        for (var i = 0; i < tas.length; i++) {
          var ph = tas[i].getAttribute('placeholder') || ''
          if (/发消息|输入|message|chat/i.test(ph) && tas[i].offsetParent !== null) {
            return tas[i]
          }
        }
        // 策略2：任何可见的 textarea（排除便签自身的编辑器）
        for (var j = 0; j < tas.length; j++) {
          if (tas[j].offsetParent !== null && !tas[j].classList.contains('dsn-editor')) {
            return tas[j]
          }
        }
        // 策略3：contenteditable 的聊天输入框
        var editables = document.querySelectorAll('[contenteditable="true"]')
        for (var k = 0; k < editables.length; k++) {
          var el = editables[k]
          if (el.offsetParent !== null && !el.classList.contains('dsn-editor')) {
            return el
          }
        }
        return null
      }

      // ─── 拖拽 & 拉伸 ───
      function onDragStart(event) {
        if (event.target.closest('.dsn-actions') || event.target.closest('button')) return
        event.preventDefault()
        var p = panelRef.current
        dragRef.current = { mode: 'move', startX: event.clientX, startY: event.clientY, origTop: p.top, origLeft: p.left }
        document.addEventListener('mousemove', onDragMove)
        document.addEventListener('mouseup', onDragEnd)
      }

      function onResizeStart(direction, event) {
        event.preventDefault()
        event.stopPropagation()
        var p = panelRef.current
        dragRef.current = {
          mode: 'resize',
          dir: direction,
          startX: event.clientX,
          startY: event.clientY,
          origTop: p.top,
          origLeft: p.left,
          origW: p.width,
          origH: p.height,
        }
        document.addEventListener('mousemove', onDragMove)
        document.addEventListener('mouseup', onDragEnd)
      }

      function onDragMove(event) {
        var d = dragRef.current
        if (!d) return
        var dx = event.clientX - d.startX
        var dy = event.clientY - d.startY
        var p = panelRef.current

        if (d.mode === 'move') {
          p.top = clamp(d.origTop + dy, 0, window.innerHeight - 60)
          p.left = clamp(d.origLeft + dx, 0, window.innerWidth - 120)
        } else if (d.mode === 'resize') {
          var dir = d.dir
          if (dir.indexOf('e') >= 0) p.width = clamp(d.origW + dx, 380, window.innerWidth - 16)
          if (dir.indexOf('w') >= 0) {
            var newW = clamp(d.origW - dx, 380, window.innerWidth - 16)
            p.left = d.origLeft + (d.origW - newW)
            p.width = newW
          }
          if (dir.indexOf('s') >= 0) p.height = clamp(d.origH + dy, 320, window.innerHeight - 16)
          if (dir.indexOf('n') >= 0) {
            var newH = clamp(d.origH - dy, 320, window.innerHeight - 16)
            p.top = d.origTop + (d.origH - newH)
            p.height = newH
          }
        }
        setPanelTick(function (n) { return n + 1 })
      }

      function onDragEnd() {
        document.removeEventListener('mousemove', onDragMove)
        document.removeEventListener('mouseup', onDragEnd)
        savePanelState(panelRef.current)
        dragRef.current = null
      }

      function pageMove(nextPage) {
        if (nextPage < 1 || nextPage > pageCount) return
        setMenu(null)
        refresh(nextPage, query, null, sort)
      }

      function onContext(note, x, y) {
        var menuWidth = 170
        var menuHeight = 165
        var left = Math.min(x, window.innerWidth - menuWidth - 8)
        var top = Math.min(y, window.innerHeight - menuHeight - 8)
        setMenu({ note: note, x: Math.max(8, left), y: Math.max(8, top) })
      }

      return React.createElement(
        'div',
        {
          className: 'dsn-root',
          role: 'dialog',
          'aria-label': '随手便签',
          style: getPanelStyle(),
        },

        // 8 个拉伸手柄
        React.createElement('div', { className: 'dsn-resize dsn-resize-n', onMouseDown: function (e) { onResizeStart('n', e) } }),
        React.createElement('div', { className: 'dsn-resize dsn-resize-s', onMouseDown: function (e) { onResizeStart('s', e) } }),
        React.createElement('div', { className: 'dsn-resize dsn-resize-e', onMouseDown: function (e) { onResizeStart('e', e) } }),
        React.createElement('div', { className: 'dsn-resize dsn-resize-w', onMouseDown: function (e) { onResizeStart('w', e) } }),
        React.createElement('div', { className: 'dsn-resize dsn-resize-ne', onMouseDown: function (e) { onResizeStart('ne', e) } }),
        React.createElement('div', { className: 'dsn-resize dsn-resize-nw', onMouseDown: function (e) { onResizeStart('nw', e) } }),
        React.createElement('div', { className: 'dsn-resize dsn-resize-se', onMouseDown: function (e) { onResizeStart('se', e) } }),
        React.createElement('div', { className: 'dsn-resize dsn-resize-sw', onMouseDown: function (e) { onResizeStart('sw', e) } }),

        React.createElement(
          'div',
          { className: 'dsn-header', onMouseDown: onDragStart },
          React.createElement(
            'div',
            { className: 'dsn-title-wrap' },
            React.createElement('div', { className: 'dsn-title' }, '📝 随手便签'),
            React.createElement('div', { className: 'dsn-count' }, total + ' 条便签'),
          ),
          React.createElement(
            'div',
            { className: 'dsn-actions' },
            React.createElement('button', {
              type: 'button',
              className: 'dsn-btn dsn-btn-primary',
              onClick: createNote,
              title: '新建便签',
            }, '＋ 新建'),
            React.createElement('button', {
              type: 'button',
              className: 'dsn-close',
              onClick: close,
              'aria-label': '关闭',
              title: '关闭',
            }, '×'),
          ),
        ),

        React.createElement(
          'div',
          { className: 'dsn-search' },
          React.createElement('input', {
            value: query,
            onChange: function (event) { onSearch(event.target.value) },
            placeholder: '搜索便签…',
            'aria-label': '搜索便签',
          }),
          React.createElement(
            'div',
            { className: 'dsn-sort-bar' },
            React.createElement('span', { className: 'dsn-sort-label' }, '排序'),
            React.createElement('select', {
              className: 'dsn-sort-select',
              value: sort,
              onChange: function (e) {
                var v = e.target.value
                setSort(v)
                refresh(1, query, null, v)
              },
            },
              React.createElement('option', { value: 'newest' }, '最新优先'),
              React.createElement('option', { value: 'oldest' }, '最早优先'),
              React.createElement('option', { value: 'title' }, '标题 A→Z'),
              React.createElement('option', { value: 'title-desc' }, '标题 Z→A'),
            ),
          ),
        ),

        React.createElement(
          'div',
          { className: 'dsn-list-wrap' },
          React.createElement(
            'div',
            { className: 'dsn-list' },
            loading
              ? React.createElement('div', { className: 'dsn-empty' }, '正在加载…')
              : notes.length === 0
                ? React.createElement(
                    'div',
                    { className: 'dsn-empty' },
                    React.createElement('div', { className: 'dsn-empty-icon' }, query ? '🔍' : '📝'),
                    React.createElement('div', null, query ? '没有找到匹配的便签' : '还没有便签'),
                    !query && React.createElement('button', {
                      type: 'button',
                      className: 'dsn-btn dsn-btn-primary',
                      onClick: createNote,
                    }, '＋ 新建便签'),
                  )
                : notes.map(function (note) {
                    return React.createElement(NoteRow, {
                      key: note.id,
                      note: note,
                      selected: selected?.id === note.id,
                      onSelect: selectNote,
                      onInsert: doInsert,
                      onContext: onContext,
                    })
                  }),
          ),
          pageCount > 1 && React.createElement(
            'div',
            { className: 'dsn-pagination' },
            React.createElement('button', {
              type: 'button',
              className: 'dsn-page-btn',
              disabled: page <= 1,
              onClick: function () { pageMove(page - 1) },
              'aria-label': '上一页',
            }, '‹'),
            React.createElement('span', { className: 'dsn-status' }, page + ' / ' + pageCount),
            React.createElement('button', {
              type: 'button',
              className: 'dsn-page-btn',
              disabled: page >= pageCount,
              onClick: function () { pageMove(page + 1) },
              'aria-label': '下一页',
            }, '›'),
          ),
        ),

        React.createElement(
          'div',
          { className: 'dsn-detail' },

          selected
            ? React.createElement(
                'div',
                { className: 'dsn-detail-body' },
                React.createElement('textarea', {
                  className: 'dsn-editor',
                  value: draft,
                  onChange: function (event) { scheduleSave(event.target.value) },
                  placeholder: '记录一些想法、提示词、代码片段……',
                  autoFocus: true,
                  onDoubleClick: function (event) { event.stopPropagation() },
                }),
              )
            : React.createElement(
                'div',
                { className: 'dsn-detail-body' },
                React.createElement(
                  'div',
                  { className: 'dsn-empty' },
                  React.createElement('div', { className: 'dsn-empty-icon' }, '📝'),
                  React.createElement('div', null, '选择一个便签查看内容'),
                  React.createElement('div', { className: 'dsn-status' }, '单击选择 · 右键管理 · ↵ 一键插入'),
                ),
              ),

          React.createElement(
            'div',
            { className: 'dsn-detail-footer' },
            React.createElement(
              'div',
              { className: 'dsn-footer-left' },
              React.createElement('div', { className: 'dsn-footer-status' }, saving ? '保存中…' : '已保存'),
            ),
          ),
        ),

        menu && React.createElement(ContextMenu, {
          note: menu.note,
          x: menu.x,
          y: menu.y,
          onEdit: editNote,
          onCopy: doCopy,
          onInsert: doInsert,
          onTogglePin: togglePin,
          onDelete: deleteNote,
        }),

        error && React.createElement('div', { className: 'dsn-error' }, error),
        toast && React.createElement('div', { className: 'dsn-toast' }, toast),
      )
    }

    function apply(ctx) {
      injectStyles()
      var state = false
      var EVENT = 'dsh-sticky-notes:toggle'

      function emitToggle() {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event(EVENT))
        }
      }

      function setOpen(value) {
        state = !!value
        emitToggle()
      }

      function toggle() {
        setOpen(!state)
      }

      function getComposer() {
        return resolveComposerContext(ctx)
      }

      ctx.slots.inject('sidebar.footer.action', function () {
        return ctx.slots.register({
          name: 'sidebar.footer.action',
          id: 'dsh-sticky-notes',
          order: 10,
        }, function (props) {
          var pressed = React.useState(state)
          React.useEffect(function () {
            var handler = function () { pressed[1](state) }
            if (typeof window !== 'undefined') window.addEventListener(EVENT, handler)
            return function () {
              if (typeof window !== 'undefined') window.removeEventListener(EVENT, handler)
            }
          }, [])
          return React.createElement(
            'button',
            {
              type: 'button',
              className: 'dsn-trigger',
              title: '随手便签',
              'aria-label': '随手便签',
              'aria-pressed': pressed[0],
              onClick: toggle,
            },
            React.createElement('span', { 'aria-hidden': 'true' }, '📝'),
            props?.wide === false ? null : React.createElement('span', null, '便签'),
          )
        })
      })

      ctx.slots.inject('shell.overlay', function () {
        return ctx.slots.register({
          name: 'shell.overlay',
          id: 'dsh-sticky-notes',
          order: 10,
        }, function () {
          var open = React.useState(state)
          React.useEffect(function () {
            var handler = function () { open[1](state) }
            if (typeof window !== 'undefined') window.addEventListener(EVENT, handler)
            return function () {
              if (typeof window !== 'undefined') window.removeEventListener(EVENT, handler)
            }
          }, [])
          if (!open[0]) return null
          return React.createElement(NotesSurface, {
            close: function () { setOpen(false) },
            getComposer: getComposer,
          })
        })
      })
    }
    exports.inject = ['slots']
    exports.apply = apply
    return module.exports
  },
})
