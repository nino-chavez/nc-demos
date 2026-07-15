# ways of working — demo series

Public teaching demos of real AI-agent working sessions, hosted at
[demos.ninochavez.co](https://demos.ninochavez.co). Each demo is one real
session: verbatim messages, real production systems, honest failures.

## Layout

```
demos/<slug>/
  deck.html   page content only (no <html>/<head>/<body> — build wraps it)
  meta.json   index-card fields: number, title, hook, date, for/get/do, preview
  img/        the demo's images, referenced as img/<name>
site/index.html   the index page; build injects cards at <!--DEMOS-->
build.mjs         node build.mjs → dist/
```

## Build

```sh
node build.mjs                        # full site → dist/
node build.mjs --artifact <slug>      # single self-contained HTML for private previews
```

No dependencies — plain Node (see `.nvmrc`).

## Adding a demo

1. Copy an existing demo folder as the starting point; diverge freely
   (no shared kit until a fourth demo exists and a shared bug has been fixed twice).
2. Sanitization is a required step, not a nicety: personal names and private
   links redacted, no secrets in screenshots, only already-public imagery.
3. Keep the failure segment. The series only stays credible while the demos
   are real sessions, not produced content.
