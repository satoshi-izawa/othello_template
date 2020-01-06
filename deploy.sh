#! /bin/bash

export CONTAINER_USER=builder
export CONTAINER_WORK=/home/$CONTAINER_USER/

docker-compose build --no-cache builder
docker-compose down
docker-compose up -d builder