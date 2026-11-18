# English submission draft

## Name / pitch
SIGNAL / SPLIT — Two ends. One focus. Rotate a shape-coded receiver, connect incoming signal pairs, and build your precision chain in a 75-second offline arcade challenge.

## Inspiration
A booth game should make sense at a glance, give the person in line something to watch, and make one more try feel irresistible. SIGNAL / SPLIT turns a scientific instrument into a small competitive ritual: read an approach, commit your aim, and stay composed after a miss.

## What it does
Mouse, touch or arrows rotate a two-ended receiver. Match circle to circle and diamond to diamond at the inner ring. Catches happen automatically on arrival. Centered alignment rewards precision, consecutive links increase the multiplier, and three tempo stages lift the tension. Each active round lasts 75 seconds and ends with a score, accuracy summary and next-player reset. A local top-ten board persists without Wi-Fi; same-origin tabs in the same browser profile update live for a second display. Sound is optional; shapes supplement color; reduced-motion, contrast and keyboard controls are available. No account, analytics or remote assets interrupt play.

## Methodology
We compared radial timing, memory patterns and paired-signal alignment. The receiver won: immediate controls combine spatial anticipation and simultaneous alignment while staying legible to spectators. These are game-like competitive skills, not a scientifically validated training/diagnostic test.
A seeded circuit gives each operator the same 31 pairs. Scoring uses wrapped angular error: <=0.095 radians perfect, <=0.31 radians linked, wider misses. Shape polarity makes a 180-degree error meaningful. Pure rules are separated from rendering/storage. Canvas2D/Web Audio/DOM keep packaging small, dependency-free and local-server offline-capable. Phaser (MIT) was considered but its larger engine surface was unnecessary.

## Challenges / testing
The dual-end mechanic needed clarity without more buttons. Shape-coded endpoints, catch windows, approach guides and time-to-link readout explain cause/effect. Resets recreate transient state; bounded timesteps prevent background-tab catch-up jumps. Deterministic tests cover scoring/time/polarity and 1,000 full resets; live browser acceptance covers controls, pause, end, saving and reset. Automated checks are not human booth usability testing.

## AI disclosure
Piyellow/OpenClaw, using OpenAI GPT-6.1-sol during initial production, generated concept comparison, source, procedural visual/audio code, tests and draft copy. Browser checks include automated pointer/keyboard inputs, not claimed as human playtesting. The human entrant authorized work and remains responsible for review, eligibility and submission. No external AI-generated image/3D/audio assets were used. No claim of guaranteed legal uniqueness or automatic protectability.

## JetBrains tooling — PENDING VERIFIED COORDINATOR INPUT
Replace with genuine tool name/version, actual project tasks and evidence before submission. Do not invent IDE usage. Initial production used Bun/browser. Optional eligible workflow bonus needs actual JetBrains-use narrative and public case-study/video URL.

## Future work
Human booth usability testing, broader hardware/browser checks, operator-selectable seeds with separate boards, and accessibility beyond visual spatial tracking. These are not implemented claims.
