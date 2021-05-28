#!/bin/bash

docker exec -it slg-backend sh -c "cd /usr/backend && npm run typeorm:drop:schema"
docker exec -it slg-backend sh -c "cd /usr/backend && npm run typeorm:migration:run"