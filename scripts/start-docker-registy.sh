#!/bin/bash
 eval "$(docker-machine env devbot)"

 docker run -d -p 5000:5000 --restart=always --name registry registry:2

 docker ps

