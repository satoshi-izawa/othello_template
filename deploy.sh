#! /bin/bash

export CONTAINER_USER=builder
export CONTAINER_WORK=/home/$CONTAINER_USER/

docker-compose build
docker-compose down
docker-compose up -d
