The agent asks twice. That's the whole security model, and it lives in the code, not the prompt.

Ask BC is a production agent I run against a live commerce store: 29 tools, 22 that read, 7 that can change things. Every one of the 7 requires two turns. First call returns a preview of what would change. Nothing mutates until a second call arrives with an explicit confirm flag set to true. The gate sits inside each tool's own execute function — a boolean the model must set, not a sentence in a prompt it might weigh against another sentence.

The runtime is a Next.js app plus a Cloudflare Worker with a Durable Object per store. Cheap model by default, a stronger one only on retry. A real security gap surfaced during the build and was fixed a month before the custom domain went live — that one's in the write-up too.

The part that tells me the pattern is real: months later, the subscriptions platform behind Kibble & Co. needed a merchant copilot and copied this runtime wholesale — same Durable Object, same sandbox, same two-turn writes — then pointed it at a completely different API. Reuse you can diff is different from reuse you describe.

It runs on a sandbox store with fictional data. An independent demonstration — not a BigCommerce product.

The tool code, the block protocol, the decision records: https://ninochavez.co/demos/asks-twice
