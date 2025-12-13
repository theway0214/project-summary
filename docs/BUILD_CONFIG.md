# 构建配置说明

## 环境配置

项目支持开发（development）和生产（production）两种环境。

### 环境变量文件

请手动创建以下环境变量文件：

#### `.env.development` - 开发环境
```env
# 开发环境配置
VITE_APP_ENV=development
VITE_APP_TITLE=React 开发环境
VITE_API_URL=http://localhost:3000
VITE_APP_BASE_URL=/
VITE_PORT=3005

# 开发环境特性
VITE_APP_DEBUG=true
VITE_APP_MOCK=true
```

#### `.env.production` - 生产环境
```env
# 生产环境配置
VITE_APP_ENV=production
VITE_APP_TITLE=React 生产环境
VITE_API_URL=https://api.example.com
VITE_APP_BASE_URL=/

# 生产环境特性
VITE_APP_DEBUG=false
VITE_APP_MOCK=false
```

#### `.env.local` - 本地覆盖配置（可选）
```env
# 本地环境配置（不会被提交到 Git）
# 可以在这里覆盖 .env.development 或 .env.production 的配置
```

## 可用命令

### 开发环境

```bash
# 启动开发服务器（使用 development 环境）
npm run dev
# 或
pnpm dev

# 使用 production 环境启动开发服务器（用于测试生产构建）
npm run dev:prod
```

### 构建命令

```bash
# 构建生产版本（默认）
npm run build

# 构建开发版本
npm run build:dev

# 构建并分析打包结果
npm run build:analyze
```

### 预览命令

```bash
# 预览构建结果
npm run preview

# 使用 production 环境预览
npm run preview:prod
```

### 其他命令

```bash
# 代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# TypeScript 类型检查
npm run type-check
```

## 构建优化特性

### 生产环境优化

1. **代码压缩**
   - 使用 `esbuild` 进行快速压缩
   - 可选：使用 `terser` 进行更精细的压缩（需要安装 `terser`）

2. **代码分割**
   - 自动将第三方库分离到独立的 chunk：
     - `react-vendor`: React、React DOM、React Router
     - `antd-vendor`: Ant Design 及其图标库
     - `echarts-vendor`: ECharts 图表库

3. **资源优化**
   - CSS 代码分割和压缩
   - 图片和字体文件分类存放
   - 文件名包含 hash，便于缓存管理

4. **性能优化**
   - 关闭 source map（生产环境）
   - 关闭压缩大小报告（加快构建速度）
   - 合理的 chunk 大小警告限制

### 开发环境特性

1. **热模块替换（HMR）**
   - 快速刷新
   - 错误覆盖层显示

2. **开发服务器**
   - 自动打开浏览器
   - 支持 CORS
   - 可配置代理

3. **调试支持**
   - 保留 console 输出
   - 生成 source map（可选）

## 环境变量使用

在代码中使用环境变量：

```typescript
// 访问环境变量
const apiUrl = import.meta.env.VITE_API_URL
const isDebug = import.meta.env.VITE_APP_DEBUG === 'true'

// 使用全局常量
console.log(__APP_ENV__) // 'development' 或 'production'
console.log(__APP_TITLE__) // 应用标题
```

## 注意事项

1. **环境变量命名**
   - 必须以 `VITE_` 开头才能在客户端代码中访问
   - 敏感信息不要放在环境变量中（会被打包到客户端）

2. **.env.local 文件**
   - 不会被提交到 Git
   - 优先级高于 `.env.development` 和 `.env.production`
   - 适合存放个人本地配置

3. **构建分析**
   - 使用 `npm run build:analyze` 可以查看打包分析报告
   - 帮助优化打包体积

4. **代理配置**
   - 在 `vite.config.ts` 中配置开发环境的 API 代理
   - 生产环境需要配置 Nginx 或其他服务器进行代理

## 推荐工作流

1. **开发阶段**
   ```bash
   npm run dev
   ```

2. **测试生产构建**
   ```bash
   npm run build
   npm run preview
   ```

3. **部署前检查**
   ```bash
   npm run lint
   npm run type-check
   npm run build:analyze
   ```

