#!/bin/sh

docker run --interactive --tty \
   --volume $PWD:/app \
   --workdir /app \
   --user $(id -u):$(id -g) \
   node:8 npm $@
