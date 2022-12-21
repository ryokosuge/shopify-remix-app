import type { FC } from "react";
import type {
  HeadersFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import type { ProviderProps } from "@shopify/app-bridge-react";
import { Provider } from "@shopify/app-bridge-react";
import { shopifyRequestMiddleware } from "./middleware/shopifyRequestMiddleware.server";

export const loader = async ({ request }: LoaderArgs) => {
  const payload = await shopifyRequestMiddleware({ request });
  if (!payload.hasAccessToken) {
    return json(
      {
        myshopifyDomain: payload.shop,
        host: payload.host,
        apiKey: process.env.SHOPIFY_API_KEY,
      },
      {
        status: 200,
        headers: {
          "Content-Security-Policy": `frame-ancestors https://${payload.shop} https://admin.shopify.com`,
        },
      },
    );
  }

  return json(
    {
      myshopifyDomain: payload.shop,
      host: payload.host,
      apiKey: process.env.SHOPIFY_API_KEY,
    },
    {
      status: 200,
      headers: {
        "Content-Security-Policy": `frame-ancestors https://${payload.shop} https://admin.shopify.com`,
      },
    },
  );
};

export const headers: HeadersFunction = ({ loaderHeaders, actionHeaders }) => ({
  "Content-Security-Policy":
    loaderHeaders.get("Content-Security-Policy") ??
    actionHeaders.get("Content-Security-Policy") ??
    "",
});

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const App: FC = () => {
  const data = useLoaderData<typeof loader>();
  const config: ProviderProps["config"] = {
    apiKey: data.apiKey,
    host: data.host,
    forceRedirect: true,
  };

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider config={config}>
          <Outlet />
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;
