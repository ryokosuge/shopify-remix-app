import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "shopify-remix-app",
    secure: true,
    secrets: ["test"],
  },
});
