# API Market Project
## V 1.0

## Features and Tools
- Windows x64
- Spring Boot
- PostgreSQL
- Docker and docker-compose
- Postman

## Description
This is an Market simulator API developed in Spring Boot.

There are three main endpoints:

* Products
* Purchases
* Client

In the **Products** endpoints we have the following:

* **Get all products**- https://apimarket-production.up.railway.app/market/api/products - GET
* **Get a product** - https://apimarket-production.up.railway.app/market/api/products/{id} - GET
* **Get a product by category** - http://localhost:8091/market/api/products/category/{idCategory} - GET
* **Create a product** - https://apimarket-production.up.railway.app/market/api/products/save - POST
* **Delete a Product** - https://apimarket-production.up.railway.app/market/api/products/delete/{id} - DELETE

In the **Purchases** endpoints we have the following:

* **Get all purchases**- https://apimarket-production.up.railway.app/market/api/products - GET
* **Get a purchase by client** - https://apimarket-production.up.railway.app/market/api/purchases/client/{idClient} - GET
* **Create a Purchase** - https://apimarket-production.up.railway.app/market/api/purchases/save - POST


In the **Client** endpoints we have the following:

* **Get all clients**- https://apimarket-production.up.railway.app/market/api/clients - GET
* **Get a client** - https://apimarket-production.up.railway.app/market/api/clients/{id} - GET
* **Create a Client** - https://apimarket-production.up.railway.app/market/api/clients/save - POST
* **Delete a client** - https://apimarket-production.up.railway.app/market/api/clients/delete/{id} - DELETE


This endpoints has to be executed from Post as following:

![Postman1](https://github.com/RodrigoValda/TestTitanWordpress/assets/86843637/81834343-08c9-4200-bb01-6dae213f27af)

## Execution

### Local way

To execute the project in local way, you need to execcute the next line in the command line:
```bash
java -jar -Dspring.profiles.active=dev gradle/wrapper/market-1.0.jar
```

This will execute the jar file in **development environment**, for this it is neccesary to have PostgreSQL and have a database called **market**, after this please execute the querys which are present in the **.sql** files

### Current Domain

the current domain in **production** is [this](https://apimarket-production.up.railway.app), to access and review the documentation and build the requests bodies, you can to access to the [swagger documentation](https://apimarket-production.up.railway.app/market/api/swagger-ui/index.html)

![swagger1](https://github.com/RodrigoValda/TestTitanWordpress/assets/86843637/251fdbac-1cec-4f5e-a5e9-299e3fd9d95e)

## License

This project is free an can be used by anyone