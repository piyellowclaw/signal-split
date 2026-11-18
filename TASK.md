# SIGNAL / SPLIT — production checklist
Owner: production child; main owns JetBrains evidence/publication/submission.
- [x] Compare concepts + existing libraries
- [x] Implement polished 75s booth game and local leaderboard
- [x] Logic tests, build, real browser loop/reset/performance/local-only request checks (limits in docs/VERIFICATION.md)
- [x] English methodology, AI disclosure, recording plan and inspected screenshots
- [ ] Independent parent review; genuine JetBrains work pending

Concept comparison: (1) Orbit Cut: time a radial gate; attractive but generic one-button timing. (2) Echo Draft: remember and replay a tactical pattern; harder onboarding and less spectator clarity. (3) SIGNAL / SPLIT: rotate a two-ended receiver so two incoming signals land together, optionally invert endpoints for a precision bonus. Selected: spatial anticipation + simultaneous alignment are clear competitive skills, single-axis mouse/arrow input, distinctive optical instrument presentation. Original implementation and procedural art, no sponsor/game logos.

Existing solution preflight: Phaser is maintained and MIT (official repository LICENSE.md inspected 2026-11-19). It is appropriate for a bigger arcade game but adds runtime/bundling weight not needed for a single canvas. Use platform Canvas2D/Web Audio + DOM; zero runtime or development dependencies, no CDN, no external fonts. Bun is existing build/test tooling; no installation. No other game code or assets copied.

Acceptance: 75s round; mouse or arrows rotate, Space/click swaps endpoint polarity; white open-circle endpoint catches open-circle signal, gold diamond catches diamond. Automatic catch when incoming pair crosses receiver ring; alignment matters, swap gives agency. Seeded equal challenges; local best10, separate local scoreboard URL; pause on blur, mute/reduced motion/high contrast; start/end/reset and keyboard navigation.
