# Brynlee Ko — portfolio

My personal portfolio: software engineering + UX, with a scrapbook-meets-arcade look.
*I design it, then I build it.*

**Live site:** https://brynlee-daon-ko.github.io/portfolio/

## What's in here

```
index.html          the whole page (layout and styling are inline, exactly as designed)
css/style.css       themes, fonts, hover + scroll animations
js/main.js          theme switcher, scroll effects, letter wave, badge tilt, image slots
assets/fonts/       self-hosted fonts (+ their licenses)
assets/images/      drop your photos / GIFs here (see below)
assets/favicon.svg  the little sparkle in the browser tab
```

Plain HTML, CSS and JavaScript — no framework and no build step. Edit a file, refresh, done.

## Adding photos and GIFs

Every placeholder on the page is an **image slot**. Put a file with the matching name in
`assets/images/` and it replaces the placeholder automatically — no code changes.
Any of these formats works: `.gif`, `.webp`, `.png`, `.jpg`, `.jpeg`.

| File name (any of the formats) | Where it shows up |
| --- | --- |
| `profile` | the photo on the Access Pass in the hero |
| `candid` | the taped polaroid in "Hey, I'm Brynlee" ("me, mid-debug") |
| `martypop` | the MartyPop featured card |
| `anatomy` | the Bone Anatomy Study App card |
| `spreadsheet` | the Spreadsheet App card |
| `chat` | the Chat Server card |
| `image-processor` | the Image Processor card |

Example: save your headshot as `assets/images/profile.jpg`, commit, push. Done.
The Snake Game card shows a pixel-art game screen instead of a slot — it's part of the design.

Tips: keep GIFs under ~3 MB so the page stays fast (convert big screen recordings to `.webp`
or `.mp4`-sourced GIFs), and crop photos close to the slot's shape (the profile slot is roughly 4:3 tall-ish).

## Themes

Four themes, picked with the dots in the top bar (the choice is remembered per visitor):
**Cherry Soda** (default), **Night Garden**, **Persimmon Studio**, **Sakura Café**.

Each theme is a block of CSS variables at the top of `css/style.css`
(`html[data-theme="..."]`). Change a hex value there and the whole page follows.
`--v1`/`--v2`/`--v3` are the brighter colors used only for icons and sparkles.

## Effects

- **Scroll effects** (name drifts apart, badge swings, notes slap onto the board, cards get dealt,
  tickets print, keys type, XP bar fills) use CSS scroll-driven animations. Browsers that don't
  support them simply show the page without the motion.
- Everything respects **Reduce Motion**: if a visitor has it turned on, animations are off.

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` directly also works, but image slots load best through a local server.)

## Deploy

The site is served by **GitHub Pages** from the `main` branch (root folder):
Settings → Pages → Build and deployment → *Deploy from a branch* → `main` / `/ (root)`.
Every push to `main` updates the live site within a minute or two.

## Credits

See [CREDITS.md](CREDITS.md).
