# Images & videos

Drop files here and they appear on the site automatically.
Name them exactly as below; any of `.mp4` `.webm` `.gif` `.webp` `.png` `.jpg` `.jpeg` works.
Videos play muted on a loop while on screen, and the slot takes the video's shape.

- `profile` — Access Pass photo (hero)
- `candid` — "me, mid-debug" polaroid (About)
- `martypop` — MartyPop featured card
- `anatomy` — Bone Anatomy Study App card (`anatomy.mp4` in use)
- `schedule-app` — Group Schedule Management App card (`schedule-app.mp4`, shown in a phone frame via `data-frame="phone"` on the slot)
- `snake` — Snake Game card (`snake.mp4`; `data-fit="cover"` keeps the card's 230px height and crops to fill)
- `spreadsheet` — Spreadsheet App card (`spreadsheet.mp4`, cropped to the form + top rows; `data-fit="cover"`)
- `chat` — Chat Server card (`chat.mp4`, the two client windows cropped side by side; `data-fit="cover"`)
- `bakeoff` — Square Matching card (`bakeoff.mp4`, cropped to the play area without the key hints; `data-fit="cover"`)
- `image-panel` — Image Panel card (`image-panel.mp4`, bottom whitespace cropped off; slot takes the video's shape)

Tip: keep videos small. Re-encode screen recordings to ~600px wide with no audio, e.g.
`ffmpeg -i in.mov -an -vf scale=600:-2,fps=30 -c:v libx264 -crf 26 -preset slow -movflags +faststart out.mp4`
