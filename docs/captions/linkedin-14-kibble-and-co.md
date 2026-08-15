Kibble & Co. doesn't sell anything.

It's a fictional pet-supply merchant running on a real BigCommerce sandbox and a Stripe-sandbox subscription stack. The reference cart is live; product pages expose subscription choices, while starting or managing a subscription still requires sign-in. I built it because a subscription-billing platform needed a genuine store to be built against, and a slide deck can't fail a payment.

Behind the storefront: five deployed apps — storefront, admin, API, docs, marketing — 94 architecture decision records, and 218 user stories moving through one repo. Every spec edit routes through proposal, synthesis, then an ADR, with the synthesis ID in the commit message. "What's shipped" is a generated file derived from the repo's own state, never a sentence someone wrote and forgot to update.

Two things broke along the way, and both are in the write-up. A verification audit turned out to be circular — two review agents returned "clean" by trusting prior verification results instead of re-running the checks against the docs and code. And a derive-state job racing its own rebase got the whole repo rate-limited by GitHub's API. Both fixes shipped; so did the record of the failures.

The pet food is the test fixture. The method is the point.

There is a second, different proof beside it. The [Aisles observability demo](https://aisles.bcsubs.app/?observe=true) keeps the Kibble storefront shell fixed and shows signals, inference, zone authority, and bounded product-order decisions. Its cart and subscription mutations are intentionally unavailable. A commerce reference and an autonomy demo should not be described as the same deployment.

Kibble & Co. is a made-up merchant, and this is an independent demonstration of my own — not a BigCommerce product.

Full build story, with the receipts: https://ninochavez.co/demos/kibble-and-co
