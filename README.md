# SSR React + Flask

What this example does:

- An example of using Flask to:
  - serve a SSR-capable React app with lazy route and offline-capable support
  - used as a backend server with basic error handling (404 returns as app and other exceptions returned as json)
- Procfile is provided so Heroku deployment is straightforward
- `yarn install` downloads all necessary js dependencies & python dependencies listed in requirements.txt (within a virtual env called vflask)
- `yarn start` rebuild web app in production & run python server in dev (hot reload & debug log level)
- `yarn serve` run python server
- service worker is included

There are also still some TODOs:

- create a separate script for webpack (or rollup) watch mode for easier dev development
