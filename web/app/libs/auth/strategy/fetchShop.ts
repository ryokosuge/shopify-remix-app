const SHOPIFY_API_VERSION = "2022-07" as const;
const FETCH_SHOP_QUERY = `{
  shop {
    id
    myshopifyDomain
    name
    plan {
      displayName
      partnerDevelopment
      shopifyPlus
    }
  }
}`;

type ShopResponse = {
  shop: {
    id: string;
    myshopifyDomain: string;
    name: string;
    plan: {
      displayName: string;
      partnerDevelopment: boolean;
      shopifyPlus: boolean;
    };
  };
};

export const fetchShop = async ({
  domain,
  accessToken,
}: {
  domain: string;
  accessToken: string;
}) => {
  return await fetch(
    `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: FETCH_SHOP_QUERY,
      }),
    },
  )
    .then((res) => res.json())
    .then((json) => json.data as ShopResponse);
};
