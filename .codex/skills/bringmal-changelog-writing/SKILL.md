---
name: bringmal-changelog-writing
description: "Write clear, credible Bringmal changelog and blog articles from a feature brief or technical plugin and child-theme changelogs. Use for customer-facing Bringmal product updates, not general marketing pages."
---

# Bringmal Changelog Writing

Create a customer-facing article that tells restaurant operators and partners what changed in their daily work. The reader should understand the change without knowing the implementation.

Use this skill when the source is either a new feature brief or a technical changelog from a Bringmal plugin or the BistroDistro child theme. Preserve the source's scope. Do not turn a small change into a product launch.

## Establish the facts first

Read the relevant source material before drafting. For each candidate item, record:

* the observable change
* who uses it
* a concrete restaurant scenario it affects
* prerequisites, package limits, rollout dates, or exclusions
* the exact source that supports the claim

With a feature brief, resolve the intended user, the user action, and availability. With technical changelogs, separate user-visible changes from refactors, housekeeping, dependency updates, and internal fixes. Translate only the user-visible changes.

If a source says a capability is configurable, optional, available on request, or limited to an integration, keep that qualification. Never invent performance gains, coverage, savings, integrations, rollout dates, or customer outcomes that are not in the source. If a material point remains unclear, ask for it rather than filling the gap with marketing language.

## Write for the Bringmal reader

Address restaurant operators and partners in direct German using “du”. Prefer a short, factual title that names the product area and the practical result. The excerpt should say what is new, not praise it.

Start with one or two sentences that explain the change and its relevant everyday consequence. Then group related capabilities into two to five sections. Use a bullet list only when each point contributes a distinct fact or action.

Turn implementation into a visible result:

* Instead of “Die Schnittstelle wurde erweitert”, write what data or order now appears where.
* Instead of “Der Checkout wurde verbessert”, name the decision a guest can make or the step the team no longer repeats.
* Instead of “Die Datenbank wurde optimiert”, omit it unless there is a verified, user-visible outcome.

Explain only the amount of technical context needed to make a limitation, setup step, or workflow understandable.

## Avoid generic copy

Remove sentences that would still fit an unrelated restaurant product. In particular, do not use broad claims such as “mehr Möglichkeiten”, “nahtlos”, “modern”, “leistungsstark”, “alles aus einer Hand”, “spürbar besser”, or “einfacher und schneller” unless the following sentence names the exact operation and the reason.

Avoid benefit lists made from generic promises, repeated conclusions, invented emotional payoff, and vague headings such as “Was das für dich bedeutet”. Prefer concrete headings such as “Online Bestellungen direkt in Octobox” or “Preise im Shop und in der Kasse abgleichen”.

Use short, natural sentences. Do not use Unicode Gedankenstriche (`–` or `—`). Avoid technical implementation jargon unless it is necessary for the reader's decision.

## Fit the repository

Read `src/content.config.ts` and `src/content/blog/_template.mdx` before adding an article. Create the MDX file under `src/content/blog/`; its file name determines the URL. Keep frontmatter valid for the collection schema and choose only an existing `category` and `type`.

Use an available, relevant image as the `image` field when one is provided. The article layout renders this frontmatter image as the hero above the body, so do not repeat the same image path as an inline Markdown image. Add an inline image only when it is a different asset that explains a distinct point, and give it descriptive alt text.

Review recent articles in the same category to avoid announcing the same feature twice or making a later improvement sound like the original launch. Use `draft: false` only when the user intends the article to be published.

## Final editorial check

Before handing off, verify each sentence against the source and remove unsupported claims. Check that:

* the title and excerpt name a real change
* the opening tells the reader why the update matters in an actual workflow
* each bullet contains a distinct, observable detail
* optional features and integration limits remain qualified
* no `–` or `—` characters are present
* frontmatter, image paths, and Markdown render in the local build

Do not commit, push, publish, or alter unrelated articles unless the user explicitly asks.
