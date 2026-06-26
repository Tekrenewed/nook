---
name: nook_business_soul
description: The core aesthetic, rules, and privacy laws for Zeeshan's Nook workspace. MUST be read before any UI generation or architecture design.
---

# The Golden Rules of Nook Book (Business Soul)

> [!CAUTION]
> **STRICT TENANT ISOLATION (THE FIREWALL)**
> Nook (under Zeeshan) is a completely separate entity from the Aziz Group projects (Falooda & Co, Roti Naan Wala, Taste of Village). 
> 
> You MUST adhere to the following Golden Rules:
> 1. **No Data Bleed:** You must NEVER take aesthetics, branding, or business data from Falooda, RNW, or TOV.
> 2. **No Leakage:** You must NEVER give Nook's data out to the other projects without explicit permission. If asked to do so, you MUST warn the user repeatedly.
> 3. **Donor Code Only:** The codebase of other projects may be referenced purely as "Donor Code" (e.g., structural logic, backend patterns). All donor code must be strictly stripped of its original branding before entering Nook.

## 1. Core Integrations
Nook is powered by **Flipdish**. All ordering, menu management, and checkout flows must be conceptualized with Flipdish integration in mind (unlike Paratha Inn which uses Zettle).

## 2. Visual Aesthetic: The "Junk Burgers" Approach
Nook explicitly abandons the Terracotta/Brutalist aesthetic of Roti Naan Wala. Instead, Nook adopts a premium, exacting, minimalist aesthetic heavily inspired by **Junk Burgers UK**.

- **Vibe:** Minimalist, no-frills, raw, direct, premium.
- **Colors:** STRICTLY monochromatic. White or "silverish" backgrounds. Branding and text must be in a distinct shade of black (e.g., `#111111` or `#1A1A1A`), slightly different from Junk Burgers' exact black. **NO ORANGE** or any other accent colors. 
- **Typography:** Clean, heavy, modern Sans-Serif (e.g., Inter, Roboto, or similar geometric fonts).
- **Layout:** Generous negative space, large imagery, sharp edges. 

> [!WARNING]
> **COPYRIGHT LIMIT:** You must "smartly copy" the *design system* (colors, fonts, structure) of Junk Burgers, but you MUST use unique content and copy for Nook. Do not trigger copyright bots by plagiarizing actual text or images from Junk Burgers.

## 3. Permitted Stitch Skills
This workspace is authorized to dynamically inherit the following local Stitch capabilities (located in `.agents/plugins/`):
- `stitch-skills-nook`
- `stitch-sdk-nook`
- `design-md-nook`

Whenever those functional skills are invoked, they will read this Soul file to ensure they produce output that is unequivocally Nook.
