#!/bin/bash

#CONFIGS:

## Postgres db container name
DB_CONT_NAME=xxxx
PG_USER=xxx
PG_DB=xxx

## Number of backup files to keep
MAX_BCKS=30

#-----------

isRunning=$(docker ps -q -f name=$DB_CONT_NAME)
if [ -z $isRunning ]
then
  echo $DB_CONT_NAME is down!
  exit 1
fi

MAX_BCKS_H=$(($MAX_BCKS + 1))

mkdir -p db_backups
docker exec $DB_CONT_NAME pg_dump -U $PG_USER $PG_DB | gzip >./db_backups/$PG_DB-$(date +%Y-%m-%d_%H:%M).tar.gz
cd ./db_backups
ls -t | tail -n +$MAX_BCKS_H | xargs -r rm -f

exit 0