#!/bin/bash

source scripts/config.cfg

export DDP_DEFAULT_CONNECTION_URL=$METEOR_HOST

echo $DDP_DEFAULT_CONNECTION_URL
cd meteor
cd app
meteor 