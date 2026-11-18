#!/bin/sh
# Encode only genuine time-indexed browser JPEG frames. No frame interpolation.
set -eu
cd "$(dirname "$0")/.."
FFMPEG="${FFMPEG:-ffmpeg}"
cat evidence/demo-final/frames/*.jpg | "$FFMPEG" -y -f image2pipe -r 10 -vcodec mjpeg -i pipe:0 -c:v libvpx-vp9 -b:v 1800k -deadline realtime -cpu-used 6 evidence/demo-final/signal-split-real-demo.webm > evidence/demo-final/encoder.log 2>&1
