## Background
An example application uses Nextjs, a server-side rendering front-end framework which reads from `news.json` and images under `images` storing it to a relational database.

## Setup
Create a `postgres_user.txt`, `postgres_password.txt`, `postgres_url.txt` for docker secrets.

## Run with Docker
```bash
docker compose up
npx prisma migrate dev
npx prisma db seed
```
Run prisma database studio 
```bash
npx prisma studio
```
Access docker containers
```bash
docker ps
docker exec -it {test-postgres}
psql -U postgres
```

## Tech Stack
[Next.js](https://nextjs.org/docs)\
[TypeScript](https://www.typescriptlang.org/)
[Prisma.io](https://www.prisma.io/)\
[PostgreSQL](https://www.postgresql.org/)\
[TailwindCSS](https://tailwindcss.com/)


