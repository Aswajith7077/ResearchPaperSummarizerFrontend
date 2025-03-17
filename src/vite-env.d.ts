/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_CRYPTO_KEY: string;
    readonly VITE_BASE_CRYPTO_IV: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
