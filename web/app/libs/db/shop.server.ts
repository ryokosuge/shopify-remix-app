import { db } from "./client.server";

export type Shop = {
  id: string;
  myshopifyDomain: string;
  accessToken: string;
  chargeId?: string | null;
};

export const get = async (myshopifyDomain: string) => {
  return await db.shop.findUnique({
    where: {
      myshopifyDomain,
    },
  });
};

export const update = async (
  myshopifyDomain: string,
  shop: Partial<Omit<Shop, "id" | "myshopifyDomain">>,
) => {
  const result = db.shop.update({
    where: { myshopifyDomain },
    data: { ...shop },
  });
  console.info(JSON.stringify(result, null, 4));
  return result;
};

export const put = async (shop: Omit<Shop, "id">) => {
  const result = await db.shop.create({
    data: {
      ...shop,
    },
  });
  console.info(JSON.stringify(result, null, 4));
  return shop;
};
