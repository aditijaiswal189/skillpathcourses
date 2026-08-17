# Skillpath — courses code component

A Framer code component that fetches live course data from a deliberately
flaky API and renders it as a responsive grid.

**Live site:** https://fierce-memory-635619.framer.app
**Section to look at:** "Explore courses", between the hero and the footer.

The rest of the page (hero, nav, footer) is built on Framer's canvas, so
there's no code for it here.

---

## Where to start reading

`SkillpathCourses.jsx` is the entry point and the only file with a default
export — that's what Framer registers as a draggable component. Everything
else is imported by it.

| File | What's in it |
|---|---|
| `SkillpathCourses.jsx` | Fetch orchestration, the four states, search, sort, property controls |
| `CourseCard.jsx` | One card |
| `SkeletonGrid.jsx` | Loading placeholders |
| `api.jsx` | Retry wrapper and currency formatting — the only file with no React in it |
| `styles.jsx` | Shared style objects |

`styles.jsx` exists because `cardStyle` and `gridStyle` are genuinely shared
between the real grid and the skeleton — reusing the exact card shape is what
stops the layout jumping when data lands.

---

## The four states

`status` holds the outcome of the *request* (`loading` / `error` / `ready`).
Emptiness is derived from the data rather than stored, because an empty array
is a successful response, not a failed one — keeping them separate means the
two can't contradict each other.

| State | Condition | Renders |
|---|---|---|
| Loading | `status === "loading"` | Six skeleton cards |
| Error | `status === "error"` | Message + "Try again" |
| Empty | `ready` and `courses.length === 0` | "No courses yet" |
| Ready | `ready` and cards exist | The grid |

There's a fifth case the search box creates: a query matching nothing shows
"No matches for X" rather than an empty grid.

---

## Four decisions worth explaining

**Retries.** The API fails roughly 1 in 3 requests on purpose. One attempt
means a 33% failure rate; three attempts drops it to about 4%. Note the
`if (!res.ok) throw` line — `fetch` does *not* reject on a 404 or 500, only on
network failure, so the status has to be checked manually.

**`Promise.allSettled`, not `Promise.all`.** `all` rejects the moment either
request fails, collapsing two different situations into one. The failures mean
different things: no courses means there's nothing to render, but an unknown
region only means the currency is unknown — the names, descriptions, categories
and refundable badges are all still useful. `allSettled` lets each be handled
on its own terms.

**Unknown region shows no price rather than a guessed one.** When the region
endpoint fails, `country` stays `null` and cards show "Price unavailable" under
a notice explaining why, with a retry that re-runs only that endpoint. The
alternative — defaulting to ₹ and disclosing it — keeps the cards more useful,
but a user who sees ₹1,999 and is charged $39.99 has been actively misled. A
wrong price seemed worse than no price. This is the judgement call I'd most
expect to be challenged on.

**Sorting on the raw integer.** `pricePaise` and `priceUsdCents` are sorted
directly, never the formatted string — `"₹999"` sorts before `"₹1,999"`
alphabetically, which is wrong. The array is copied first because `.sort()`
mutates in place and the source derives from state.

---

## Prices

Values arrive in the smallest unit, so both are divided by 100:
`199900` paise → ₹1,999, `3999` cents → $39.99. `Intl.NumberFormat` handles
the symbol and the digit grouping, including Indian lakh-style grouping, so
there's no hand-built string formatting to get wrong.

---

## Responsive

`repeat(auto-fill, minmax(280px, 1fr))` inside a 1140px max width gives three
columns on desktop, two on tablet, one on phone — with no media queries and no
assumption about how many cards the API returns. It responds to its *container*,
so it also behaves correctly if a designer drops the component into a narrower
frame.

---

## Property controls

Two: **Title** (string) and **Accent** (colour) — change the wording, match the
brand. I deliberately left out an "API URL" control; a designer could break the
whole section with it, and it isn't something anyone would actually ask for.

---

## Known weaknesses

- The region endpoint flips between visits, so the same course can show ₹ on
  one load and $ on the next. Caching the detected region per session would fix
  both that and the fallback path.
- The skeleton layout doesn't exactly match the final cards, so there's a small
  shift when data lands.
- No keyboard focus styles on the cards.
- Sorting recalculates on every render instead of being memoised. At 5–10 cards
  that costs nothing, so it seemed like the wrong thing to optimise.
- The API is hosted on Render's free tier, which sleeps — the first request
  after an idle period can take 30–60 seconds. The skeletons cover it, but it
  looks slow.
