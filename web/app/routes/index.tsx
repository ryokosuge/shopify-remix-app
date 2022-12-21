import type { HeadersFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { FC } from "react";
import { shopifyRequestMiddleware } from "~/middleware/shopifyRequestMiddleware.server";

export const loader = async ({ request }: LoaderArgs) => {
  const payload = await shopifyRequestMiddleware({ request });
  return json(
    {},
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

const Page: FC = () => {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Page;
