# dsh-sticky-notes

DSH Desktop 本地随手便签插件。

## 功能

- 新建 / 编辑 / 删除
- 搜索
- 每页 10 条
- 左滑删除
- 自动保存
- 复制
- 本地 JSON 持久化
- 亮色 / 暗色主题

## 数据

默认保存到：

`~/.dsh/sticky-notes.json`

如果设置了 `DSH_HOME`，使用：

`$DSH_HOME/sticky-notes.json`

## 安装

```bash
dsh plugin --profile desktop add ./dsh-sticky-notes
```

然后重启 DSH Desktop。

## 开发

本插件为零构建插件，不需要 TypeScript/tsdown。

检查：

```bash
npm run check
```

## UI

- Sidebar: `sidebar.footer.action`
- Overlay: `shell.overlay`

## 设计

Host：文件持久化 + HTTP API

Client：React UI + 搜索/分页/手势/编辑器
