# **Lenstagram**

Steps to run this project:

You'll need docker and docker-compose to run this app

1. Run `yarn` command
2. Setup database settings inside `ormconfig.json` file
3. Setup environment variables inside `.env` file.
4. Run `docker-compose up` command to set up docker containers for this application.
    - Use the flag `-d` to run it in background: `docker-compose up -d`.
    - Maybe you'll need to use the prefix `sudo` to run it.
5. Use `yarn typeorm migration:run` to run the migration.
