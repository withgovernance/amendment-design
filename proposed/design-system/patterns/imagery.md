# Imagery — headshots & photography

Amendment is a vector-and-procedural visual system. **Photography is the exception, not the rule.**

## When photography is allowed

- **Legislator headshots** — when sourced from official congressional/state photographer feeds. Treated as data, not decoration.
- **Marketing surfaces** — limited, intentional, never on app routes.

## Headshot treatment

Legislator photos arrive in wildly varying styles (different lighting, backgrounds, eras). Normalize:

1. **Crop to circle** — `rounded-full overflow-hidden`. Headshots are circular avatars in the system, not rectangular cards.
2. **Apply unified treatment** — grayscale or duotone (`filter: grayscale(0.4) contrast(1.05)`). This pulls the photo register toward the rest of the system.
3. **Hairline ring** — `ring-1 ring-inset ring-black/10`. Same as the lapel pin.
4. **Background slate** if photo background is glaring — never blend on aurora; the cropped circle masks any background.

Sizes: 32 (compact lists), 48 (sponsor card), 80 (jurisdiction landing hero), 120 (legislator detail page).

## Avoid for legislator content

- Never photographic headshot AND lapel pin in the same component — pick one. Photo for production data when available; lapel pin for placeholder, hero, or anonymous-sponsor cases.
- Never campaign-style poses (waving, podium shots, cropped torsos). Headshots only.
- Never tinted overlays (party-color wash, sepia, etc.). The grayscale-duotone is the *only* permitted treatment.

## Marketing photography (if ever used)

Daylight, civic interior or exterior (capitol steps, archive rooms, library reading rooms — but **no flags, no eagles, no podiums**). Cool color temperature. Grain at ≤ 2%. Never people in mid-action poses.
