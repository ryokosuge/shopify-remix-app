import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { shopifyRequestMiddleware } from "~/middleware/shopifyRequestMiddleware.server";
import { authenticator } from "~/libs/auth/authenticator.server";
import { get } from "~/libs/db/shop.server";

export const loader = async ({ request }: LoaderArgs) => {
  const payload = await shopifyRequestMiddleware({ request });
  await authenticator.authenticate("shopify", request, {
    context: {
      shop: payload.shop,
    },
  });

  const s = await get(payload.shop);
  if (s == null) {
    const redirectURL = new URL(request.url);
    redirectURL.searchParams.append("shop", payload.shop);
    redirectURL.searchParams.append("host", payload.host);
    throw redirect(redirectURL.toString());
  }

  console.info(JSON.stringify(s, null, 4));
  const redirectURL = new URL("/", request.url);
  redirectURL.searchParams.append("shop", payload.shop);
  redirectURL.searchParams.append("host", payload.host);
  return redirect(redirectURL.toString());
};
