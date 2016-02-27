#!/bin/bash

export HOST_IP="192.168.0.14"
export VM_IP="192.168.0.17"

export WEBPACK_PORT=1337
export METEOR_PORT=3000

export DOCKERMACHINE="ubuntu"

trap 'kill %1; kill %2;' SIGINT
nginx/start.sh &
cd meteor && meteor &
node webpack/webpack.dev.server.hot.js

