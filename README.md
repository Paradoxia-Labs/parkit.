# parkit.

parkit. is a **B2B2C parking and valet management platform** designed for companies
that operate parking facilities, valet services, or hybrid parking models.

The platform connects **companies**, **customers**, and **valet staff**
through a unified ecosystem composed of a backend API, a web-based
administration dashboard, and mobile applications.

Its primary goal is to **modernize parking operations**, **reduce operational friction**,
improve the **end-customer experience**, and give companies **full control**
over their parking infrastructure, branding, and users.

---

## Key Concepts

### Companies
Organizations that operate or manage parking facilities and valet services.

Each company acts as an isolated tenant and can define:
- One or more parking locations
- Parking types (open, covered, tower, underground, elevator, etc.)
- Capacity, slot types, and operational rules
- Booking requirements (booking vs. walk-in)
- Company branding (logo, colors, themes)
- Language preferences and UI themes
- Customers and valet staff associated with the company

---

### Customers
End users who receive parking services or benefits through a company.

Customers can:
- Register and manage one or multiple vehicles
- Store vehicle characteristics and dimensions
- Make bookings when required by a parking facility
- Receive tickets and notifications
- Interact with the system mainly through the mobile app

Customers do not manage infrastructure, only their personal usage.

---

### Valets
Operational staff responsible for handling vehicles and executing parking operations.

Valets:
- Are linked to a company
- Can be assigned to parkings dynamically
- Participate in ticket workflows (receive, park, deliver)
- Can report damages and operational events
- Operate mainly through a mobile-focused experience

---

## Core Features

- Multi-company (multi-tenant) architecture
- Company and parking management
- Support for multiple parking types and rules
- Slot-based and capacity-based parking models
- Vehicle registration with external dimension APIs
  - Required for automated and tower parkings
- Optional booking system
  - Booking-based or no-booking parkings
- Ticket lifecycle management
- Valet assignment and traceability
- Damage reporting with photo evidence
- Audit logs for critical operations
- Notification system
  - Push
  - SMS
  - Email
- Multi-language support
- Light / Dark mode
- Company-specific branding and theming

---

## Applications

parkit. is structured as a **multi-application platform**:

### Backend API
The core of the system:
- Business logic
- Database access
- Authentication and authorization
- Validation and domain rules
- Integrations with external services

---

### Web App
Company-facing administration dashboard.

Used to:
- Manage parkings and parking slots
- Manage customers and valet staff
- Configure branding and company preferences
- Define operational rules
- Monitor activity and performance

---

### Mobile App
Mobile-first experience optimized for operational usage.

Includes:
- Customer-focused flows
  - Vehicle management
  - Bookings
  - Tickets
- Valet-focused flows
  - Active tickets
  - Assignments
  - Damage reporting
  - Status changes

---

## Architecture

This repository follows a **monorepo architecture** to keep all applications
and shared logic aligned.



parkit/
├── apps/
│   ├── api/        # Backend API
│   ├── web/        # Web administration dashboard
│   └── mobile/     # Mobile application
├── packages/
│   └── shared/     # Shared types, utilities, and contracts
├── docs/
│   └── architecture/ # Architecture and technical documentation
└── README.md

---

## Technology Stack

### Backend
- **Node.js** – Runtime environment
- **TypeScript** – Strongly typed backend development
- **Express** – HTTP server and API foundation
- **Prisma ORM** – Type-safe database access and migrations
- **PostgreSQL** – Relational database
- **Neon** – Serverless PostgreSQL hosting

### Database
- **PostgreSQL (Neon)**
  - UUID-based primary keys
  - Strong relational model
  - Enum-based domain constraints
  - Designed for multi-tenant company usage

### Web 
- **Next.js** – React-based web application
- **TypeScript**
- **Modern UI system** (TBD)
- Company administration dashboard

### Mobile 
- **React Native**
- **TypeScript**
- Separate UX flows for:
  - Customers
  - Valet staff

### Tooling & Architecture
- **Monorepo structure**
- **Shared packages** for types and utilities
- **Environment-based configuration**
- **GitHub** for version control

---

## Project Status

🚧 **Early development**

The project is currently focused on:
- Database design
- Backend foundations
- Core system architecture
- Developer experience and scalability

Features and applications will be incrementally built following
a backend-first approach.

---

## Author

Luis Herrera Quesada

