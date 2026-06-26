# Nook Development Process Log
*This log records the architectural decisions and execution steps for video generation / audit trails.*

## 2026-06-26: The Nook Pivot & Golden Rules of Isolation
**Context:** Nook (Zeeshan's brand) must be strictly isolated from the Aziz Group portfolio (RNW/TOV/Falooda). Nook uses Flipdish. Paratha Inn (Zeeshan's other brand) uses Zettle. 
**Aesthetic Pivot:** Nook is moving away from RNW's Brutalism and adopting a minimalist, exacting, premium smash burger aesthetic inspired by `junkburgers.co.uk`.

### Execution Steps:
1. **Purged Contamination:** Executed `Remove-Item -Recurse -Force` on `.agents/plugins/stitch-skills-rnw`, `stitch-sdk-rnw`, `design-md-rnw`, and `skills/rnw_business_soul`.
2. **Created Nook Business Soul:** Created `.agents/skills/nook_business_soul/SKILL.md` codifying the "Junk Burgers" design system (colors, fonts, structure) while explicitly barring content copying to respect copyright limits.
3. **Established Golden Rules of Nook:** Added explicit rules preventing data/aesthetics bleeding from Falooda/RNW into Nook. Only "Donor Code" (structural logic stripped of branding) is permitted to cross the project boundary.
4. **Tailored Stitch Skills:** Cloned pristine Stitch skills into `.agents/plugins/stitch-skills-nook`, `stitch-sdk-nook`, and `design-md-nook`. Injected the `nook_business_soul` dependency into all `SKILL.md` files.
5. **Updated Universal Laws:** Updated the global `aziz_universal_laws` to enforce the "Donor Code" firewall at the global OS level, ensuring any agent operating on this machine understands the tenant isolation between Aziz and Zeeshan projects.
