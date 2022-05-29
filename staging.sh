#!/usr/bin/env sh

if [ ! -f ${pwd}env/staging.env ]; then
    echo "Missing staging.env"
    exit 1
fi

# Use staging environment variables
cp env/staging.env .env

# Spin down any running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)

# Create network (allows containers to talk to each other by name instead of ip address)
docker network create living-room-arcades

# Build image using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 \
DOCKER_BUILDKIT=1 \
docker-compose -f docker-compose.yml \
    -f docker-compose.next.yml \
    -f docker-compose.nginx.yml \
    build --parallel

# Spin up development containers
# --renew-anon-volumes prevents Postgres from retrieving volumes from previous containers after being killed
# --remove-orphans removes any renamed containers
docker-compose -f docker-compose.yml \
    -f docker-compose.next.yml \
    -f docker-compose.nginx.yml \
    up --renew-anon-volumes --remove-orphans -d
