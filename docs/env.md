# Environment variables

List of environment variables used by the API and how to set them.

Required (examples):

- `DATABASE_URL` - Postgres connection string for Prisma (e.g. `postgresql://user:pass@host:5432/dbname`).
- `JWT_SECRET` - secret used to sign JWTs (keep private).
- `PORT` - port for the API (default: `3000`).

Optional / Framework / infra:

- `NODE_ENV` - `development`|`production`.

Examples:

Create a `.env` file at `apps/api/.env` with:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/parkit
JWT_SECRET=super-secret
PORT=3000
NODE_ENV=development
```

Security:

- Do not commit `.env` or any secrets. Add `.env` to `.gitignore` if applicable.
