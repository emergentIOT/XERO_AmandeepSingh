# refactor-this

The attached project is a poorly written products API in C#.

Please evaluate and refactor areas where you think can be improved.

Consider all aspects of good software engineering and show us how you'll make it #beautiful and make it a production ready code.

## Getting staarted for applicants

There should be these endpoints:

1. `GET /products` - gets all products.
2. `GET /products?name={name}` - finds all products matching the specified name.
3. `GET /products/{id}` - gets the project that matches the specified ID - ID is a GUID.
4. `POST /products` - creates a new product.
5. `PUT /products/{id}` - updates a product.
6. `DELETE /products/{id}` - deletes a product and its options.
7. `GET /products/{id}/options` - finds all options for a specified product.
8. `GET /products/{id}/options/{optionId}` - finds the specified product option for the specified product.
9. `POST /products/{id}/options` - adds a new product option to the specified product.
10. `PUT /products/{id}/options/{optionId}` - updates the specified product option.
11. `DELETE /products/{id}/options/{optionId}` - deletes the specified product option.

All models are specified in the `/Models` folder, but should conform to:

## Help while running Docker Solution

## Stop container on current dir 2. if there is a docker-compose.yml

1. docker-compose down

## Remove all containers

2. docker rm -fv $(docker ps -aq)

## List who's using the port

3. sudo lsof -i -P -n | grep <port number>
4. then: - kill -9 <process id> (macOS) or - sudo kill <process id> (Linux).
   MONGODB_URI=mongodb://mongo:27017/products
