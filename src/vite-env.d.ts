/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_DEBUG: string
  readonly VITE_APP_MOCK: string
  readonly VITE_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 全局常量
declare const __APP_ENV__: string
declare const __APP_TITLE__: string

