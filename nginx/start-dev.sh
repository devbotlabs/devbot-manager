#!/bin/bash
 PROJECT_PATH=`pwd`

 eval "$(docker-machine env devbot)"

 docker run --name nginx -p 80:80 -d -v ${PROJECT_PATH}/www:/var/www:ro \
  -v ${PROJECT_PATH}/nginx/conf/sites-enabled:/etc/nginx/sites-enabled:rw \
  -v ${PROJECT_PATH}/nginx/conf/sites-available:/etc/nginx/sites-available:rw \
  localhost:5000/nginx-devbot-manager

 docker ps

