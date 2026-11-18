# Verified final-build demo

## Intended video
`evidence/demo-final/signal-split-real-demo.webm`
- **103.6 seconds (1:43.6)**, 1440 × 960 landscape, VP9 WebM, 10fps, silent.
- 7,431,861 bytes. SHA-256: `d3b7893d5b60715c703f671b3dcaf52c43f81ba232bc2e94c220703105e2656d`.
- Actual complete DOM browser footage, ordinary automated mouse/keyboard inputs, original running game code. Captions disclose automated demo play and AI assistance. No clock/score injection, generated replacement animation, accelerated gameplay or still-frame substitutes.
- First segment 0–98.1s: start, actual full round, score, save, **live Next operator click/reset**, live focus-pause/resume, low-motion/contrast/sound controls. One navigation cut at98.1s leads to live scoreboard through103.6s. Browser chrome/private desktop/account tabs never captured.
- Round starts6.6s and ends81.7s:75.1 recorded seconds for75 active game seconds. Actual score10,050,29 links and2 deliberate misses, including an actual Space polarity flip.
- Reset checkpoint: score0, chain0, no completed waves, time0.0833s immediately after actual Next operator.
- Focus-fix checkpoint: Tab leaves canvas, paused=true, game time remains exactly frozen across600ms; explicit Resume then continues. This is real final code behavior, not an explanatory mockup.

## Final source parity / inspection
Captured `index.html`, `style.css`, `src/app.js` and `src/engine.js` all match BOTH current source and dist at final readback. App SHA-256 including focus fix: `cb5a50033dabf58a666334dbd9d1cbbc40a192c0d484c2c688585d208b375942`. All hashes are in `captured-build-sha256.json`. Parent must recheck if source changes afterward.

Chrome successfully decoded the WebM and sought to3/23/57/84/89/92/96/101 seconds; actual decoded PNGs and `decoded-contact-sheet.png` were visually inspected. They show start, working HUD/gameplay, end score, live reset, focus-pause, accessibility and live board. `video-verification.json` records duration/dimensions/bytes/hash. `capture-report.json` records section timing, actual read-only game checkpoints, zero page errors and only loopback game requests. No claim of human playtesting or audible-audio verification.

## Reproduction (optional capture tooling, not game runtime)
Existing Playwright Core1.63.0 (Apache-2.0), Chrome and a VP9-capable FFmpeg were used. No package installations, spending, desktop control, account attachment or global changes. Tool paths are supplied in the local environment, never committed personal paths.

1. Build/review final dist first. Archive existing `evidence/demo-final` before a new take; the script refuses to mix or overwrite verified takes.
2. Set `PLAYWRIGHT_MODULE` to an installed Playwright module if it is not resolvable as `playwright-core`; optionally set `CHROME_EXECUTABLE` (otherwise installed Chrome channel is used).
3. `bun scripts/capture-demo.js` captures genuine full-UI JPEG frames, with stop/restart around the single navigation cut to avoid screenshot/navigation races. It also snapshots the exact static build and records SHA-256 hashes.
4. Set `FFMPEG` to an existing compatible encoder if not on PATH; `sh scripts/capture-encode.sh` creates WebM without interpolation or speed changes.
5. `bun scripts/capture-verify.js` decodes the actual video, samples frames and generates metadata/contact sheet. `bun scripts/capture-review.js` offers a loopback-only60s evidence viewer.
6. Independently inspect the final video, source parity, disclosure and staged artifact list before upload.

`capture-console.js` is an optional canvas-only helper, NOT the final video route. `capture-finalize.js` is a sanitized legacy still-recovery helper for the superseded first take, NOT used by this all-moving final capture. Earlier capture failures and obsolete takes were retained locally, not substituted for this verified final video.

## Publication / local-only inventory
See `evidence/demo-final/PUBLICATION.md` for the explicit safe-to-commit list. Intended artifacts: sanitized capture scripts, this document, final WebM (or release asset), contact-sheet PNG/selected decoded frames and small JSON evidence. Reports contain only public game state, hashes, synthetic DEMO callsign and localhost test URLs.

**Never bulk-add evidence/**: raw `demo-final/frames` and old `demo/frames` are large intermediates; old demo/build are superseded; encoder logs contain machine/tool build paths; `demo-capture-status.md` has internal coordination handles. Exclude those from public history. No browser downloads or private account material were created.

Main owns independent final review, actual JetBrains usage evidence, deployment, public YouTube upload and Devpost submission. This production work performs none of those account/publication steps and makes no submission-complete claim.
