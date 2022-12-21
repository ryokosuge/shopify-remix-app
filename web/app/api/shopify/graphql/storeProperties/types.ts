export type Shop = {
  myshopifyDomain: string;
  name: string;
  plan: ShopPlan;
};

export type ShopPlan = {
  displayName: string;
  partnerDevelopment: boolean;
  shopifyPlus: boolean;
};
