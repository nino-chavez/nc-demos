Same URL, same catalog, four generated layouts. The failure was the invariant.

The first Aisles demo was a headless storefront that inferred a layout per shopper. Thirty-one weighted rules fed a Bayesian engine, which picked one of four personas: gatherer, hunter, researcher, gifter. An AI model then generated the category page from a four-component vocabulary, validated against a Zod schema.

The output stayed schema-valid and still looked wrong. We had encoded Kibble's colors, fonts, and copy inside a generic renderer, then let the model choose page composition. The right-hand page looked like a generic Aisles template wearing Kibble assets.

That failure changed the product boundary. The current public Aisles implementation of Kibble treats the merchant storefront as the reference contract. Header, page geometry, copy, product facts, pricing, CSS, and commerce behavior stay fixed. Signals and inference can reorder approved products. An explicit `observe=true` demo action can use a model only to reorder approved product IDs in bounded zones; invalid or unavailable decisions fall back to the reference order. It cannot invent layout, CSS, URLs, or arbitrary copy.

The [live Aisles demo](https://aisles.bcsubs.app/?observe=true) makes that distinction visible beside the storefront: Template, Rules, and AI authority are shown together. Cart and subscription mutations remain unavailable in this Aisles sibling.

The original integration still matters. It found a client-side config lookup that silently rendered furniture navigation over a pet-supply catalog. When a config resolves in both server and client code, the client's silent fallback is the bug that ships. Fixed, and in the write-up.

Kibble & Co. is a made-up merchant; this is an independent demonstration — not a BigCommerce product.

Live storefront and current decision boundary: https://aisles.bcsubs.app/?observe=true
The original four-layout run: https://ninochavez.co/demos/four-layouts
