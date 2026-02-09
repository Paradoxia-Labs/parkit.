# Parkit Admin Dashboard

Next.js 15 admin dashboard for Parkit parking management system.

## Features

- 🔐 JWT-based authentication
- 📊 Dashboard with analytics overview
- 👥 Companies management
- 👤 Users & staff management
- 🚗 Vehicles registry
- 🅿️ Parkings configuration
- 📅 Bookings management
- 🎫 Tickets audit and management
- 🔔 Notifications center
- 🛡️ Role-based access control (ADMIN, STAFF, CUSTOMER)

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
cd apps/web
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
```

Update `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

### Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or manually:

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── page.tsx         # Overview
│   │   ├── companies/       # Companies management
│   │   ├── users/           # Users management
│   │   ├── vehicles/        # Vehicles management
│   │   ├── parkings/        # Parkings management
│   │   ├── bookings/        # Bookings management
│   │   ├── tickets/         # Tickets management
│   │   └── notifications/   # Notifications center
│   ├── login/               # Authentication page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Redirects to dashboard
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── DashboardSidebar.tsx # Navigation sidebar
│   ├── ProtectedRoute.tsx   # Auth guard
│   └── ...                  # Other components
├── lib/                     # Utilities and helpers
│   ├── api.ts              # Axios client with interceptors
│   ├── auth.ts             # Auth helpers and types
│   ├── store.ts            # Zustand stores
│   └── ...                 # Other utilities
```

## Authentication Flow

1. User logs in at `/login`
2. Credentials sent to `/auth/login` endpoint
3. Backend returns user data + JWT token
4. Token stored in localStorage via `apiClient.setToken()`
5. User redirected to `/dashboard`
6. Protected routes check auth via `ProtectedRoute` component
7. API requests automatically include JWT in Authorization header

## Adding New Modules

To add a new dashboard module (e.g., Valets management):

1. Create folder: `src/app/dashboard/valets/`
2. Create page: `src/app/dashboard/valets/page.tsx`
3. Use the Companies page as template
4. Add route to `DashboardSidebar` navigation
5. Implement API calls using `apiClient`

Example:

```tsx
"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { apiClient } from "@/lib/api";

export default function ValetsPage() {
  const [valets, setValets] = useState([]);

  useEffect(() => {
    apiClient.get("/valets").then(setValets);
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex">
        <DashboardSidebar />
        {/* Your content */}
      </div>
    </ProtectedRoute>
  );
}
```

## API Integration

The `apiClient` (in `src/lib/api.ts`) handles:

- **Automatic JWT injection** in all requests
- **Automatic redirect to login** on 401 errors
- **Error handling** with proper status codes
- **Type-safe responses** with TypeScript

Usage:

```typescript
// GET
const users = await apiClient.get<User[]>("/users");

// POST
const user = await apiClient.post<User>("/users", { email: "..." });

// PATCH
const updated = await apiClient.patch<User>("/users/123", { name: "..." });

// DELETE
const deleted = await apiClient.delete<void>("/users/123");
```

## State Management

Use Zustand stores for global state:

```typescript
import { useAuthStore } from "@/lib/store";

const { user, logout, login } = useAuthStore();
```

## Styling

Utility classes available in `src/app/globals.css`:

- `.btn-primary` → Blue button
- `.btn-secondary` → Gray button
- `.btn-danger` → Red button
- `.card` → White card with shadow
- `.badge-success` → Green badge
- `.badge-warning` → Yellow badge
- `.badge-error` → Red badge
- `.badge-info` → Blue badge

## Testing & Linting

```bash
npm run lint
npm run lint:fix
npm run type-check
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api` | Backend API base URL |
| `NEXTAUTH_SECRET` | N/A | Secret for NextAuth.js (change in production) |
| `NEXTAUTH_URL` | `http://localhost:3000` | App URL for auth callbacks |

## License

MIT

## Support

For issues or questions, contact the development team.
