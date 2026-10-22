# PeoplesHR web experience prototypes

Submission for the PeoplesHR Web Experience Engineer practical assessment.

**Challenges chosen: 01, 03 and 05.**

| # | Challenge | Prototype | Route |
|---|---|---|---|
| 01 | Visitors can't quantify the cost of inefficient work | Admin cost check | `/admin-cost` |
| 03 | Visitors are unsure where to begin improving operations | HR operations health check | `/health-check` |
| 05 | Useful content doesn't lead visitors toward solutions | Payroll & HR operations guides | `/guides` |

Live: _add the Vercel URL here after deploying_

All three are in one Next.js app so they share a design system, lead capture and tracking, and link to each other the way they would on peopleshr.com. The outcomes of challenges 02 (package fit) and 04 (lead capture) are built into all three.

---

## Run it locally

Requires Node 20.9 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm test           # unit tests: cost model, health-check scoring, guide content checks
npm run lint
npm run build && npm start
```

---

## 01 · Admin cost check (`/admin-cost`)

**Problem.** Buyers feel that HR admin is slow but can't say what it costs, so there's no business case.

**What it does.**
- The visitor ticks the admin jobs their team does: payroll prep, attendance, leave, queries, payroll fixes, joiners/leavers, reports, re-keying.
- Each job gets an hours-per-month estimate scaled to their headcount. The visitor can overwrite any estimate.
- The result is an itemised **bill** that updates live: cost per year, hours per month, people tied up full-time, and the share of the HR team's month.
- **"Is it worth fixing?"** gives an honest verdict ("Probably not urgent" is a possible answer). It shows the value of time recovered as a range and a **break-even price per employee per month**, so I don't have to invent PeoplesHR prices.
- **"Show the maths"** lists every formula and assumption.
- Six currencies (USD, SGD, LKR, PHP, KES, BDT), chosen from the browser locale on first visit.

**Why it's different from the existing ROI calculator on peopleshr.com.** That one takes four inputs and shows a savings range without explaining it. This one costs the problem line by line and shows its working, which answers the "Skeptical about the numbers?" objection directly.

**Conversion.**
- The full result is free and ungated.
- Next steps: "Email me the breakdown" (light form), "Book a 30-minute walkthrough" (the lead carries their figures), copy a share link for the finance lead (state lives in the URL), and Save as PDF (print stylesheet).
- The three biggest lines link to the PeoplesHR modules that address them.

## 03 · HR operations health check (`/health-check`)

**Problem.** Visitors know HR needs work but not what to fix first.

**What it does.**
- A three-field intro (size, industry, role) personalises the result and qualifies the lead.
- Twelve questions across six areas. Answers describe real situations ("Fingerprint devices, exported to a spreadsheet") rather than a 1–5 scale, which is faster and more honest.
- The result:
  - a maturity stage
  - area scores (priority areas highlighted)
  - **three priorities** ranked by gap × impact, adjusted for industry (shift-heavy businesses weight attendance higher) and size
  - for each priority: why it matters, **a first step to take this month without buying anything**, and the PeoplesHR module that covers it
- An indicative **package** (Manage / Grow / Transform) with the reason. This is where challenge 02's outcome lives.
- Progress is saved in localStorage. Results are shareable through the URL hash.

**Conversion.**
- The core result is ungated.
- The extra value is gated: a 90-day plan, an industry comparison, and a one-page summary for leadership.
- Secondary CTA: "Book a call", with the stage and priorities passed in so sales starts from the visitor's answers.

## 05 · Payroll & HR operations guides (`/guides`)

**Problem.** Search and AI-assistant traffic lands on an article and stops there.

**What it does.**
- A hub and six guides in one topic cluster, ordered by buying stage: **understand → compare → decide**.
- Each guide:
  - starts with a 40–75 word **short answer**, written to be quoted whole by search snippets and AI assistants
  - then question-style headings, tables, FAQs, and a visible "updated" date
- **Next step by stage.**
  - "Understand" guides link into the cost check with a relevant preset (e.g. `?err=3`, `?cur=LKR`).
  - "Compare" guides link to the health check.
  - "Decide" guides lead to a demo request.
- Every guide ends with "The question you'll probably have next" and links to related guides.
- Search across titles, answers, headings and FAQs. Searches with no results are tracked, which shows what to write next.
- Lead magnet: a printable month-end payroll checklist.

**SEO / GEO foundations.**
- Static pages, a single H1, semantic `article`/`nav`/`aside`, canonical URLs and Open Graph tags.
- JSON-LD: Organization, WebApplication, Article, FAQPage, HowTo (checklist), BreadcrumbList, CollectionPage/ItemList.
- `sitemap.xml`, `robots.txt` and **`/llms.txt`**, which lists every guide with its short answer for AI crawlers.
- Content rules are enforced by tests: short-answer length, meta description length, no broken internal links, and the journey order.

---

## Measuring it

Every tool pushes funnel events to `window.dataLayer` (`lib/track.ts`), ready for GTM/GA4. They log to the console in development.

| Event | Fired when |
|---|---|
| `tool_start` | First interaction with a tool, including `from` when the visitor came from a guide |
| `step_complete` | Each health-check answer |
| `result_view` | Health-check result shown |
| `cta_click`, `share_link` | Secondary actions |
| `lead_submit` | Any lead form succeeds (`source` and `intent`) |
| `guide_search` | A search on the guides hub, with the result count |

KPIs I'd watch: start rate, health-check completion rate, result → lead rate, the share of leads with a work email, and guide → tool click-through by stage.

Lead capture posts to `/api/lead`. It validates with zod, flags free-mail addresses, and logs the lead with the visitor's numbers. On the real site this is where the CRM call goes.

---

## Decisions and assumptions

- **Brand.** Colours, Plus Jakarta Sans, modules (HR, Pay, Time, Talent, Engagement, Insight, Lexi), package names and proof points all come from peopleshr.com. The logo is a text wordmark, not the official file.
- **Numbers.** All cost-model assumptions are in `lib/admin-cost/model.ts`, and the page renders the same values. Defaults are starting points the visitor is asked to correct, not market data.
- **Packages.** PeoplesHR doesn't publish which modules sit in which package, so the Manage/Grow/Transform mapping in `lib/health-check/scoring.ts` is my reading of the package names. It's labelled "indicative" on the page.
- **Content.** The guides are sample content. The EPF/ETF figures (8% / 12% / 3%) are the well-established rates, and the guide carries a "check current regulations" note. "Reviewed by the PeoplesHR payroll team" is placeholder attribution.
- **No CRM, no emails sent.** The forms validate and succeed, but nothing leaves the server log.
- **Charts** are plain HTML/CSS bars rather than a chart library. They use one accent for what matters and grey for context, with every value labelled.

## Where things live

```
app/                     routes: /admin-cost, /health-check, /guides, /guides/[slug], /request-demo,
                         /api/lead, sitemap, robots, llms.txt, OG image
components/              UI, one folder per prototype
lib/admin-cost/          cost model, assumptions, URL state (+ tests)
lib/health-check/        questions, scoring, package mapping, share links (+ tests)
lib/guides/              one file per guide in articles/, journey helpers (+ content tests)
lib/seo.tsx, track.ts    JSON-LD builders, funnel tracking
```

### Common changes

| Change | Where |
|---|---|
| Change a cost assumption (e.g. recovery range 40–70%) | `RECOVERY` in `lib/admin-cost/model.ts` |
| Add an admin job to the cost check | Add an entry to `TASKS` in `lib/admin-cost/model.ts` |
| Add or reword a health-check question | `QUESTIONS` in `lib/health-check/questions.ts` (two per area; update tests if the count changes) |
| Change how priorities are weighted | `impactFor` in `lib/health-check/scoring.ts` |
| Add a guide | New file in `lib/guides/articles/`, then add it to `GUIDES` in `lib/guides/index.ts` |
| Add a currency | `CURRENCIES` in `lib/admin-cost/model.ts` |

## Checks run

- 67 unit tests passing (`npm test`).
- Lighthouse (mobile, production build): 100 Accessibility, 100 Best Practices and 100 SEO on `/admin-cost`, `/health-check`, `/guides` and a guide page.
- Performance trace for `/admin-cost` (mobile, 4× CPU, Fast 4G): LCP 0.67 s, CLS 0.
- Tested at 1440 px and 390 px. The health check was completed keyboard-only. Lead forms were tested with valid and invalid input.
