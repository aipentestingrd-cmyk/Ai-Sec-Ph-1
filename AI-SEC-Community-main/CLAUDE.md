# CLAUDE.md — AI-SEC Community Website

Single source of truth for this build. Read this file first, every session.

## Project

- **Name**: AI-SEC Community
- **What**: Website, phase 0 — static HTML/CSS/JS, no frameworks, no build step
- **Tagline**: "We talk about AI Security & AI for Security"
- **Supporting line**: "Securing the age of AI, together."
- **Founded**: 2025, Bangalore, India
- **Logo**: `assets/images/logo.png` — stylized "ai" mark, purple and white

## Vision (About page)

To build a globally recognized community that empowers individuals and organizations to securely adopt, develop, and defend AI technologies, fostering a safer digital future through collaboration, innovation, and continuous learning.

## Mission (About page)

To create an inclusive platform for learning, collaboration, and knowledge sharing in AI Security and AI for Security. We organize hands-on workshops, CTF challenges, meetups, technical sessions, boardroom discussions, and flash mentorship — bridging the gap between theory and real-world practice.

## Audience

CISOs, executives, security leaders, AI professionals, security engineers, researchers, developers, students. Beginners to experts in one room.

## Voice

- Practitioner peer, not vendor. Evidence-first, no fear-mongering.
- Say "we / our members" — never "users / leads"
- Short sentences, active voice, no corporate padding
- Curious, not alarmist. Cover the field with interest, not hype or panic.
- **Good**: "Prompt injection is still unsolved — here's what defense-in-depth looks like today."
- **Bad**: "AI is under attack! Is YOUR company next?!"

## Deploy

- Host-agnostic. Pure static HTML/CSS/JS. No build step, no platform-specific config baked into source.
- Must deploy unchanged to Cloudflare Pages, Netlify, Vercel, GitHub Pages.
- Host-specific configs (headers, redirects) go in a `/deploy` folder, one subfolder/file per platform. Never hardcode into HTML.

## Brand

**Colors**
| Name | Hex | Use |
|---|---|---|
| Primary | `#9930F6` | primary actions |
| Deep purple | `#6B1FCC` | hover/active |
| Tint | `#F0E4FE` | section bg |
| Lavender | `#FBF8FE` | alt bg |
| Ink | `#1A1A2E` | headlines/body |
| Slate | `#55506B` | secondary text |
| White | `#FFFFFF` | base bg/cards |

**Fonts** (Google Fonts)
- Poppins — headings, Bold/ExtraBold
- Inter — body, Regular/Medium
- JetBrains Mono — tags/badges/code

**Modes**: Dark mode is default. Light mode via toggle.

**Design signature**: animated "attention/network" motif in hero — thin purple threads connecting nodes, pulsing faintly (AI + security visual metaphor).

## Pages (4 total)

### 1. Home (`index.html`)
- Hero: tagline + animated network motif background + "Register for Next Event" CTA
- Stats bar, count-up animation on scroll: "250+ monthly attendees", "60+ workshop capacity", "3,000+ LinkedIn members"
- Next event card: date, topic, RSVP button → Luma
- "What we do": meetups, workshops, CTF challenges, boardroom panels, flash mentorship — brief descriptions, not separate pages
- Past event highlights: 3-4 recap cards (photo + one-line takeaway + YouTube link)
- YouTube feedback video embeds (2-3 short testimonial clips)
- "AI Security Q of the Week" strip — content from a simple JSON file
- Speaker/mentor wall: grid, photos, names, specialties, LinkedIn links
- Logo strip: past speaker companies / partner orgs
- Newsletter signup embed
- "Coming to your city?" teaser with interest form CTA

### 2. Events & Workshops (`events.html`)
- Upcoming events: Luma embed/links
- Filter by type: Meetup / Workshop / Webinar / CTF
- Filter by format: In-person / Online / Hybrid
- Event card: title, date, city, format badge, type badge, Luma link
- Past events archive: recap cards (photo, summary, YouTube recording link)
- Workshop catalog: topics covered, capacity info, "request a workshop" CTA

### 3. Get Involved (`get-involved.html`)
- How to join: LinkedIn, YouTube, WhatsApp community, newsletter, attend events
- Code of conduct
- Chapter status: Bangalore (live), other cities "coming soon"
- "Bring AI-Sec to your city" interest form (name, email, city, role)
- Speaker/talk submission form or CTA
- "Suggest a topic" form

### 4. About & Partners (`about.html`)
- Vision and mission (see above)
- Core team / organizer profiles with LinkedIn links
- Community timeline / milestones (founded 2025, key growth moments)
- YouTube channel link + subscribe CTA
- Sponsor/partner section: two tiers — Community Partner / Event Partner
- Downloadable sponsor one-pager PDF link
- Partner/sponsor inquiry form
- Contact info

## Shared Components

**Navbar**
- Logo (ai mark) + "AI-SEC Community" wordmark
- Links: Home, Events, Get Involved, About
- Sticky "Register for Next Event" CTA (purple filled) → Luma
- Dark/light mode toggle
- Mobile hamburger menu, smooth open/close

**Footer**
- Logo + tagline
- Quick links to all 4 pages
- Social links: LinkedIn, YouTube, WhatsApp, Twitter/X (if applicable)
- Newsletter signup (repeated from Home)
- "Built by the community, for the community"
- Copyright 2025-present
- Link to code of conduct

**Reusable CTAs**
| CTA | Style | Target |
|---|---|---|
| "Register Now" | Primary, purple filled | Luma |
| "Join on LinkedIn" | Secondary, outlined | LinkedIn |
| "Watch Recordings" | Tertiary, text link | YouTube |
| "Join WhatsApp" | Community, green accent outlined | WhatsApp |
| "Bring AI-Sec to Your City" | Form CTA | appears on Home + Get Involved |

## Security

- Semantic HTML, proper `h1 > h2 > h3` hierarchy
- Alt text on every image
- No secrets in client-side JS
- All forms: CAPTCHA-ready placeholder (host-dependent, wire up later)
- Security headers documented per-host in `/deploy`, not in HTML
- `robots.txt` and `sitemap.xml` in root
- ARIA labels on interactive elements

## SEO

- Meta titles with primary keywords: "AI security community", "AI red teaming", "LLM security", "AI security training", "prompt injection"
- Meta description: "AI-SEC Community is a practitioner-led network covering AI security and AI for security — workshops, CTFs, meetups, and talks."
- OG tags (title, description, image) per page for LinkedIn/Twitter cards
- Local keywords: "AI security meetup Bangalore", "AI security community India"
- One `<h1>` per page, logical `<h2>`/`<h3>` nesting
- `sitemap.xml` and `robots.txt` in root

## Do Not

- Do NOT build a backend, database, or CMS
- Do NOT add a mentorship booking system
- Do NOT use any framework (React, Next.js, Vue, etc.) — vanilla only
- Do NOT hardcode host-specific config into HTML/CSS/JS
- Do NOT use AI-hype or fear-mongering copy
- Do NOT say "users" or "leads" — say "members" or "practitioners"
