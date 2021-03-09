#!/bin/bash

echo -e "\n\033[32m1. Creating app folder\033[0m"
mkdir ./app
mkdir ./app/www
mkdir ./app/www/public
mkdir ./app/database

echo -e "\n\033[32m2. Building frontend\033[0m"
cd ./frontend 
npm i --produdction
npm run build --produdction
mv ./dist ../app/www/public/

echo -e "\n\033[32m3. Building backend\033[0m"
cd ../backend
npm i --produdction
npm run build --produdction
cp -r ./dist ../app/www/
cp ./package.json ../app/www
cp ./tsconfig.build.json ../app/www

echo -e "\n\033[42m Done! \033[0m\n"
