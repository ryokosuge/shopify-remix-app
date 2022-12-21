import type { HeadersFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { put, update } from "~/libs/db/shop.server";
import { shopifyRequestMiddleware } from "~/middleware/shopifyRequestMiddleware.server";

export const loader = async ({ request }: LoaderArgs) => {
  const payload = await shopifyRequestMiddleware({ request });
  if (!payload.hasAccessToken) {
    // 認証へ
    const redirectURL = new URL("/auth", request.url);
    redirectURL.searchParams.append("shop", payload.shop);
    redirectURL.searchParams.append("host", payload.host);
    throw redirect(redirectURL.toString());
  }

  const searchParams = new URL(request.url).searchParams;
  const chargeID = searchParams.get("charge_id");
  if (chargeID == null) {
    throw json(
      {
        message: "not found shop query.",
      },
      { status: 400 },
    );
  }

  await update(payload.shop, { chargeId: chargeID });

  const redirectURL = `https://${payload.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`;
  return redirect(redirectURL);
};
