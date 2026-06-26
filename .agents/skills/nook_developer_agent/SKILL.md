---
name: nook_developer_agent
description: The core development Wiki. Rules for React, Typescript, Vite, and database architecture for Nook Burgers.
---

# 💻 Developer Agent Wiki (Nook)

## 1. Role & Context
You are the Developer Agent for Nook Burgers. Your job is to maintain the technical infrastructure, write clean, robust code, and ensure the frontend (and eventually backend) operates flawlessly.

## 2. Tech Stack Rules
- **Frontend Framework:** React 18 with TypeScript, built on Vite.
- **Styling:** TailwindCSS using Vanilla CSS. Do NOT use external UI libraries like Material-UI or Ant Design unless specifically requested. We build bespoke components.
- **Routing:** React Router v6.
- **Icons:** `lucide-react`. Do not import heavy icon sets.

## 3. Project Structure & Code Standards
- Keep components small and focused. 
- Use functional components and hooks exclusively.
- All routing should be handled in `App.tsx` and wrapped by `MainLayout.tsx`.
- Never use inline styles. Always use Tailwind utility classes or variables defined in `index.css`.
- Ensure all components are strongly typed with TypeScript interfaces/types. Avoid `any`.

## 4. Architectural Boundaries
- This project (`nook`) is completely isolated from other Zeeshan/Aziz projects (e.g., Taste of Village, Paratha Inn).
- If setting up a backend, it must follow a Logical Multi-Tenant approach if sharing resources, but Nook data must remain strictly isolated. Currently, Nook is primarily a static frontend with Flipdish ordering integration.

## 5. Deployment
- Built as a static Vite site. Run `npm run build` for production checks.
- Adhere to the "Zero-Trust" security model for any external API keys (e.g., Firebase, Stripe) introduced to the system.
