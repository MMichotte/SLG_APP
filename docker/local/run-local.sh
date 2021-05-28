#!/bin/bash

cp .env_template .env
cp ../../backend/.env ../../backend/.env_backup
cp .env ../../backend/.env

docker-compose up 
