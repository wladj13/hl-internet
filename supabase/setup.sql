-- Tabla de clientes
create table clientes (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  cedula text not null unique,
  telefono text not null,
  direccion text not null,
  plan text not null check (plan in ('Basico', 'Estandar', 'Premium')),
  monto numeric(10,2) not null,
  activo boolean default true,
  created_at timestamptz default now()
);

-- Tabla de pagos
create table pagos (
  id uuid default gen_random_uuid() primary key,
  cliente_id uuid references clientes(id) on delete cascade,
  monto numeric(10,2) not null,
  fecha_pago date not null,
  mes_correspondiente text not null, -- formato: YYYY-MM
  metodo text not null,
  notas text,
  created_at timestamptz default now()
);

-- RLS
alter table clientes enable row level security;
alter table pagos enable row level security;

-- Políticas: solo usuarios autenticados
create policy "auth_clientes" on clientes for all to authenticated using (true) with check (true);
create policy "auth_pagos" on pagos for all to authenticated using (true) with check (true);

-- Índices útiles
create index pagos_cliente_id_idx on pagos(cliente_id);
create index pagos_mes_idx on pagos(mes_correspondiente);
