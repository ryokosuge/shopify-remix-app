import { Authenticator } from "remix-auth";
import { put } from "../db/shop.server";
import { sessionStorage } from "./sessionStorage.server";
import { ShopifyStrategy } from "./strategy/shopify.server";
import type {
  ShopifyStrategyOptions,
  ShopifyStrategyVerifyCallback,
} from "./strategy/types";

export type ShopifyShop = {
  accessToken: string;
  myshopifyDomain: string;
  name: string;
};

export const authenticator = new Authenticator(sessionStorage);

const verifyCallback: ShopifyStrategyVerifyCallback<ShopifyShop> = async ({
  accessToken,
  profile: { myshopifyDomain, shopName },
}) => {
  const shop = await put({ accessToken, myshopifyDomain });
  return {
    ...shop,
    name: shopName,
  };
};

const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES, APP_URL } = process.env;
const options: ShopifyStrategyOptions = {
  apiKey: SHOPIFY_API_KEY,
  apiSecret: SHOPIFY_API_SECRET,
  callbackURL: `${APP_URL}/auth/callback`,
  scopes: SCOPES,
};

authenticator.use(new ShopifyStrategy<ShopifyShop>(options, verifyCallback));
