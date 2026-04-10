# Food Bank

A web application for managing meal delivery campaigns, featuring authentication management for administrators,
user management (recipients), and the sending of confirmation emails and calls.

---

## Run Locally

Clone the project

```bash
  git clone https://github.com/luminoso1/food-bank
```

Go to the project directory

```bash
  cd food-bank
```

Install dependencies

```bash
  pnpm install
```

Create the Database tables

```bash
  pnpm db:migrate
```

Set the postgres container up

```bash
  docker-compose up -d
```

Start the server

```bash
  pnpm dev
```

## Tech Stack

- [Tanstack Start](https://tanstack.com/start/latest)
- [Tanstack Query](https://tanstack.com/query/latest)
- [React](https://react.dev)
- [Tailwindcss](https://tailwindcss.com/)
- [Drizzle](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Better Auth](https://better-auth.com/)

## Authors

- [@Luminoso1](https://www.github.com/Luminoso1)
