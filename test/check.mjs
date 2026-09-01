import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
assert.equal(packageJson.name, 'dsh-sticky-notes')
assert.equal(packageJson.type, 'module')
assert.equal(packageJson.exports['./client'], './client.js')
assert.equal(packageJson.dsh.bundle.patch, './cordis.patch.yml')
assert.equal(packageJson.dsh.client.platform, 'web')
assert.deepEqual(packageJson.dsh.client.inject, ['slots'])

assert.ok(existsSync(join(root, 'index.js')), 'Host entry missing')
assert.ok(existsSync(join(root, 'client.js')), 'Client entry missing')
assert.ok(existsSync(join(root, 'cordis.patch.yml')), 'bundle patch missing')

const host = await readFile(join(root, 'index.js'), 'utf8')
const client = await readFile(join(root, 'client.js'), 'utf8')
const patch = await readFile(join(root, 'cordis.patch.yml'), 'utf8')

assert.match(host, /export const name = ['"]dsh-sticky-notes['"]/)
assert.match(host, /export const inject = \[['"]webServer['"]\]/)
assert.match(host, /ctx\.webServer\.register/)
assert.match(host, /\/dsh-sticky-notes\/api/)

assert.match(client, /window\.__ModuleLoader__\.load\(/)
assert.match(client, /id: ['"]dsh-sticky-notes['"]/)
assert.match(client, /sidebar\.footer\.action/)
assert.match(client, /shell\.overlay/)

assert.match(patch, /id: dsh-sticky-notes/)
assert.match(patch, /name: dsh-sticky-notes/)

console.log('dsh-sticky-notes artifact check: PASS')
