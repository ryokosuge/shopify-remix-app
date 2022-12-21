import type { Input } from "~/api/shopify/graphql/post.server";
import { post } from "~/api/shopify/graphql/post.server";
import type { Shop } from "./types";

const QUERY = `
query GetShop {
  shop {
    myshopifyDomain
    name
    plan {
      displayName
      partnerDevelopment
      shopifyPlus
    }
  }
}
`;

export type ShopInput = Input & {};
export type ShopPayload = {
  shop: Shop;
};

export const getShop = async (input: ShopInput) => {
  const body = {
    query: QUERY,
  };

  return post<ShopPayload>({ ...input, body });
};
