# Git 提交规范指南

本文档说明如何使用项目的 Git 提交规范工具链，包括 Commitizen、Husky、Lint-staged 和 Commitlint。

## 📋 目录

- [工具介绍](#工具介绍)
- [提交信息格式](#提交信息格式)
- [使用方法](#使用方法)
- [工作流程](#工作流程)
- [常见问题](#常见问题)

## 🛠️ 工具介绍

### Commitizen
交互式提交信息生成工具，帮助生成符合规范的提交信息。

### Husky
Git hooks 管理工具，在提交前后自动执行检查。

### Lint-staged
只对暂存区的文件运行 linter，提高检查效率。

### Commitlint
验证提交信息格式是否符合 Conventional Commits 规范。

## 📝 提交信息格式

项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 基本格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加用户登录功能` |
| `fix` | 修复 bug | `fix: 修复首页加载问题` |
| `docs` | 文档变更 | `docs: 更新 README 文档` |
| `style` | 代码格式（不影响代码运行） | `style: 格式化代码` |
| `refactor` | 重构 | `refactor: 重构路由配置` |
| `perf` | 性能优化 | `perf: 优化列表渲染性能` |
| `test` | 增加测试 | `test: 添加用户登录测试` |
| `chore` | 构建过程或辅助工具的变动 | `chore: 更新依赖包` |
| `revert` | 回退 | `revert: 回退提交 abc123` |
| `build` | 打包 | `build: 优化打包配置` |
| `ci` | CI 配置 | `ci: 添加 GitHub Actions` |

### Scope（可选）

表示影响范围，可以是：
- 模块名：`feat(router): 添加路由守卫`
- 组件名：`fix(menu): 修复菜单选中问题`
- 功能名：`feat(auth): 添加登录功能`

### Subject

- 使用祈使句，现在时态
- 首字母小写
- 结尾不加句号
- 不超过 50 个字符

### Body（可选）

详细描述，可以多行：
- 说明代码变更的动机
- 对比之前的行为

### Footer（可选）

- 关闭 Issue：`Closes #123`
- 破坏性变更：`BREAKING CHANGE: 移除旧 API`

## 🚀 使用方法

### 方式 1: 使用 Commitizen（推荐）

使用交互式界面，引导填写提交信息：

```bash
# 1. 暂存文件
git add .

# 2. 使用 commitizen 提交
pnpm commit
# 或
npm run commit
```

交互式界面会引导你：
1. 选择提交类型（feat, fix, docs 等）
2. 选择影响范围（可选）
3. 填写简短描述
4. 填写详细描述（可选）
5. 填写破坏性变更说明（可选）
6. 关联 Issue（可选）

### 方式 2: 直接使用 git commit

```bash
# 1. 暂存文件
git add .

# 2. 直接提交（提交信息会被自动验证）
git commit -m "feat: 添加用户登录功能"
```

如果提交信息不符合规范，提交会被阻止。

## 🔄 工作流程

### 完整提交流程

```bash
# 1. 修改代码
# ... 编辑文件 ...

# 2. 暂存文件
git add .

# 3. 提交（会自动触发检查）
pnpm commit
# 或
git commit -m "feat: 添加新功能"

# 4. 自动执行 pre-commit hook
#    - lint-staged 检查暂存的文件
#    - ESLint 自动修复可修复的问题
#    - 如果有无法修复的错误，提交会被阻止

# 5. 自动执行 commit-msg hook
#    - 验证提交信息格式
#    - 不符合规范会阻止提交

# 6. 提交成功
```

### 提交前检查流程

```
git commit
    ↓
pre-commit hook 触发
    ↓
lint-staged 运行
    ↓
ESLint 检查 *.{js,jsx,ts,tsx} 文件
    ↓
自动修复可修复的问题
    ↓
如果有无法修复的错误 → 阻止提交
如果检查通过 → 继续
    ↓
commit-msg hook 触发
    ↓
Commitlint 验证提交信息格式
    ↓
格式正确 → 提交成功
格式错误 → 阻止提交
```

## 📚 提交示例

### 简单提交

```bash
# 新功能
git commit -m "feat: 添加用户登录功能"

# 修复 bug
git commit -m "fix: 修复首页加载问题"

# 文档更新
git commit -m "docs: 更新 API 文档"
```

### 带 Scope 的提交

```bash
# 指定模块
git commit -m "feat(router): 添加路由守卫"

# 指定组件
git commit -m "fix(menu): 修复菜单选中问题"

# 指定功能
git commit -m "feat(auth): 添加登录功能"
```

### 详细提交（多行）

```bash
git commit -m "feat: 添加用户登录功能

- 实现用户名密码登录
- 添加记住我功能
- 添加登录状态管理

Closes #123"
```

### 破坏性变更

```bash
git commit -m "feat!: 重构用户 API

BREAKING CHANGE: 移除旧的 getUserById 方法，使用新的 getUser 方法"
```

## ⚙️ 配置说明

### Lint-staged 配置

文件：`.lintstagedrc.js`

```javascript
export default {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',  // 自动修复 ESLint 问题
  ],
}
```

### Commitlint 配置

文件：`commitlint.config.js`

- 支持的提交类型
- 提交信息格式规则
- 最大长度限制（100 字符）

### Husky Hooks

- `.husky/pre-commit`: 提交前运行 lint-staged
- `.husky/commit-msg`: 验证提交信息格式

## ❓ 常见问题

### Q1: 提交时 ESLint 检查失败怎么办？

**A:** 需要先修复 ESLint 错误才能提交。

```bash
# 手动运行 ESLint 检查
pnpm lint

# 自动修复可修复的问题
pnpm lint:fix

# 修复后重新提交
git add .
pnpm commit
```

### Q2: 提交信息格式验证失败怎么办？

**A:** 确保提交信息符合规范：

- ✅ 正确：`feat: 添加新功能`
- ❌ 错误：`添加新功能`（缺少 type）
- ❌ 错误：`feat 添加新功能`（缺少冒号）
- ❌ 错误：`Feat: 添加新功能`（type 必须小写）

### Q3: 如何跳过 hooks 检查？

**不推荐**，但可以使用：

```bash
# 跳过 pre-commit hook
git commit --no-verify -m "feat: 添加功能"

# 跳过所有 hooks
git commit --no-verify --no-gpg-sign -m "feat: 添加功能"
```

### Q4: 如何修改最后一次提交信息？

```bash
# 修改提交信息
git commit --amend -m "feat: 新的提交信息"

# 使用 commitizen 修改
git commit --amend
pnpm commit
```

### Q5: lint-staged 没有运行？

检查：
1. 文件是否已暂存（`git add`）
2. 文件是否匹配 lint-staged 配置的模式
3. `.husky/pre-commit` 文件是否存在且可执行

### Q6: 如何临时禁用某个检查？

编辑 `.husky/pre-commit` 或 `.husky/commit-msg`，注释掉相应的命令。

## 🔧 手动运行检查

```bash
# 检查所有文件的 ESLint 问题
pnpm lint

# 自动修复所有文件的 ESLint 问题
pnpm lint:fix

# 验证提交信息格式（需要提供提交信息文件）
echo "feat: 测试" | pnpm commitlint
```

## 📖 参考资源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Husky](https://typicode.github.io/husky/)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Commitlint](https://commitlint.js.org/)

## 💡 最佳实践

1. **使用 Commitizen**：推荐使用 `pnpm commit` 而不是直接 `git commit`
2. **提交前检查**：确保代码能通过 ESLint 检查
3. **清晰的提交信息**：使用清晰、简洁的提交信息
4. **小步提交**：每次提交只做一件事
5. **及时提交**：完成一个小功能就提交，不要积累太多更改

---

**注意**：提交规范有助于：
- 生成清晰的变更日志
- 快速定位问题
- 提高代码审查效率
- 自动化版本管理

