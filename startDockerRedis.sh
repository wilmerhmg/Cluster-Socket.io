#!/bin/bash
docker run -i -t --name redis-cluster-socket -p 32769:6379 -d redis:5.0.3-alpine