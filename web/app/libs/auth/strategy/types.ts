import type { StrategyVerifyCallback } from "remix-auth";
import type {
  OAuth2Profile,
  OAuth2StrategyVerifyParams,
} from "remix-auth-oauth2";

export type ShopifyProfile = OAuth2Profile & {
  myshopifyDomain: string;
  shopName: string;
};

export type ShopifyExtraParams = {};
export type ShopifyStrategyOptions = {
  apiKey: string;
  apiSecret: string;
  callbackURL: string;
  scopes: string;
};

export type ShopifyStrategyVerifyCallback<User> = StrategyVerifyCallback<
  User,
  OAuth2StrategyVerifyParams<ShopifyProfile, ShopifyExtraParams>
>;
