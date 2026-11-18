# Capture publication inventory

## Safe intended commit/release artifacts (after parent review)
- docs/DEMO.md: truthful final demo explanation and reproduction steps.
- scripts/capture-demo.js, capture-encode.sh, capture-verify.js, capture-review.js: optional capture utilities, sanitized to environment variables/default executable names; no absolute user/home/runtime identifiers, credentials, account IDs, session IDs or private browser profile references.
- scripts/capture-console.js: original optional canvas-only helper, safe but not used for full-UI final demo.
- evidence/demo-final/signal-split-real-demo.webm: intended user-authorized video artifact; optional release asset rather than git binary if preferred.
- evidence/demo-final/decoded-contact-sheet.png, selected decoded-*.png, video-verification.json, captured-build-sha256.json, final-source-parity.json, capture-privacy-audit.json, capture-report.json, PUBLICATION.md, playback.html. Reports contain only local test URLs, public game state, build hashes and disclosure. Callsign is synthetic DEMO, not personal data.
- evidence/demo-final-build is an exact public-safe game build snapshot, but redundant with final dist; usually exclude it and retain only captured-build-sha256.json.

## Keep local / do not bulk-add
- evidence/demo-final/frames/** and older evidence/demo/frames/**: ~90MiB each of raw intermediate captures, not needed for publication. No raw frames added to git by production.
- evidence/demo/**, evidence/demo-build/**: superseded first take/build; publication could imply wrong final source. Keep locally for audit, do not upload as final demo.
- evidence/demo-capture-status.md: internal coordination/process handles, not a public document.
- evidence/demo-final/encoder.log and older encoder logs: include machine/tool build paths; unnecessary public data.
- decoded-contact-sheet.html: embeds redundant PNG data, safe content but large and unnecessary if PNG delivered.
- scripts/capture-finalize.js: sanitized legacy still-recovery helper for superseded take only; not needed for final all-moving capture.
- No browser downloads, personal browser profile directories, account pages or credentials are included.

## Capture dependencies (not game runtime dependencies)
Used existing Playwright Core 1.63.0 (Apache-2.0), existing Chrome and existing VP9-capable FFmpeg. No downloaded/installed packages, no browser/encoder binaries vendored. Optional script users must supply compatible installed tools using PLAYWRIGHT_MODULE, CHROME_EXECUTABLE and FFMPEG where needed. Keep local tool paths in invocation environment, not committed source.

Final audit: all four captured source files match current source and dist; all capture utility JS syntax checks and shell syntax check pass; manual review plus identifier/path pattern scan found no flags. No raw frames are tracked. Before publication: explicitly stage selected paths, inspect git diff --cached/name-only and size. Never use broad git add evidence/. Parent owns all publication and final compliance.
