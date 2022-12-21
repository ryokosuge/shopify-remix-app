import { getShop } from "~/api/shopify/graphql/storeProperties/shop.server";
import { shopifyResourceId } from "~/utils/shopifyResourceId";

export type BillingParamsInput = {
  myshopifyDomain: string;
  accessToken: string;
  chargeId: string | null;
  host: string;
};

export type BillingParamsPayload = {
  returnUrl: string;
  resourceID: string | null;
  testMode: boolean;
};

export const billingParams = async ({
  myshopifyDomain,
  accessToken,
  chargeId,
  host,
}: BillingParamsInput): Promise<BillingParamsPayload> => {
  const {
    data: {
      shop: { plan },
    },
  } = await getShop({ myshopifyDomain, accessToken });
  const { APP_URL } = process.env;
  const returnUrl = `${APP_URL}/billing?shop=${myshopifyDomain}&host=${host}`;
  const resourceID =
    chargeId != null
      ? shopifyResourceId({ id: chargeId, resourceType: "AppSubscription" })
      : null;
  const testMode =
    process.env.NODE_ENV === "development" || plan.partnerDevelopment;
  return {
    returnUrl,
    resourceID,
    testMode,
  };
};
