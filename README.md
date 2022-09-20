# Nodejs and MongoDB Api

NOTE:

I have added Mongo DB Atlas string, so no need to run mongo instance in this branch

TODO: Working on Integrating JWT AUTH, Hosting the api on Raspberry PI4 and running it with minikube.

### Docker Setup: I have used two images, which i have build & uploaded on my Docker account and i have used docker-compose.yml(included in project) to run services all together.

- I am assuming that docker is intall in the system otherwise its very easy to setup.
- Link: https://docs.docker.com/get-docker/
- Link: https://docs.docker.com/compose/install/
- After installing docker , please run in terminal
  - 1.  docker -v
  - 2.  docker-compose -v
    - If above two commands give version number then you are ready to run the app.
  - 3. RUN: docker-compose up , the server is up and running , to test:
       - http://localhost:3000/api/v1/products (Hit the URL in any browser or in POSTMAN)
  - 4. Move to below instruction to run POSTMAN scripts or you can play in POSTMAN.

### I have used Postman to setup testing of endpoints.

- API Schema: https://www.getpostman.com/collections/ae29476c06b6d613f7c3
- Download postman : https://www.postman.com/downloads/
- RUN: npm i -g newman (To run test script, https://www.npmjs.com/package/newman)
- Command to test all endpoints together:
  1.  RUN: npm run test-api (if it gives error , go to point ii)
  2.  RUN: newman run https://www.postman.com/collections/ae29476c06b6d613f7c3 -e XERO.postman_globals.json -k
- To play with endpoints, please import XERO_AmandeepSingh.postman_collection.json (Included in project dir) file in Postman desktop app.

## Endpoints: All routes are defined in routes/product.route.js

- Base URL: http://localhost:3000/api/v1

1. `GET /products` - gets all products.
2. `GET /products?name={name}` - finds all products matching the specified name.
3. `GET /products/{productID}` - gets the project that matches the specified ID - ID is a GUID.
4. `POST /products` - creates a new product.
5. `PUT /products/{productID}` - updates a product.
6. `DELETE /products/{productID}` - deletes a product and its options.
7. `GET /products/{productID}/options` - finds all options for a specified product.
8. `GET /products/{productID}/options/{optionId}` - finds the specified product option for the specified product.
9. `POST /products/{productID}/options` - adds a new product option to the specified product.
10. `PUT /products/{productID}/options/{optionId}` - updates the specified product option.
11. `DELETE /products/{productID}/options/{optionId}` - deletes the specified product option.

All models are specified in the `/Models` folder,

### Help while running Docker Solution, (If docker file gives error while executing above commands. Follow below instructions)

## Stop container on current dir 2. if there is a docker-compose.yml

1. docker-compose down

## Remove all containers

2. docker rm -fv $(docker ps -aq)

## List who's using the port

3. sudo lsof -i -P -n | grep 27017
4. then: - kill -9 <process id> (macOS) or - sudo kill <process id> (Linux).
