import type {
  AppPricingIntervalType,
  AppSubscriptionCurrencyCodeType,
} from "~/api/shopify/graphql/billing/types";

import {
  AppSubscriptionCurrencyCode,
  AppPricingInterval,
} from "~/api/shopify/graphql/billing/types";

export type AppBillingSettingType = {
  chargeName: string;
  trialDays: number;
  amount: number;
  interval: AppPricingIntervalType;
  currencyCode: AppSubscriptionCurrencyCodeType;
};

export const AppBillingSetting:
  | { required: false }
  | ({ required: true } & AppBillingSettingType) = {
  required: true,
  trialDays: 14,
  chargeName: "STANDARD PLAN",
  amount: 50,
  interval: AppPricingInterval.EVERY_30_DAYS,
  currencyCode: AppSubscriptionCurrencyCode.USD,
} as const;
