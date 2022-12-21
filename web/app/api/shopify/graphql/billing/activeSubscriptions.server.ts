import type { AppSubscription } from "~/api/shopify/graphql/billing/types";
import type { Input } from "~/api/shopify/graphql/post.server";
import { post } from "~/api/shopify/graphql/post.server";

const QUERY = `
query AppActiveSubscriptions {
  currentAppInstallation {
    activeSubscriptions {
      id
      name
      test
    }
  }
}
`;

export type ActiveSubscriptionsInput = Input & {};
export type ActiveSubscriptionsPayload = {
  currentAppInstallation: {
    activeSubscriptions: AppSubscription[];
  };
};

export const appActiveSubscriptions = async (
  input: ActiveSubscriptionsInput,
) => {
  const body = {
    query: QUERY,
  };

  return await post<ActiveSubscriptionsPayload>({ ...input, body });
};
