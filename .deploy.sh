#!/bin/bash

echo -e "\n\033[32m1. Creating app folder\033[0m"
mkdir ./www
mkdir ./www/public

echo -e "\n\033[32m2. Building frontend\033[0m"
cd ./frontend 
npm i --produdction
npm run build --produdction
mv ./dist ../www/public/

echo -e "\n\033[32m3. Building backend\033[0m"
cd ../backend
npm i --produdction
npm run build --produdction
cp ./dist ../www
cp ./.prod.env ../www/.env
cp ./package.json ../www
cp ./tsconfig.build.json ../www

echo -e "\n\033[42m Done! \033[0m\n"
