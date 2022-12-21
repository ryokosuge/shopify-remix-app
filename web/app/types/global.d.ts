/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    SHOPIFY_API_KEY: string;
    SHOPIFY_API_SECRET: string;
    APP_URL: string;
    SCOPES: string;
  }
}
