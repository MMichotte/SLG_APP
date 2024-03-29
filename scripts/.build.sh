#!/bin/bash
cd ..

echo -e "\n\033[32m1. Creating app folder\033[0m"
mkdir ./app
mkdir ./app/www
mkdir ./app/www/public
mkdir ./app/www/bills
mkdir ./app/www/bills/suppliers
mkdir ./app/www/bills/customers
mkdir ./app/database
mkdir ./app/caddy

echo -e "\n\033[32m2. Building frontend\033[0m"
cd ./frontend 
npm i --produdction
npm run build --produdction
mv ./dist ../app/www/public/
if [ $? -eq 0 ]
then
  echo -e "\n\033[34mFrontend successfully built.\033[0m"
else
  exit 1
fi

echo -e "\n\033[32m3. Building backend\033[0m"
cd ../backend
mv ./ormconfig.ts ./temp.txt
mv ./ormconfig.prod.ts ./ormconfig.ts
npm i --produdction
npm run build --produdction
if [ $? -eq 0 ]
then
  echo -e "\n\033[34mBackend successfully built.\033[0m"
else
  exit 1
fi
rm -rf ./dist/database
cp -r ./dist ../app/www/
cp ./package.json ../app/www
cp ./tsconfig.build.json ../app/www
mv ./ormconfig.ts ./ormconfig.prod.ts
mv ./temp.txt ./ormconfig.ts

echo -e "\n\033[32m3. Adding configuration files\033[0m"
cd ..
cp ./docker/docker-compose.yml ./app
cp ./docker/caddy/Caddyfile ./app/caddy
cp -r ./vps-config/backups ./app

echo -e "\n\033[42m Done! \033[0m\n"
