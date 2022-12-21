const SHOPIFY_API_VERSION = "2022-07" as const;
export type Input = {
  myshopifyDomain: string;
  accessToken: string;
};

type GraphqlInput = Input & {
  body: { query: string; variables?: { [key: string]: any } };
};

type Response<T> = {
  data: T;
};

export const post = async <T>({
  myshopifyDomain,
  accessToken,
  body,
}: GraphqlInput): Promise<Response<T>> => {
  const url = `https://${myshopifyDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json) => json as Response<T>);

  console.info(JSON.stringify(result, null, 4));
  return result;
};
