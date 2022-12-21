import type {
  AppPricingIntervalType,
  AppSubscriptionCurrencyCodeType,
} from "~/api/shopify/graphql/billing/types";
import type { Input } from "~/api/shopify/graphql/post.server";
import { appActiveSubscriptions } from "~/api/shopify/graphql/billing/activeSubscriptions.server";
import { appSubscriptionCreate } from "~/api/shopify/graphql/billing/subscriptionCreate.server";

export type EnsureBillingInput = {
  billingDetail: {
    resourceID: string | null;
    chargeName: string;
    returnUrl: string;
    trialDays: number;
    amount: number;
    interval: AppPricingIntervalType;
    currencyCode: AppSubscriptionCurrencyCodeType;
  };
  myshopifyDomain: string;
  accessToken: string;
  testMode: boolean;
};

export type EnsureBillingPayload = [true] | [false, string];

export const ensureBilling = async ({
  billingDetail: {
    resourceID,
    chargeName,
    returnUrl,
    trialDays,
    amount,
    interval,
    currencyCode,
  },
  myshopifyDomain,
  accessToken,
  testMode,
}: EnsureBillingInput): Promise<EnsureBillingPayload> => {
  const {
    data: {
      currentAppInstallation: { activeSubscriptions },
    },
  } = await appActiveSubscriptions({ myshopifyDomain, accessToken });

  const hasActiveSubscription = activeSubscriptions.some(
    ({ id, test }) => id === resourceID && (testMode || !test),
  );

  if (hasActiveSubscription) {
    return [true];
  }

  // 作る
  const {
    data: {
      appSubscriptionCreate: { confirmationUrl },
    },
  } = await appSubscriptionCreate({
    name: chargeName,
    returnUrl,
    lineItems: [
      {
        plan: {
          appRecurringPricingDetails: {
            interval,
            price: {
              amount,
              currencyCode,
            },
          },
        },
      },
    ],
    trialDays,
    test: testMode,
    myshopifyDomain,
    accessToken,
  });

  return [false, confirmationUrl];
};
