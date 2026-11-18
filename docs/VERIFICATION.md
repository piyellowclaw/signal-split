# Verification — 2026-11-19

## Passed
- Bun 1.4.4 / canary test runner: 7 tests, 0 failures, 2,026 assertions, ~44ms; evidence/test-output.txt. Includes 1,000 complete engine reset simulations and perfect full run.
- Static build succeeds; dist ~36 KiB on disk before optional evidence, zero dependencies.
- Real Chromium openclaw profile at localhost:4173; initial screen, active gameplay, perfect +150 catch, full 75-active-second end (330 score / 3 linked with mostly unattended play), saved TEST callsign, persistent reload and separate board all observed. Automated pointer/keyboard inputs; not human playtesting.
- Keyboard rotates (0.3662→1.1749 radians after ~300ms right), Space flips (→4.3165). P pauses: time held exactly over 700ms. Final fix verified: P resumes with resume button focused.
- 20 browser start→pause→abandon resets: every fresh score/time/chain zero, no done waves.
- Local board saves to localStorage; survives reload. Separate tab live update verified using temporary SYNC TEST row then removed. TEST score is deliberately marked test data; no fabricated leaderboard competitors.
- Low motion/contrast pressed states and persistence verified, default sound muted; Web Audio API code inspected but audible output not subjectively verified.
- 390px mobile layout captured/inspected; no horizontal overflow. Small-screen title refinement applied afterward. Desktop 1200×900 final screenshot inspected.
- Browser error log 0 after gameplay and final reload. Resource entries only style.css, src/app.js, src/engine.js on loopback. Source scan found no fetch/XHR/WebSocket/remote URLs in runtime. No analytics/CDN/fonts/assets. Offline here means local HTTP server with no internet, not standalone file:// or guaranteed hosted-page reload without a network.
- Frame diagnostics after ~9,652 frames averaged 16.67ms (~60fps) on current machine. Not a broad hardware benchmark, memory soak or guarantee.
- Real recording capability checked: captureStream + MediaRecorder + VP9 supported. Full public demo not yet captured/uploaded.

## Inspected evidence
01-start.png: default start scene (cover candidate).
02-gameplay.png: real perfect catch with visible next approach.
03-end.png: real end + locally saved TEST score.
04-board.png: separate scoreboard.
05-mobile.png: contrast/low-motion small-screen before minor layout refinement.
06-final.png: final default desktop UI, test score and keyboard focus.

## Remaining coordinator gates
Independent code/product review; actual JetBrains project work and evidence; public repository/license/readme verification; judge-accessible deployed build; <=3min real full-UI video + public YouTube URL; legal entrant/account/email eligibility and final Devpost receipt. Broader human usability, Safari/Firefox, true touch hardware, screen-reader experience and blocked-storage browser behavior are not claimed as tested.

## Independent focus-safety regression
Independent source/browser review found a medium keyboard focus-departure defect. Fixed by pausing on arena blur while preserving Tab destination and clearing held keys. Actual Tab/Shift+Tab, held-key departure with frozen time/angle, explicit Resume restoring arena, 20 focus cycles, pointer/flip, synthetic touch and P pause/resume passed; zero browser errors. Synthetic input is not human/hardware usability testing. Final engine tests remain7 pass/2,026 assertions; build and diff whitespace checks pass. Final recorded video is source-hash matched; see docs/DEMO.md.
