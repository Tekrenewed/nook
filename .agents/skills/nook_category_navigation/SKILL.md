---
name: nook_category_navigation
description: Defines how Nook Burgers uses animated SVGs for category navigation. Integrates with animated_svg_registry.
---

# 🍔 Nook Category Navigation Architecture

## Overview
This skill governs how AI agents implement visual category navigation specifically for Nook Burgers. It combines the `animated_svg_registry` library with Nook's brutalist, high-contrast aesthetic.

## Implementation Rules
When adding or updating category navigation in Nook Burgers:

1. **Leverage the Central SVG Registry:** Always use icons and animation mechanics pulled directly from the `animated_svg_registry` skill.
2. **Typography Integration:** The icons must be accompanied by text styled with Nook's strict typographic scale (`font-heading`, `font-black`, `uppercase`, `tracking-widest`).
3. **The Brutalist Grid:** The navigation must be structured as a grid or a clean flex row, utilizing harsh borders if separation is needed (e.g., `border-b-4 border-black`). No soft shadows.
4. **Hover States:** The `svg-animate-draw` class triggers the SVG stroke animation. Combine this with text color transitions (`hover:text-danger`) for interactive feedback.
5. **Layout Placement:**
   - **Landing Page (`Home.tsx`):** A large row of categories below the hero, driving users immediately to the menu divisions.
   - **Menu Page (`Menu.tsx`):** A sticky or top-level horizontal scrolling list that allows users to instantly jump (anchor link) to their desired section.

## Code Example (Nook Pattern)
```tsx
import { Link } from 'react-router-dom';

export function AnimatedCategoryIndex() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t-2 border-primary/10">
      <Link to="/menu#burgers" className="group flex flex-col items-center gap-4">
        <div className="text-primary group-hover:text-danger transition-colors">
          {/* Insert Burger SVG from Registry here */}
        </div>
        <span className="font-heading font-black uppercase tracking-widest text-sm text-primary group-hover:text-danger transition-colors">
          Burgers
        </span>
      </Link>
    </div>
  );
}
```
