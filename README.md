# How to run
To run the dashboard, you need to run both server and frontend. Before doing that,
the `common` project should be built.

## Build `common` project
1. Open a ternal and browse to the root of the solution
2. Run `pnpm install`
3. In the terminal, browse to `/common`
4. Run `pnpm install`
5. Run `pnpm build`

## Run server
1. Browse to folder `/server` and create a `.env` file using `.env.sample` as template
2. Insert the string for `FREE_CURRENCY_API_KEY` environment variable
3. Open a terminal and browse to `/server`
4. Run `pnpm install`
5. Run `pnpm dev`

## Run frontend
1. Open a terminal and browse to `/dashboard`
2. Run `pnpm install`
3. Run `pnpm dev`
4. Open a browser to `http://localhost:5173`