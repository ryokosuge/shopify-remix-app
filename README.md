# shopify-remix-app

Shopify アプリに最低限必要な認証とサブスクの機能を Remix で作ってみました

```sh
> make
```

```
npm i -g yarn@latest

changed 1 package, and audited 2 packages in 957ms

found 0 vulnerabilities
yarn
yarn install v1.22.19
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.22s.
/Applications/Xcode.app/Contents/Developer/usr/bin/make -C web install
yarn
yarn install v1.22.19
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.36s.
/Applications/Xcode.app/Contents/Developer/usr/bin/make -C web db
yarn prisma db push
yarn run v1.22.19
$ prisma db push
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./db/dev.db"

SQLite database dev.db created at file:./db/dev.db

🚀  Your database is now in sync with your Prisma schema. Done in 19ms

✔ Generated Prisma Client (4.8.0 | library) to ./node_modules/@prisma/client in 75ms

✨  Done in 2.17s.
yarn shopify app dev
yarn run v1.22.19
$ shopify app dev
✔ Dependencies installed

Using your previous dev settings:
- Org:          ryokosuge
- App:          sample-remix-app
- Dev store:    sample-remix-app.myshopify.com
- Update URLs:  Always

To reset your default dev config, run yarn dev --reset

✅ Success! The tunnel is running and you can now view your app.
✔ URL updated


Shareable app URL

  https://0c8f-2400-4050-2a81-da00-487-2cc9-974e-d514.ngrok.io?shop=sample-remix-app.myshopify.com&host=c2FtcGxlLXJlbWl4LWFwcC5teXNob3BpZnkuY29tL2FkbWlu

2022-12-22 02:11:28 | frontend |
2022-12-22 02:11:28 | frontend | $ cross-env HOST="localhost" remix dev
2022-12-22 02:11:30 | frontend | Loading environment variables from .env
2022-12-22 02:11:30 | frontend | Remix App Server started at http://localhost:55548 (http://localhost:55548)
```
