---
name: dynamic_splash_style
description: Applies the signature "Dynamic Splash Brush" style with casual cursive typography and energetic monoline illustrations. Use when the user requests the named brush script style, "Sips to Bites" style, or the specific casual illustration aesthetic.
---

# Dynamic Splash Brush Style

When the user asks to use the "Dynamic Splash" style (or references the custom brush script style / Sips to Bites style), you MUST follow these aesthetic rules exactly:

## Typography
- **Font**: Use `font-signature` (which maps to the `Yellowtail` Google font). This gives the text a casual, connected, thick brush script look (like a marker or paint brush).
- **Styling**: Do not use uppercase. Let the natural cursive casing shine (e.g., Title Case).
- **Color**: Text is usually styled in a single solid brand color (e.g., a specific shade of green or pink). Do not use gradients or drop shadows unless explicitly requested.

## Illustrations
- **Style**: Use energetic, monoline vector illustrations with uniform stroke widths.
- **Content**: Illustrations should depict dynamic action—splashes, exploding ingredients, flying sprinkles, or sweeping motion lines. No static, boring images.
- **Color**: Illustrations must be entirely monochromatic, matching the exact same solid color used for the accompanying typography. There should be no shading, 3D effects, or secondary colors.

## Implementation Details
- Ensure `--font-signature` is defined in `index.css` via: `@import url('https://fonts.googleapis.com/css2?family=Yellowtail&display=swap');`
- Apply it using the Tailwind class `font-signature`.
