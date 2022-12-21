import { redirect } from "@remix-run/node";
import { AppBillingSetting } from "~/constants/appBillingSetting";
import { billingParams } from "~/libs/billing/billingParams.server";
import { ensureBilling } from "~/libs/billing/ensureBilling.server";
import type { Shop } from "~/libs/db/shop.server";

type Props = {
  request: Request;
  shop: Omit<Shop, "id">;
};

export const shopifyAppSubscriptionMiddleware = async ({
  request,
  shop: { myshopifyDomain, accessToken, chargeId },
}: Props) => {
  // 課金必要ないなら何もしない
  if (!AppBillingSetting.required) {
    return;
  }

  const url = new URL(request.url);

  // 認証まわりの確認
  // /auth以降のpathは認証で通るのでスルーする
  if (url.pathname.startsWith("/auth")) {
    return;
  }

  const searchParams = url.searchParams;
  const host =
    searchParams.get("host") ??
    Buffer.from(`${myshopifyDomain}/admin`).toString("base64");

  const { resourceID, returnUrl, testMode } = await billingParams({
    myshopifyDomain,
    accessToken,
    chargeId,
    host,
  });

  const [hasActiveSubscription] = await ensureBilling({
    billingDetail: { resourceID, returnUrl, ...AppBillingSetting },
    myshopifyDomain,
    accessToken,
    testMode,
  });

  if (!hasActiveSubscription) {
    // 課金情報ないので認証ルートへ
    const redirectPath = `/auth?${searchParams}`;
    throw redirect(redirectPath);
  }
};
