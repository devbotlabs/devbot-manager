#!/bin/bash

source scripts/config.cfg

export DDP_DEFAULT_CONNECTION_URL=$DOCKER_IP/meteor

echo $DDP_DEFAULT_CONNECTION_URL
cd meteor
cd app
meteor 