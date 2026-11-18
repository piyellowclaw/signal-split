# SIGNAL / SPLIT
**Two ends. One focus.** Original 75-second precision arcade instrument for event booths.

Play the public preview: https://piyellowclaw.github.io/signal-split/
Source: https://github.com/piyellowclaw/signal-split

Preview status: independent game review and focus-safety regression passed. Competition-tooling evidence and formal entry remain pending. This is not a claim of eligibility, official endorsement, or completed contest submission.

Rotate a two-ended receiver to catch incoming circle/diamond pairs at the inner ring. Circle matches circle; diamond matches diamond. Perfect alignment earns 150 points, ordinary link 90. Every five consecutive catches raises the multiplier (max ×4); a miss resets it. Fixed circuit: 31 pairs, three tempo stages, same opportunity for every player.

## Play / build
Requires a current browser with Canvas2D, ES modules, Pointer Events. Zero runtime or development dependencies; no npm install. Existing Bun 1.4.4 tested. Run:
```sh
bun test
bun scripts/build.js
bun scripts/serve.js --dist
```
Open http://127.0.0.1:4173. Alternatively use Python 3: `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist`. A static HTTP server is needed; file:// module loading is not guaranteed. Deploy only dist contents to any static host. No server API, remote assets, login, analytics or runtime internet access. Dependency lock is explicit absence of dependencies.

## Controls and accessibility
Mouse: aim around center; click flips ends. Keyboard: arrows or A/D rotate; Space flips; P/Escape pauses when arena focused. Touch: tap/drag aims (no tap flip). Tab/Enter operate menus. Start focuses arena; end focuses Next operator. Sound off by default; low motion initially follows OS preference; contrast option and shape coding supplement color. Spatial tracking remains visual: not a fully nonvisual game or scientifically validated trainer.

## Booth operation
Run local server; keep browser on same origin. Open `?board` in another window of the **same profile and origin** for second-display live scores; this is not cross-device/LAN sync. Play, optionally save a ten-character callsign, then Next operator. Time/score/chain/waves reset; settings and top ten persist. Changing tabs or moving keyboard focus away from the arena pauses and clears held steering; explicit Resume returns focus to the arena. One scoring operator at a time is intended; concurrent saves are not atomic. Round is 75 active seconds, not including pauses. Clearing this site’s browser data resets board/settings. Blocked storage falls back to in-memory scores with notice. No personal information needed. Callsigns are filtered/text-rendered; scores are friendly local competition, not tamper-proof rankings.

## Architecture
- src/engine.js: seeded schedule, circular angle errors, scoring, bounded step, board validation. Pure logic.
- src/app.js: one animation loop; procedural Canvas2D/Web Audio; DOM idle/play/pause/end state machine; localStorage board/settings.
- index.html/style.css: responsive semantic controls, scoreboard, focus styling and status announcements.
- scripts: static copy build and loopback-only preview.
- tests: schedule parity, polarity, tolerance, chain, time, complete skilled round, 1,000 full resets and hostile board input.

## Originality and disclosure
MIT; see LICENSE and docs/PROVENANCE.md. Original procedural art/audio; no third-party game art/code/logos. Independent competition entry, not an official product. Piyellow/OpenClaw (OpenAI GPT-6.1-sol during initial production) designed and implemented this project with disclosed AI assistance. Human entrant authorizes/reviews submission. Browser tests include automated inputs, not claimed as human testing. **Genuine JetBrains project use is a coordinator-owned eligibility gate; not asserted by this README.**
See docs/SUBMISSION-DRAFT.md, docs/VERIFICATION.md and docs/DEMO.md.
