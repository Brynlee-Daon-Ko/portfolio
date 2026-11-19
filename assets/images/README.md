# Images & videos

Drop files here and they appear on the site automatically.
Name them exactly as below; any of `.mp4` `.webm` `.gif` `.webp` `.png` `.jpg` `.jpeg` works.
Videos play muted on a loop while on screen, and the slot takes the video's shape.

- `profile` — Access Pass photo (hero)
- `candid` — "me, mid-debug" polaroid (About)
- `martypop` — MartyPop featured card
- `anatomy` — Bone Anatomy Study App card (`anatomy.mp4` in use)
- `schedule-app` — Group Schedule Management App card (`schedule-app.mp4`, shown in a phone frame via `data-frame="phone"` on the slot)
- `spreadsheet` — Spreadsheet App card
- `chat` — Chat Server card
- `image-processor` — Image Processor card

Tip: keep videos small. Re-encode screen recordings to ~600px wide with no audio, e.g.
`ffmpeg -i in.mov -an -vf scale=600:-2,fps=30 -c:v libx264 -crf 26 -preset slow -movflags +faststart out.mp4`
