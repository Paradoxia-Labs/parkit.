# Architecture

This folder contains architecture notes and the canonical SQL schema at `docs/architecture/parkit.sql`.

Overview:

- Backend: Express + TypeScript + Prisma (Postgres)
- Modules: audit, auth, bookings, clients, companies, notifications, parkings, tickets, users, valets, vehicles
- Multi-tenant: `companyId` is used to scope most resources.

Migrations:

- Prisma schema and migrations are in `apps/api/prisma/`.
- To apply migrations locally: `npm --prefix apps/api run prisma migrate dev`.
