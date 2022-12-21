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

export const put = async (shop: Omit<Shop, "id">) => {
  const result = await db.shop.create({
    data: {
      ...shop,
    },
  });
  console.info(JSON.stringify(result, null, 4));
  return shop;
};
