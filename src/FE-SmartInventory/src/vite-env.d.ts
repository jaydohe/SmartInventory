/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_URL_SIGNALR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
