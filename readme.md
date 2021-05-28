# Run App locally :
:warning: You must have **docker** installed and running on your machine!

1. Open a command-line at the root of the project.
2. Navigate to `docker/local` :
   ```sh
   cd docker/local
   ```
3. Run the `run-local` script:
   ```sh
   chmod +x run-local.sh
   ./run-local.sh
   ```
   
❗️ Wait until all services are started! This can take up to 5 minutes depending on your system. Look for: 
```sh
...
slg-frontend    | [HPM] Proxy created: /api  ->  http://192.168.10.6:8000/api
slg-frontend    | [HPM] Proxy rewrite rule created: "^/api" ~> ""
slg-frontend    | [HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
...
AND 
```sh
...
slg-backend     | [Nest] 80   - 05/28/2021, 1:33:01 PM   [NestApplication] Nest application successfully started +14ms
slg-backend     | Application is running on: http://[::1]:8000
...
```
> on first run, packages will be installed. Be sure to wait for BOTH services to be up!

:pushpin:  **If it's the first time you run the app, you need to seed the database :**
  1. Open a new command line window in `docker/local`
  2. Run the `docker-reset-db` script:
  ```sh
  chmod +x docker-reset-db.sh
  ./docker-reset-db.sh
  ```
  
:rocket: Open your favorite web-browser and navigate to `http://localhost:4200`

You can now login with one of the following test users: 

```sh
test-dev@yopmail.com
test-admin@yopmail.com
test-compta@yopmail.com

pwd: 1234
```
