import { ConfigType } from "@/types/config.type";

const CONFIG: ConfigType = {
    CRYPTO_KEY: import.meta.env.VITE_CRYPTO_KEY,
    CRYPTO_IV: import.meta.env.VITE_CRYPTO_IV,
    BASE_URL: import.meta.env.VITE_BASE_DEV_URL,
};

export { CONFIG };
