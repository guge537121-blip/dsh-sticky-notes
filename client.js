window.__ModuleLoader__.load({
  id: 'dsh-sticky-notes',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    var React = require('react')

    var API = '/dsh-sticky-notes/api'
    var PAGE_SIZE = 10

    var CSS = [
      ':root{--dsn-bg:var(--dsw-alias-background-primary);--dsn-panel:var(--dsw-alias-background-secondary);--dsn-text:var(--dsw-alias-label-primary);--dsn-muted:var(--dsw-alias-label-secondary);--dsn-border:var(--dsw-alias-border-primary);--dsn-accent:var(--dsw-static-deepseek-450);--dsn-danger:var(--dsw-alias-state-error-primary);}',
      '.dsn-trigger{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:30px;padding:0 8px;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:12px;line-height:18px;} .dsn-trigger:hover{background:var(--dsw-alias-fill-secondary);color:var(--dsn-text);} .dsn-trigger[aria-pressed="true"]{background:var(--dsw-alias-fill-secondary);color:var(--dsn-text);}',
      '.dsn-root{position:fixed;inset:44px 20px 20px 20px;display:flex;min-width:720px;min-height:460px;overflow:hidden;border:1px solid var(--dsn-border);border-radius:16px;background:color-mix(in srgb,var(--dsn-bg) 86%,transparent);backdrop-filter:blur(20px);box-shadow:0 18px 60px rgba(0,0,0,.22);color:var(--dsn-text);pointer-events:auto;z-index:10;}',
      '.dsn-root *{box-sizing:border-box;}',
      '.dsn-left{width:280px;display:flex;flex-direction:column;border-right:1px solid var(--dsn-border);background:color-mix(in srgb,var(--dsn-panel) 78%,transparent);}',
      '.dsn-right{min-width:0;flex:1;display:flex;flex-direction:column;background:color-mix(in srgb,var(--dsn-bg) 84%,transparent);}',
      '.dsn-head{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--dsn-border);}',
      '.dsn-title{font-size:14px;font-weight:600;}',
      '.dsn-actions{display:flex;align-items:center;gap:6px;}',
      '.dsn-btn{height:30px;padding:0 9px;border:1px solid var(--dsn-border);border-radius:7px;background:transparent;color:var(--dsn-text);cursor:pointer;font-size:12px;} .dsn-btn:hover{background:var(--dsw-alias-fill-secondary);}',
      '.dsn-btn-primary{background:var(--dsn-accent);color:white;border-color:transparent;} .dsn-btn-primary:hover{filter:brightness(1.05);}',
      '.dsn-btn-danger{color:var(--dsn-danger);}',
      '.dsn-search{padding:10px;border-bottom:1px solid var(--dsn-border);}',
      '.dsn-search input{width:100%;height:34px;padding:0 11px;border:1px solid var(--dsn-border);border-radius:8px;background:transparent;color:var(--dsn-text);outline:none;}',
      '.dsn-search input:focus{border-color:var(--dsn-accent);}',
      '.dsn-list{flex:1;min-height:0;overflow:auto;padding:8px;}',
      '.dsn-row{position:relative;display:flex;min-height:60px;margin-bottom:6px;overflow:hidden;border:1px solid transparent;border-radius:9px;cursor:pointer;user-select:none;background:transparent;}',
      '.dsn-row:hover{background:var(--dsw-alias-fill-secondary);}',
      '.dsn-row-selected{border-color:color-mix(in srgb,var(--dsn-accent) 50%,transparent);background:color-mix(in srgb,var(--dsn-accent) 10%,transparent);}',
      '.dsn-row-main{min-width:0;flex:1;padding:10px 11px;transform:translateX(var(--dsn-x,0));transition:transform .2s ease;background:inherit;}',
      '.dsn-row-preview{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:12px;line-height:18px;white-space:pre-wrap;word-break:break-word;}',
      '.dsn-row-date{margin-top:5px;color:var(--dsn-muted);font-size:10px;}',
      '.dsn-swipe-delete{position:absolute;top:0;right:0;bottom:0;width:72px;display:flex;align-items:center;justify-content:center;border:0;background:var(--dsn-danger);color:#fff;cursor:pointer;}',
      '.dsn-editor{flex:1;min-height:0;display:flex;flex-direction:column;}',
      '.dsn-editor-body{flex:1;min-height:0;padding:18px;}',
      '.dsn-editor textarea{width:100%;height:100%;resize:none;border:1px solid var(--dsn-border);border-radius:12px;padding:14px;background:color-mix(in srgb,var(--dsn-panel) 74%,transparent);color:var(--dsn-text);font:inherit;line-height:1.6;outline:none;}',
      '.dsn-editor textarea:focus{border-color:var(--dsn-accent);}',
      '.dsn-editor-footer{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-top:1px solid var(--dsn-border);}',
      '.dsn-status{color:var(--dsn-muted);font-size:11px;}',
      '.dsn-pagination{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-top:1px solid var(--dsn-border);}',
      '.dsn-empty{display:flex;flex:1;align-items:center;justify-content:center;flex-direction:column;gap:10px;color:var(--dsn-muted);padding:30px;text-align:center;}',
      '.dsn-empty-icon{font-size:36px;}',
      '.dsn-loading{padding:20px;color:var(--dsn-muted);font-size:12px;text-align:center;}',
      '.dsn-error{padding:20px;color:var(--dsn-danger);font-size:12px;white-space:pre-wrap;}',
      '.dsn-close{width:30px;height:30px;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsn-muted);cursor:pointer;font-size:18px;} .dsn-close:hover{background:var(--dsw-alias-fill-secondary);color:var(--dsn-text);}',
      '.dsn-hint{padding:0 14px 10px;color:var(--dsn-muted);font-size:11px;}',
      '@media (max-width:900px){.dsn-root{inset:20px 12px 12px 12px;min-width:0;}.dsn-left{width:235px;}}',
      '@media (max-width:720px){.dsn-root{inset:10px;min-height:0;}.dsn-left{width:200px;}.dsn-row-preview{-webkit-line-clamp:1;}}',
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

    function formatDate(iso) {
      try {
        return new Date(iso).toLocaleString()
      } catch (_) {
        return iso
      }
    }

    function NoteRow(props) {
      var note = props.note
      var selected = props.selected
      var onSelect = props.onSelect
      var onDelete = props.onDelete
      var swipeOpenId = props.swipeOpenId
      var setSwipeOpenId = props.setSwipeOpenId
      var xState = React.useState(0)
      var x = xState[0]
      var setX = xState[1]
      var dragState = React.useRef({ active: false, startX: 0, currentX: 0 })

      React.useEffect(function () {
        if (swipeOpenId !== note.id && x !== 0) setX(0)
      }, [swipeOpenId, note.id, x])

      function pointerDown(event) {
        dragState.current = {
          active: true,
          startX: event.clientX,
          currentX: event.clientX,
        }
        event.currentTarget.setPointerCapture?.(event.pointerId)
      }

      function pointerMove(event) {
        if (!dragState.current.active) return
        var dx = event.clientX - dragState.current.startX
        var next = Math.max(-72, Math.min(0, dx))
        dragState.current.currentX = event.clientX
        setX(next)
      }

      function pointerUp() {
        if (!dragState.current.active) return
        var dx = dragState.current.currentX - dragState.current.startX
        dragState.current.active = false
        if (dx < -40) {
          setSwipeOpenId(note.id)
          setX(-72)
        } else {
          setSwipeOpenId(null)
          setX(0)
        }
      }

      return React.createElement(
        'div',
        {
          className: 'dsn-row ' + (selected ? 'dsn-row-selected' : ''),
          onClick: function () { onSelect(note) },
          onPointerDown: pointerDown,
          onPointerMove: pointerMove,
          onPointerUp: pointerUp,
          onPointerCancel: pointerUp,
        },
        React.createElement(
          'div',
          { className: 'dsn-row-main', style: { '--dsn-x': x + 'px' } },
          React.createElement('div', { className: 'dsn-row-preview' }, note.content || '空白便签'),
          React.createElement('div', { className: 'dsn-row-date' }, formatDate(note.updatedAt)),
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'dsn-swipe-delete',
            style: { transform: 'translateX(' + (x + 72) + 'px)' },
            'aria-label': '删除便签',
            onClick: function (event) {
              event.stopPropagation()
              onDelete(note.id)
            },
          },
          '删除',
        ),
      )
    }

    function NotesSurface(props) {
      var close = props.close
      var [notes, setNotes] = React.useState([])
      var [selected, setSelected] = React.useState(null)
      var [query, setQuery] = React.useState('')
      var [page, setPage] = React.useState(1)
      var [pageCount, setPageCount] = React.useState(1)
      var [total, setTotal] = React.useState(0)
      var [loading, setLoading] = React.useState(true)
      var [saving, setSaving] = React.useState(false)
      var [error, setError] = React.useState('')
      var [draft, setDraft] = React.useState('')
      var [swipeOpenId, setSwipeOpenId] = React.useState(null)
      var debounceRef = React.useRef(null)
      var saveRef = React.useRef(null)
      var mountedRef = React.useRef(true)

      function refresh(targetPage, targetQuery) {
        setLoading(true)
        setError('')
        var params = new URLSearchParams({
          page: String(targetPage),
          pageSize: String(PAGE_SIZE),
        })
        if (targetQuery.trim()) params.set('query', targetQuery.trim())
        return jsonFetch(API + '/list?' + params.toString())
          .then(function (data) {
            if (!mountedRef.current) return
            setNotes(Array.isArray(data?.notes) ? data.notes : [])
            setTotal(Number(data?.total || 0))
            setPage(Number(data?.page || targetPage))
            setPageCount(Math.max(1, Number(data?.pageCount || 1)))
            setLoading(false)
            setError('')
          })
          .catch(function (err) {
            if (!mountedRef.current) return
            setLoading(false)
            setError(err instanceof Error ? err.message : String(err))
          })
      }

      React.useEffect(function () {
        mountedRef.current = true
        refresh(1, '')
        return function () {
          mountedRef.current = false
          if (debounceRef.current) clearTimeout(debounceRef.current)
          if (saveRef.current) clearTimeout(saveRef.current)
        }
      }, [])

      function selectNote(note) {
        setSwipeOpenId(null)
        setSelected(note)
        setDraft(note.content)
      }

      function createNote() {
        jsonFetch(API + '/create', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ content: '' }),
        }).then(function (note) {
          if (!mountedRef.current) return
          setSelected(note)
          setDraft(note.content)
          refresh(1, query)
        }).catch(function (err) {
          setError(err instanceof Error ? err.message : String(err))
        })
      }

      function scheduleSave(value) {
        setDraft(value)
        if (!selected) return
        if (saveRef.current) clearTimeout(saveRef.current)
        setSaving(true)
        saveRef.current = setTimeout(function () {
          jsonFetch(API + '/update/' + encodeURIComponent(selected.id), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ content: value }),
          }).then(function (updated) {
            if (!mountedRef.current) return
            setSelected(updated)
            setSaving(false)
            refresh(page, query)
          }).catch(function (err) {
            if (!mountedRef.current) return
            setSaving(false)
            setError(err instanceof Error ? err.message : String(err))
          })
        }, 500)
      }

      function deleteNote(id) {
        jsonFetch(API + '/delete/' + encodeURIComponent(id), {
          method: 'DELETE',
        }).then(function () {
          if (!mountedRef.current) return
          if (selected?.id === id) {
            setSelected(null)
            setDraft('')
          }
          var nextPage = notes.length === 1 && page > 1 ? page - 1 : page
          setSwipeOpenId(null)
          refresh(nextPage, query)
        }).catch(function (err) {
          setError(err instanceof Error ? err.message : String(err))
        })
      }

      function onSearch(value) {
        setQuery(value)
        setPage(1)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(function () {
          refresh(1, value)
        }, 300)
      }

      function copyCurrent() {
        if (!selected) return
        navigator.clipboard.writeText(draft).then(function () {
          setError('')
        }).catch(function () {
          setError('复制失败，请手动选择并复制文本。')
        })
      }

      return React.createElement(
        'div',
        { className: 'dsn-root', role: 'dialog', 'aria-label': '随手便签' },
        React.createElement(
          'section',
          { className: 'dsn-left' },
          React.createElement(
            'div',
            { className: 'dsn-head' },
            React.createElement('div', { className: 'dsn-title' }, '📝 随手便签'),
            React.createElement(
              'div',
              { className: 'dsn-actions' },
              React.createElement('button', { type: 'button', className: 'dsn-btn dsn-btn-primary', onClick: createNote }, '＋ 新建'),
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
          ),
          React.createElement('div', { className: 'dsn-hint' }, total + ' 条便签'),
          React.createElement(
            'div',
            { className: 'dsn-list' },
            loading
              ? React.createElement('div', { className: 'dsn-loading' }, '正在加载…')
              : notes.length === 0
                ? React.createElement(
                    'div',
                    { className: 'dsn-empty' },
                    React.createElement('div', { className: 'dsn-empty-icon' }, query ? '🔍' : '📝'),
                    React.createElement('div', null, query ? '没有找到匹配的便签' : '还没有便签'),
                  )
                : notes.map(function (note) {
                    return React.createElement(NoteRow, {
                      key: note.id,
                      note: note,
                      selected: selected?.id === note.id,
                      onSelect: selectNote,
                      onDelete: deleteNote,
                      swipeOpenId: swipeOpenId,
                      setSwipeOpenId: setSwipeOpenId,
                    })
                  }),
          ),
          React.createElement(
            'div',
            { className: 'dsn-pagination' },
            React.createElement(
              'button',
              {
                type: 'button',
                className: 'dsn-btn',
                disabled: page <= 1,
                onClick: function () { refresh(page - 1, query) },
              },
              '‹',
            ),
            React.createElement('span', { className: 'dsn-status' }, page + ' / ' + pageCount),
            React.createElement(
              'button',
              {
                type: 'button',
                className: 'dsn-btn',
                disabled: page >= pageCount,
                onClick: function () { refresh(page + 1, query) },
              },
              '›',
            ),
          ),
        ),
        React.createElement(
          'section',
          { className: 'dsn-right' },
          React.createElement(
            'div',
            { className: 'dsn-head' },
            React.createElement('div', { className: 'dsn-title' }, selected ? '便签内容' : '选择一个便签'),
            React.createElement(
              'div',
              { className: 'dsn-actions' },
              selected && React.createElement('button', { type: 'button', className: 'dsn-btn', onClick: copyCurrent }, '复制'),
              React.createElement('button', { type: 'button', className: 'dsn-close', onClick: close, 'aria-label': '关闭' }, '×'),
            ),
          ),
          selected
            ? React.createElement(
                'div',
                { className: 'dsn-editor' },
                React.createElement(
                  'div',
                  { className: 'dsn-editor-body' },
                  React.createElement('textarea', {
                    value: draft,
                    onChange: function (event) { scheduleSave(event.target.value) },
                    placeholder: '记录一些想法、提示词、代码片段……',
                    autoFocus: true,
                  }),
                ),
                React.createElement(
                  'div',
                  { className: 'dsn-editor-footer' },
                  React.createElement('div', { className: 'dsn-status' }, saving ? '保存中…' : '已保存'),
                  React.createElement('div', { className: 'dsn-status' }, '修改时间：' + formatDate(selected.updatedAt)),
                ),
              )
            : React.createElement(
                'div',
                { className: 'dsn-empty' },
                React.createElement('div', { className: 'dsn-empty-icon' }, '📝'),
                React.createElement('div', null, '选择左侧便签开始编辑'),
                React.createElement('div', { className: 'dsn-status' }, '支持新建、搜索、分页、左滑删除和复制'),
              ),
          error && React.createElement('div', { className: 'dsn-error' }, error),
        ),
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
          })
        })
      })
    }

    exports.inject = ['slots']
    exports.apply = apply
    return module.exports
  },
})
