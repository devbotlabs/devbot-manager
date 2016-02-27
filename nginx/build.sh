#!/bin/bash
 PROJECT_PATH=`pwd`
 


 eval "$(docker-machine env devbot)"

 docker build -t localhost:5000/nginx-devbot-manager ${PROJECT_PATH}/nginx
 docker push localhost:5000/nginx-devbot-manager
 
 
 docker ps

