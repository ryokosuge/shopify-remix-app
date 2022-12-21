import type { LoaderArgs } from "@remix-run/node";
import { shopifyRequestMiddleware } from "~/middleware/shopifyRequestMiddleware.server";
import { authenticator } from "~/libs/auth/authenticator.server";

export const loader = async ({ request }: LoaderArgs) => {
  const payload = await shopifyRequestMiddleware({ request });
  await authenticator.authenticate("shopify", request, {
    context: {
      shop: payload.shop,
    },
  });
};
