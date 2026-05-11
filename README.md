# Why Walk? Fly!

A single-page book landing site for **Why Walk? Fly!** by Joaquim Barretto,
rebuilt from scratch using the design system from the Novela ThemeForest
template (item 9380450) — exact tokens lifted from the original SCSS:

- **Accent gold:** `#BF9456`
- **Heading font:** Ovo (serif)
- **Body font:** Source Sans Pro (sans)
- **Drop-cap:** gold serif first-letter at `3.3em`
- **Layout pattern:** full-bleed 50/50 splits for About + Author
- **Carousels:** chapters (20 stories) and reviews, both via embla-carousel

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + embla-carousel + lucide-react.
Drop-in compatible with Loveable.dev (uses `lovable-tagger` in dev mode).

## Local dev

```bash
npm install   # or: bun install
npm run dev
```

Dev server runs on port 8080.

## Image placeholders

The site references these images in `/public/` — replace with real artwork:

- `/book-cover.jpg` — front cover, ratio 2:3
- `/hero-bg.jpg` — wide atmospheric hero background (sky / clouds / horizon)
- `/about-bg.jpg` — atmospheric image behind the About pull-quote
- `/chapters-bg.jpg` — dark moody image behind the chapter carousel
- `/author.jpg` — Joaquim portrait, tall crop, top-aligned
- `/clouds.jpg` — wide clouds image behind the "read free" CTA

Until those files are added, the section background colors fall back to
dark slate so the design still reads.

## Sections

1. **Hero** — dark photo, white serif H1, two buttons, book cover at 6° tilt
2. **About** — 50/50 split: drop-cap body left, pull-quote card over photo right
3. **Chapters** — embla carousel of 20 chapter teasers in a white card over a
   fixed-attachment dark background
4. **Author** — 50/50 split: photo left, Joaquim bio with drop-cap right
5. **Reviews** — centered testimonial carousel with large gold quote-mark
6. **Read Free** — dark CTA band, PDF download, newsletter subscribe form,
   1 Corinthians 2:9 quote
7. **Contact** — simple form (name / email / message) + phone, email, location

## Content source

All copy is from <https://whywalkfly.com>. No retailer / buy links are
included — the book is given away free; 100% of any proceeds go to
Joaquim & Tuula's humanitarian work.
