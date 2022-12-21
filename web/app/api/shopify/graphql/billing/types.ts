export const AppPricingInterval = {
  ANNUAL: "ANNUAL",
  EVERY_30_DAYS: "EVERY_30_DAYS",
} as const;

export type AppPricingIntervalType =
  typeof AppPricingInterval[keyof typeof AppPricingInterval];

export const AppSubscriptionCurrencyCode = {
  USD: "USD",
} as const;

export type AppSubscriptionCurrencyCodeType =
  typeof AppSubscriptionCurrencyCode[keyof typeof AppSubscriptionCurrencyCode];

export type AppSubscription = {
  id: string;
  name: string;
  test: boolean;
};

export type AppSubscriptionLineItemInput = {
  plan: {
    appRecurringPricingDetails: {
      interval: AppPricingIntervalType;
      price: {
        amount: number;
        currencyCode: AppSubscriptionCurrencyCodeType;
      };
    };
  };
};
