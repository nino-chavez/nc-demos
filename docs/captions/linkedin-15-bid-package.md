The harder deliverable wasn't the build.

It was the bid package — the ten-document scoping and estimation kit a global systems integrator needs before it can bid on a subscriptions build. Context and scope, capability catalog, user journeys, competitive benchmark — ten files, each answering one question a bidder would otherwise have to ask in a discovery call. The kind of package that normally takes weeks. This one took days.

This one was projected, not authored. One canonical spec corpus — 28 epics, 218 user stories — and every client-facing document generates from it. Nobody writes the epic list twice, so the epic list can't disagree with itself.

The load-bearing piece is the leakage lint. It's a whitelist: anything not explicitly approved for an outside reader hard-fails the export before the file is written. New content is unsafe by default until someone deliberately allows it. Sanitization as a build step, not a proofread. A bundling script then freezes identical, name-stamped copies per vendor, so every recipient provably got the same package.

And every document still says status: draft-internal-review. A release checklist gates anything leaving the repo, and none of its boxes are checked yet — that part stayed a human's job. The agents produced the deliverable; they don't get to ship it.

This is an independent demonstration of a delivery method — not a BigCommerce product, and the original package stays internal. What is public is a fictionalized twin, not a sanitized copy: the same ten-document anatomy, re-derived for a fictional merchant, every figure invented — readable at https://bid.bcsubs.dev/

The anatomy of all ten documents: https://ninochavez.co/demos/bid-package
