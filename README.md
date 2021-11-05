# Very Short

URL shortener built with Remix.

https://vry.sh

# Get Started

The development environment uses Docker to simplify the process. Installing Docker is out of the scope of this guide, but you can find instructions for installing Docker on your operating system [here](https://docs.docker.com/docker-for-mac/install/).

## Create .env file

The only manual part of the deployment process is creating a .env file. You can use the provided sample (env.sample) file as a starting point.

`cp env.sample .env`

It is then recommended to edit the .env file to your liking.

## Launch containers

`docker-compose up -d`

If you need to force a rebuild of the containers, you can use.

`docker-compose up --build -d`

Congratulations! You have successfully started the development environment. The application is now available at http://localhost:3000 and pgAdmin is available at http://localhost:3001.

# Database

The database we use is PostgreSQL and is hosted on a separate container (postgres_container). There is also a container for pgAdmin (pgadmin_container).

You can use pgAdmin using the port of the container (e.g. http://localhost:3001).

On first use you will need to add the database server to pgAdmin. It is recommended to use the container's name as the host name.

## Migrations

Migrations are handled using Prisma. The migrations are stored in the `prisma/migrations` directory.

## Add migration

To add a migration it is first required that you make the necessary changes to the schema, this can be done by editing the `prisma/schema.prisma` file. Once you have made the required changes, you can run the following command:

`npx prisma migrate dev --name [MIGRATION_NAME]`

e.g. `npx prisma migrate dev --name add_user_table`

# Debugging

TODO: Finsih this section.
