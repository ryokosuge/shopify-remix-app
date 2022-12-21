export const ShopifyResource = {
  APP_SUBSCRIPTION: "AppSubscription",
} as const;

export type ShopifyResourceType =
  typeof ShopifyResource[keyof typeof ShopifyResource];

export const shopifyResourceId = ({
  id,
  resourceType,
}: {
  id: string;
  resourceType: ShopifyResourceType;
}) => `gid://shopify/${resourceType}/${id}`;
