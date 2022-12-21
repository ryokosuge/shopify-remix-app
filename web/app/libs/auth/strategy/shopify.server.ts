import type { SessionStorage } from "@remix-run/node";
import type { AuthenticateOptions } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import type {
  ShopifyProfile,
  ShopifyExtraParams,
  ShopifyStrategyOptions,
  ShopifyStrategyVerifyCallback,
} from "~/libs/auth/strategy/types";
import { fetchShop } from "./fetchShop";

export class ShopifyStrategy<User> extends OAuth2Strategy<
  User,
  ShopifyProfile,
  ShopifyExtraParams
> {
  public readonly name = "shopify";

  private readonly scopes: string;
  private myshopifyDomain: string = "";

  constructor(
    { apiKey, apiSecret, callbackURL, scopes }: ShopifyStrategyOptions,
    verify: ShopifyStrategyVerifyCallback<User>,
  ) {
    super(
      {
        clientID: apiKey,
        clientSecret: apiSecret,
        callbackURL,
        authorizationURL: "",
        tokenURL: "",
      },
      verify,
    );
    this.scopes = scopes;
  }

  protected authorizationParams(params: URLSearchParams): URLSearchParams {
    params.append("scope", this.scopes);
    return params;
  }

  authenticate(
    request: Request,
    sessionStorage: SessionStorage,
    options: AuthenticateOptions,
  ): Promise<User> {
    const shop = options.context?.shop as string;
    if (shop == null) {
      throw new Error("Not found shop domain.");
    }

    this.authorizationURL = `https://${shop}/admin/oauth/authorize`;
    this.tokenURL = `https://${shop}/admin/oauth/access_token`;
    this.myshopifyDomain = shop;
    return super.authenticate(request, sessionStorage, options);
  }

  protected async userProfile(
    accessToken: string,
    params: ShopifyExtraParams,
  ): Promise<ShopifyProfile> {
    const { shop } = await fetchShop({
      domain: this.myshopifyDomain,
      accessToken,
    });
    return {
      provider: this.name,
      myshopifyDomain: shop.myshopifyDomain,
      shopName: shop.name,
    };
  }
}
