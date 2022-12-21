import type {
  AppSubscription,
  AppSubscriptionLineItemInput,
} from "~/api/shopify/graphql/billing/types";
import type { Input } from "~/api/shopify/graphql/post.server";
import { post } from "~/api/shopify/graphql/post.server";

const QUERY = `
mutation AppSubscriptionCreate(
  $name: String!,
  $returnUrl: URL!,
  $lineItems: [AppSubscriptionLineItemInput!]!,
  $test: Boolean!,
  $trialDays: Int!,
) {
  appSubscriptionCreate(
    name: $name,
    returnUrl: $returnUrl,
    trialDays: $trialDays,
    test: $test,
    lineItems: $lineItems,
  ) {
    confirmationUrl
    appSubscription {
      id
      name
      test
    }
    userErrors {
      field
      message
    }
  }
}
`;

export type AppSubscriptionCreateInput = Input & {
  name: string;
  returnUrl: string;
  lineItems: AppSubscriptionLineItemInput[];
  trialDays: number;
  test: boolean;
};

export type AppSubscriptionCreatePayload = {
  appSubscriptionCreate: {
    confirmationUrl: string;
    appSubscription: AppSubscription;
  };
};

export const appSubscriptionCreate = async ({
  name,
  returnUrl,
  lineItems,
  trialDays,
  test,
  ...rest
}: AppSubscriptionCreateInput) => {
  const body = {
    query: QUERY,
    variables: {
      name,
      returnUrl,
      lineItems,
      trialDays,
      test,
    },
  };
  return await post<AppSubscriptionCreatePayload>({ ...rest, body });
};
