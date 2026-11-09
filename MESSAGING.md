# Amendment message architecture

**Status: ratified at v2026.11.05, decided by Jason 2026-11-05.** Each section shows what was **in use** (with its source), where sources **conflicted**, and the **decision**. Lines marked *draft to test* are approved for use until buyer evidence confirms or replaces them. Tactical sections with no decision line (dinner-party, elevator pitch, boilerplate, backgrounder) are drafts derived from the decided strategy. The file versions with `DESIGN.md`’s `spec-version`, and `/ratify` is its one writer.

Strategic sections decide; tactical sections derive from them.

## How this file is used

- **Briefs and code cite the entry, never the words.** A wireframer brief or a voyager page names `messaging.headline` or `messaging.value.organizations`; it does not retype the copy. Retyped copy is an uncontrolled copy of the system, the same failure as a hex in prose.
- **Numbers are never baked here.** A count (co-signs, races, letters, bills) names its live source and goes stale in any static copy. Copy that needs one reads it at render time or carries its date.
- **Prices are not messaging.** The fundraiser agent owns prices. Copy here names *what* is free or paid, never an amount.
- **Not for external use** except the Tactical sections.

---

# Strategic

## Audiences

| Key | Who | Their alternative today | Priority |
|---|---|---|---|
| `organizations` | Advocacy groups and creators who publish asks and bring members | Their own email list, a petition tool, a bought SMS list | 2027 bet |
| `legal-data` | AI and compliance teams that need current, cited law (over MCP or the API), plus individual researchers on a Pro seat | A lawyer, a lobbying-shop tool sold by demo, scraping state sites | 2027 bet |
| `campaigns` | Candidates and their staff who want to reach constituents | Cold SMS to a bought list, which can’t be replied to | Payer |
| `constituents` | Voters who want something from the people on their ballot | Writing alone, a petition nobody reads, nothing | Volume; the network’s supply |

- **In use:** the homepage speaks only to `constituents`. The Product Hunt launch led with constituents, with research second. Sales context (April) spoke only to professional researchers.
- **Conflict:** the 2027 bets (Jason, 2026-11-02) put `organizations` and `legal-data` first, and fold constituent, lawyer and analyst readers into one line. No public surface does that yet.
- **Decided (Jason, 2026-11-05):** the four keys as listed; a Pro-seat researcher is part of `legal-data`. Homepage order follows the 2027 bets (see Headline).

## Value propositions

Value is benefit less cost. One row per audience; the cost is what they give up, not only money.

| Audience | Benefit | Cost | Draft value proposition |
|---|---|---|---|
| `organizations` | Members counted in the districts where they live, credit that stays with the org, and earnings from the asks they publish | Moving their supporters to a new place | “Your members, counted where they vote, with the credit and the earnings staying yours.” |
| `legal-data` | Current statutes, regulations and bills from every U.S. legislature, cited to the source, joined to who lobbies on them | A metered integration instead of a demo-sold seat | “Current, cited U.S. law your agent can call, with the money behind it attached.” |
| `campaigns` | Constituents who chose the issue and said yes to hearing from you, in a channel they can answer | Paying per person reached instead of per message blasted | “Talk to the voters in your district who asked to hear from you, and hear back.” |
| `constituents` | One demand, signed by neighbors, that every campaign in the race receives, then their votes on the same record | A co-sign and a shared link | “When enough of your neighbors ask, every campaign in the race hears it.” (live homepage) |

- **Proof points (reasons to believe), each with its owner:**
  - Resistbot’s record, attributed as Resistbot’s, never Amendment’s: letters delivered since 2017 (`lifetime-deliveries-latest.json`), and turnout lift in randomized trials (Mann & Minkoff; the fundraiser memo holds the cited figures).
  - Amendment’s live counters: co-signs and races reached (homepage).
  - Coverage: every legislature plus statutes and regulations (Deepspace `get_coverage`).
- **Decided (Jason, 2026-11-05):** all four rows are drafts to test. None has been in front of a buyer; the growth agent’s audience one-pagers confirm or replace them.

## Positioning

Dunford order: start from the alternative, not the category. The category is earned last.

| Field | Draft |
|---|---|
| **Competitive alternatives** | The spam cannon: bought lists, cold texts, one-way channels. For research: lobbying-shop tools priced and sold by demo. |
| **What only we have** | Permission (people chose the issue and said yes), districts counted by where people live, and the law, bills and votes on one record. |
| **Value that creates** | A campaign gets a demand signed by the voters it must win, and a channel they answer. A voter gets heard before the election, not after. An agent gets law it can cite. |
| **Who cares most** | Organizations with members, and teams building on legal data (see Audiences). |
| **Market category** | “A nonpartisan, permissioned civic network.” |

- **In use:** “permissioned civic network” (Product Hunt maker answers and fundraiser decks, October). “AI legal research for policy professionals” (the old Product Hunt description, sales context). The homepage names no category.
- **Conflict:** these are two different companies. The network framing carries the consumer loop and the org model; the research framing carries `legal-data`. The draft keeps one category and makes legal data the record the network runs on, not a second product.
- **Positioning statement (draft):** “For organizations and the people they move, Amendment is a nonpartisan, permissioned civic network. Unlike cold outreach to bought lists, everyone here chose the issue and said yes to the conversation, and every ask, answer and vote lands on one public record.”
- **Decided (Jason, 2026-11-05):** one category, “a nonpartisan, permissioned civic network.” `legal-data` sits inside it: the law, bills and votes are the record the network runs on, and the MCP sells that record joined to the money. It gets its own value proposition and its own page under the same category, never a second category. **Revisit** if legal-data traction outruns the network’s.

## Vision

What the world looks like in ten years if this works.

- **In use (Jason, 2026-10-23, fundraiser):** people come for utility (asks, letters, legal research); that is where constituents and engaged voters are; candidates pay for introductions on our terms, like InMail; a permissioned network where everyone gets value; cold spam stops working.
- **Draft:** “Every person who wants something from their government can ask for it with their neighbors, and every candidate who wants their vote has to answer on the record.”
- **Alternates:**
  - “Campaigns ask permission before they reach a voter, and voters can answer.”
  - “The record of what was asked, promised and voted is public and kept by the people who asked.”
- **Decided (Jason, 2026-11-05):** the draft. Asking, the network and the record in one sentence; the homepage hero compresses it.

## Come for, stay for

Apparent value vs. value found later.

| Audience | Come for | Stay for |
|---|---|---|
| `constituents` | Reaching their officials and candidates (the Resistbot habit) | The record: what was promised, then how they voted |
| `organizations` | A free page and asks their members co-sign | District counts, the reach share and earnings |
| `legal-data` | One question answered with a citation | The graph: law joined to bills, votes and lobbying money |
| `campaigns` | A free claim and answering the people who asked | Reach to the constituents who said yes |

- **In use:** “Constituents come for the tools” (Network Round deck, slide 03).
- **Decided (Jason, 2026-11-05):** all four rows, as drafts to test.

---

# Tactical

Derived from the strategic layer. External copy.

## Mission

Internal, unifies the team: what we do, for whom, how, and the value.

- **Decided (Jason, 2026-11-05):** “Help people amend their government: ask together, get answers on the record, and make the law better.”
- The name is the verb. To amend is to make better (Latin *emendare*, to correct), which carries the positive intent without taking a side: say “better,” “amend,” “fix,” never “progress,” which reads as partisan.
- The public benefit charter planned at the T1 close takes this sentence as its mission clause, so the two never drift apart.

## Tagline

- **In use:** “Put your demand on the record. See who answers.” (`voyager/lib/site-config.ts`, the brand title and the Product Hunt tagline).
- **Decided for now (Jason, 2026-11-05):** “Ask together. Amend the law.” The name as a verb, matching the mission; “the law” reaches `legal-data`. An invitation, not an outcome claim.
- **Held:** “From your ask to the amendment.” It promises the record follows an ask to a law. Today an ask can name a bill (`bill_id`) and the bill page links back, but no outcome is tracked. Revisit when it is.
- **Not yet conformed:** voyager still ships the previous tagline in `lib/site-config.ts` (brand title, meta description, OG alt). A code-session change.

## Headline

- **In use:** “When enough of your neighbors ask, every campaign in the race hears it.” Lede: “Co-sign what you want from the people on your ballot.” (`voyager/components/home/HomePushSections.tsx`)
- **Conflict:** the homepage brief direction (2027 bets) gives organizations and legal-data teams the prominent slots; this headline gives them none.
- **Headline, decided (Jason, 2026-11-05):** “What you asked for, what they promised, how they voted. One record.” Each step exists today: asks, campaign answers, roll calls. Not yet rendered in the hero; check it at 390 and 1440 before it ships.
- **Decided (Jason, 2026-11-05):** the homepage leads with the record, the thing every audience touches: one public record of what was asked, answered and voted. Under it, three entry points: `organizations` and `legal-data` get the large visual slots, `constituents` one line. Constituents mostly arrive through ask pages and the bot, which keep speaking to them. The previous headline becomes the constituent line (`messaging.value.constituents`).

## Benefits

Secondary lines under the headline. Live homepage section heads, as shipped:

- “Campaigns text you every day. There’s no way to text back.”
- “This is already happening.”
- “How one ask moves.”
- “A district is a few neighbors away.”
- “A promise has a bill number.”

These are all `constituents`; under the record-led hero they fold into the constituent line and the ask pages.

**Approved as drafts to test (Jason, 2026-11-05).** The two large slots under the hero, never yet in front of a buyer. The growth agent’s audience one-pagers confirm or replace them.

- `messaging.benefit.organizations`: “Your members, counted where they vote, with the credit and the earnings staying yours.”
- `messaging.benefit.legal-data`: “Current, cited U.S. law your agent can call, with the money behind it attached.”

## Dinner-party statement

Spoken, to someone with no context.

- **Draft:** “Campaigns can text you but you can’t text back. Amendment lets you and your neighbors send one ask to everyone running in your race, and then shows how they vote.”
- **Alternate:** “It’s a place where voters ask candidates for things together, and the answers and votes stay on the record.”

## Elevator pitch

For investors, 30 seconds.

| Field | In use (fundraiser, October) |
|---|---|
| **Who pays** | Campaigns (reach), members (dues), Pro seats, API users |
| **Why** | Permissioned constituents are worth more than a bought list that can’t reply |
| **How much** | Owned by the fundraiser agent; not stated here |
| **For what** | Introductions to constituents who said yes; the record; cited law |

- **Draft:** “People already come to us to reach their officials: Resistbot has delivered tens of millions of letters. Amendment turns that into a permissioned network. Voters co-sign asks by district, organizations bring their members and earn, and campaigns pay to reach the people who said yes, like InMail instead of spam. The same record serves AI teams that need cited law.”

## Boilerplate

One paragraph. Company name, verb, what it does, why it matters.

- **In use (Product Hunt, October):** “Amendment is a nonpartisan, permissioned civic network. People choose the issues they follow. Candidates and groups ask permission to reach them, and a yes opens a two-way conversation. Amendment neither gives away nor sells its data.”
- **Draft:** “Amendment is a nonpartisan, permissioned civic network. Voters co-sign asks to the candidates on their ballot, organizations bring their members and are counted in the districts where they live, and campaigns reach only the people who said yes. Every ask, answer and roll call lands on one public record, built on current law and bills from every U.S. legislature. Its name is the right it builds on: the First Amendment’s “right of the people peaceably to assemble, and to petition the Government for a redress of grievances.” Amendment never sells its members’ data. It is built by The Governance Company.”
- **The name:** the boilerplate and backgrounder carry the First Amendment hook; quote its text from the record (`/us/const/amend/I`), never from memory.

## Meta description

The site's description when it stands alone: the search snippet for any page without its own, the web app manifest, and the Organization and WebSite structured data. A searcher reads it with no other context, so it says what a visitor does here.

- **In use:** the boilerplate's first sentence, which names the category but not what the site does or why to visit.
- **Decided (Jason, 2026-11-09):** `messaging.meta-description`: “Ask for what you want with your neighbors, see what candidates promise and how they vote, and search current U.S. law and bills. One nonpartisan record.”
- Search engines show about 150–160 characters. A revision is recounted against that limit before it ships.

## Press backgrounder

The company story. Public-safe facts only.

- Jason built tools for voters at Votizen (letters paired with vote pledges), then founded Resistbot in 2017 to turn a text into a letter to your officials.
- What Resistbot taught: a letter to a sitting official arrives after the election that put them there. The leverage is before anyone wins.
- Amendment, built since June 2024, points the other way: a district agrees on one ask first, which makes each ask slower to start and harder to wave away.
- Why the name: co-signing an ask with your neighbors is what the First Amendment protects, to “assemble, and to petition the Government for a redress of grievances,” built as software. And to amend is to make the law better without tearing it down.
- Four founders. The Governance Company.
- **Decide:** whether Brigade and Crowdpac belong in the public story (the investor panel flagged “every step has worked” over them).

---

# Words

What we say, and what we don’t. Copy rules that are not visual and so have no home in `DESIGN.md`.

| Say | Don’t say | Why |
|---|---|---|
| ask, co-sign, co-signer | petition, signature | An ask goes to named recipients and is delivered; a petition is a count. Exception: quoting the First Amendment’s own text |
| better, amend, fix | progress, progressive change | “Progress” reads as partisan; the name already means “make better” |
| threshold reached; the next stage opens | done, finished, complete, “the crowd is in” | A threshold opens the push; it never ends it |
| permission, said yes | opt-in list, audience, leads | Permission is the product |
| the record | our database, our data | The record is public and belongs to the people on it |
| nonpartisan | bipartisan, neutral | Open to any campaign under the acceptance policy; not a claim of balance |
| Resistbot’s record (attributed) | Amendment’s letters | Resistbot’s numbers are Resistbot’s |

Never on a public surface: the invite-only advisor pilot by name or link, and any third-party platform dispute.

---

## Open questions, in order

1. ~~Positioning~~ decided 2026-11-05: one category, `legal-data` inside it.
2. ~~Audience order~~ decided 2026-11-05: the homepage leads with the record; organizations and legal-data get the large slots.
3. ~~Vision and mission~~ decided 2026-11-05.
4. ~~Tagline and headline~~ decided 2026-11-05 (tagline for now).
5. ~~Benefits~~ for `organizations` and `legal-data` approved as drafts to test, 2026-11-05.
6. ~~Value propositions and Come for / Stay for~~ confirmed as drafts to test, 2026-11-05.
7. ~~Governance~~ decided 2026-11-05: shares `spec-version`; `/ratify` is the one writer.
8. Still open: whether Brigade and Crowdpac belong in the public story (Press backgrounder).
