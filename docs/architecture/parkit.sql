-- 1. Extensiones necesarias (para generar UUIDs automáticamente)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Creación de tipos ENUM (Valores predefinidos)
CREATE TYPE system_role_enum AS ENUM ('ADMIN', 'STAFF', 'CUSTOMER');
CREATE TYPE company_status_enum AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE');
CREATE TYPE valet_status_enum AS ENUM ('AVAILABLE', 'BUSY', 'AWAY');
CREATE TYPE parking_type_enum AS ENUM ('OPEN','COVERED','TOWER','UNDERGROUND','ELEVATOR');
CREATE TYPE booking_status_enum AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CANCELLED', 'NO_SHOW');
CREATE TYPE ticket_status_enum AS ENUM ('PARKED', 'REQUESTED', 'DELIVERED', 'CANCELLED');
CREATE TYPE slot_type_enum AS ENUM ('REGULAR', 'PREMIUM', 'ELECTRIC', 'HANDICAPPED');
CREATE TYPE assignment_role_enum AS ENUM ('RECEPTOR', 'DRIVER', 'DELIVERER');
CREATE TYPE notification_type_enum AS ENUM ('PUSH', 'SMS', 'EMAIL');
CREATE TYPE notification_status_enum AS ENUM ('SENT', 'DELIVERED', 'READ', 'FAILED');

-- 3. Tablas de Identidad y Empresa
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    timezone VARCHAR(50) DEFAULT 'UTC',
    phone VARCHAR(20),
    phone_verified BOOLEAN DEFAULT FALSE,
    system_role system_role_enum DEFAULT 'CUSTOMER',
    push_token TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    app_preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    legal_name VARCHAR(255) NOT NULL,
    commercial_name VARCHAR(255),
    tax_id VARCHAR(50) UNIQUE NOT NULL,
    country_code CHAR(2) NOT NULL DEFAULT 'CR',
    currency CHAR(3) DEFAULT 'CRC',
    timezone VARCHAR(50) DEFAULT 'UTC',
    billing_email VARCHAR(255),
    contact_phone VARCHAR(20),
    legal_address TEXT,
    branding_config JSONB,
    status company_status_enum DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Infraestructura de Parqueo
CREATE TABLE parkings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    geofence_radius DOUBLE PRECISION DEFAULT 50.0, -- en metros
    type parking_type_enum DEFAULT 'OPEN',
    total_slots INTEGER NOT NULL,
    requires_booking BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE parking_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parking_id UUID REFERENCES parkings(id) ON DELETE CASCADE,
    label VARCHAR(20) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    slot_type slot_type_enum DEFAULT 'REGULAR',
    UNIQUE(parking_id, label)
);

-- 5. Perfiles Especializados (Valet y Cliente)
CREATE TABLE valets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    current_parking_id UUID REFERENCES parkings(id) ON DELETE SET NULL, -- Para rotación GPS
    license_number VARCHAR(50) NOT NULL,
    license_expiry DATE NOT NULL,
    current_status valet_status_enum DEFAULT 'AVAILABLE',
    rating_avg FLOAT DEFAULT 5.0
);

CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    government_id VARCHAR(50) UNIQUE NOT NULL,
    emergency_phone JSONB -- {name, phone, relationship}
);

-- 6. Vehículos
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    country_code CHAR(2) NOT NULL DEFAULT 'CR',
    plate VARCHAR(20) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER,
    dimensions_api_data JSONB,
    UNIQUE (plate, country_code)
);

CREATE TABLE client_vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE
);

-- 7. Operaciones (Reservas y Tickets)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) NOT NULL,
    vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
    parking_id UUID REFERENCES parkings(id) NOT NULL,
    scheduled_entry_time TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_exit_time TIMESTAMP WITH TIME ZONE,
    booking_status booking_status_enum DEFAULT 'PENDING',
    qr_code_reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE SET NULL,
    parking_id UUID REFERENCES parkings(id) NOT NULL,
    vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
    client_id UUID REFERENCES clients(id) NOT NULL,
    slot_id UUID REFERENCES parking_slots(id) ON DELETE SET NULL,
    status ticket_status_enum DEFAULT 'PARKED',
    entry_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    exit_time TIMESTAMP WITH TIME ZONE
);

-- 8. Trazabilidad y Gestión de Daños
CREATE TABLE ticket_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    valet_id UUID REFERENCES valets(id) ON DELETE CASCADE,
    role_in_ticket assignment_role_enum NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE damage_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    valet_id UUID REFERENCES valets(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE damage_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    damage_report_id UUID REFERENCES damage_reports(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    label VARCHAR(100),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ticket_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID UNIQUE REFERENCES tickets(id) ON DELETE CASCADE,
    stars INTEGER CHECK (stars >= 1 AND stars <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Auditoría y Notificaciones
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE notification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    notification_type notification_type_enum NOT NULL,
    status notification_status_enum DEFAULT 'SENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Índices para optimizar búsquedas frecuentes
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_bookings_scheduled_time ON bookings(scheduled_entry_time);
CREATE INDEX idx_valets_current_parking ON valets(current_parking_id);