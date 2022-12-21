import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { get } from "~/libs/db/shop.server";

type Props = {
  request: Request;
};

type Payload =
  | {
      shop: string;
      host: string;
      hasAccessToken: false;
    }
  | {
      shop: string;
      host: string;
      hasAccessToken: true;
      accessToken: string;
      chargeId?: string | null;
    };

export const shopifyRequestMiddleware = async ({
  request,
}: Props): Promise<Payload> => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");
  if (shop == null || host == null) {
    throw json(
      {
        message: "missing shop or code query params.",
      },
      {
        status: 400,
      },
    );
  }

  if (url.pathname.startsWith("/auth")) {
    return {
      shop,
      host,
      hasAccessToken: false,
    };
  }

  const s = await get(shop);
  if (s == null) {
    const redirectURL = new URL("/auth", request.url);
    redirectURL.searchParams.append("shop", shop);
    redirectURL.searchParams.append("host", host);
    throw redirect(redirectURL.toString());
  }

  const { accessToken, chargeId } = s;
  return {
    shop,
    host,
    hasAccessToken: true,
    accessToken,
    chargeId,
  };
};
