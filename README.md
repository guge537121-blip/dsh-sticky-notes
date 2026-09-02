# dsh-sticky-notes

DSH Desktop 本地随手便签插件。

## v0.3.0

本版本以 v0.1.x 的可运行仓库为基线，重点优化"快速找到便签 → 一键注入 DSH 输入框"。

### UI

- 右侧紧凑工具面板，默认约 580 × 560 px，最大宽度 600 px
- 不再使用大面积磨砂玻璃，面板为不透明 DSH Theme Surface
- 明确边框与列表/详情分隔
- 便签列表优先，详情/编辑区压缩到较小区域
- 单击：选中并预览
- 双击：进入编辑
- 右键：编辑 / 复制 / 插入 / 删除
- 每条便签右侧 `↵`：一键插入 DSH 输入框
- 详情区底部也提供"插入到输入框"
- 多页时显示分页；只有 1 页时隐藏分页
- 支持亮色/暗色主题
- 移除左滑删除

### Composer 注入

优先使用 DSH 当前公开 composer/input contract：

- `sessions.list.getSnapshot().current`
- `sessions.scope(id)`
- `ctx.conversation.input.for(actx).state.getSnapshot()`
- `ctx.conversation.input.for(actx).setDraft(text)`

插入只修改 draft，不自动发送。

如果当前环境没有可用 composer contract，或输入框正在 `submitting/adjudicating/claimed` 等非 `plain` 状态，则回退为复制到剪贴板。

### 数据

默认：

`~/.dsh/sticky-notes.json`

如果设置 `DSH_HOME`：

`$DSH_HOME/sticky-notes.json`

v0.3.0 不改变已有数据 schema 和路径。

### 安装

```bash
dsh plugin --profile desktop add ./dsh-sticky-notes
```

然后重启 DSH Desktop。

### 开发

本插件继续采用当前仓库的零构建模式：

```bash
npm run check
```

### UI Extension Points

- Sidebar: `sidebar.footer.action`
- Surface: `shell.overlay`

### 注意

这是社区插件，不是 DeepSeek 官方产品。
