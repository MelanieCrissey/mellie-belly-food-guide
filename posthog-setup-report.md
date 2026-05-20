<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the RenderATL Food Guide — a static Astro (SSG) site. PostHog is initialized via the web snippet in a reusable `posthog.astro` component, injected into the shared `Layout.astro` so every page is covered. Ten custom events are now tracked across key user interactions: restaurant discovery, social link clicks, address copying, filter usage, modal engagement, and map exploration.

## Events instrumented

| Event | Description | File |
|---|---|---|
| `restaurant_card_clicked` | User opens a restaurant detail modal by clicking a card | `src/components/Map.astro` |
| `restaurant_directions_clicked` | User clicks "Get Directions from Hotel" in the restaurant modal | `src/components/Map.astro` |
| `restaurant_address_copied` | User copies a restaurant address to clipboard (card or modal) | `src/components/RestaurantCard.astro`, `src/components/Map.astro` |
| `restaurant_instagram_clicked` | User clicks the Instagram link on a restaurant card | `src/components/RestaurantCard.astro` |
| `restaurant_michelin_clicked` | User clicks the Michelin Guide link on a restaurant card | `src/components/RestaurantCard.astro` |
| `filter_applied` | User applies a price or tag filter on the listing page | `src/components/FilterBar.astro` |
| `filter_cleared` | User clears all active filters on the listing page | `src/components/FilterBar.astro` |
| `map_viewed` | User navigates to the map page | `src/pages/map.astro` |
| `map_marker_clicked` | User clicks a restaurant marker on the map | `src/pages/map.astro` |
| `map_filter_applied` | User applies a price or tag filter on the map page | `src/pages/map.astro` |

## Files created or modified

- **Created** `src/components/posthog.astro` — PostHog web snippet component with `is:inline` directive and env var injection
- **Modified** `src/layouts/Layout.astro` — imports and renders `<PostHog />` in `<head>`
- **Modified** `src/components/FilterBar.astro` — `filter_applied` and `filter_cleared` events
- **Modified** `src/components/RestaurantCard.astro` — `restaurant_address_copied`, `restaurant_instagram_clicked`, `restaurant_michelin_clicked` events
- **Modified** `src/components/Map.astro` — `restaurant_card_clicked`, `restaurant_directions_clicked`, `restaurant_address_copied` (modal) events
- **Modified** `src/pages/map.astro` — `map_viewed`, `map_marker_clicked`, `map_filter_applied`, `filter_cleared` events
- **Created** `.env` — `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` environment variables

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1609668)
- [Restaurant card clicks over time](/insights/P4eC88cL)
- [Filter usage over time](/insights/sANyW8Y0)
- [Top restaurants by engagement](/insights/Ntv3GVJE)
- [Map engagement over time](/insights/sjj8EvFt)
- [Engagement funnel: Browse → Filter → Click restaurant](/insights/6jFjeluu)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-astro-static/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
