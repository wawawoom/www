/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOMAIN_URL?: string;
  readonly VITE_PROJECTS_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __ENV__?: Partial<Record<string, string>>;
}
