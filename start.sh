#!/bin/bash

echo "[development] starting..."

echo "[development] down containers started"
docker-compose down

docker network rm happy_happy-network

echo "[development] building containers"
docker-compose up --build
