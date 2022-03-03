import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  MetaFunction,
  ScrollRestoration
} from "remix";

export const meta: MetaFunction = () => {
  return { title: "Page not found · TSEI.jp🚨" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
