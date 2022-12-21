import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { shopifyRequestMiddleware } from "~/middleware/shopifyRequestMiddleware.server";
import { authenticator } from "~/libs/auth/authenticator.server";
import { get } from "~/libs/db/shop.server";
import { billingParams } from "~/libs/billing/billingParams.server";
import { ensureBilling } from "~/libs/billing/ensureBilling.server";
import { AppBillingSetting } from "~/constants/appBillingSetting";

export const loader = async ({ request }: LoaderArgs) => {
  const payload = await shopifyRequestMiddleware({ request });
  await authenticator.authenticate("shopify", request, {
    context: {
      shop: payload.shop,
    },
  });

  const s = await get(payload.shop);
  if (s == null) {
    const redirectURL = new URL("/auth", request.url);
    redirectURL.searchParams.append("shop", payload.shop);
    redirectURL.searchParams.append("host", payload.host);
    throw redirect(redirectURL.toString());
  }

  console.info(JSON.stringify(s, null, 4));
  const billing = AppBillingSetting;
  if (billing.required) {
    const { resourceID, returnUrl, testMode } = await billingParams({
      ...s,
      host: payload.host,
    });

    const [hasActiveSubscription, confirmationUrl] = await ensureBilling({
      billingDetail: { resourceID, returnUrl, ...billing },
      ...s,
      testMode,
    });

    if (!hasActiveSubscription) {
      throw redirect(confirmationUrl);
    }
  }

  const redirectURL = `https://${payload.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`;
  return redirect(redirectURL);
};
