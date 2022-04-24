# ez-poll

A polling application designed to be as easy to use as possible. Built using NextJS, TailwindCSS, PostgreSQL, and Docker. 

## To use

A live demo can be found at: https://polls.angoose.dev/. You can also run it locally. 

## Running Locally

### Requirements
- NodeJS & NPM
- Docker

### Steps 

1. Create a `.env.local` file with the following contents (can be changed to your liking):

```
POSTGRES_USER=ez_poll
POSTGRES_PASSWORD=super_secure_password
POSTGRES_DB=ez_poll
```

2. Run `docker-compose build` to build your Docker services. 
3. Run `docker-compose up` to create the container and start services.
4. All services should be running and you can access the app at http://localhost:3000/.
