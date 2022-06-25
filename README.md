# 🚨@tsei/alrt

<div align="center">

###### 404 page in [404.tsei.jp][alrt]

[![][status-img]][status]
[![][code-quality-img]][code-quality]
[![][license-img]][license]

  <a href="https://404.tsei.jp/">
    <img src="https://i.imgur.com/raM25u6.gif" width="600" alt="⚙" />
  </a>
</div>

[alrt]: https://404.tsei.jp/
[status]: https://github.com/tseijp/alrt/actions/
[code-quality]: https://www.codefactor.io/repository/github/tseijp/alrt/
[license]: https://github.com/tseijp/alrt/
[status-img]: https://img.shields.io/badge/build-passing-red?style=flat&colorA=000&colorB=000
[code-quality-img]: https://img.shields.io/codefactor/grade/github/tseijp/alrt?style=flat&colorA=000&colorB=000
[license-img]: https://img.shields.io/badge/license-MIT-black?style=flat&colorA=000&colorB=000

__REF__
- [Remix Docs](https://remix.run/docs)

## Getting Started

### Installation

```shell
git clone https://github.com/tseijp/alrt
cd alrt
yarn
```

### Development

You will be utilizing Wrangler for local development to emulate the Cloudflare runtime.
This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
$ npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

### Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account,
then [create a Cloudflare account here][pages] and after verifying your email address with Cloudflare,
go to your dashboard and follow the [Cloudflare Pages deployment guide][guide].

[pages]: https://dash.cloudflare.com/sign-up/pages
[guide]: https://developers.cloudflare.com/pages/framework-guides/deploy-anything

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.
