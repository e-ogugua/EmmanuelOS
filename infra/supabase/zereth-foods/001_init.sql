-- Zereth Foods schema
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text unique not null,
  email text,
  address jsonb,
  preferences jsonb,
  created_at timestamptz default now()
);

create table if not exists cakes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text,
  base_price numeric not null,
  description text,
  image_url text,
  gallery jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_cakes_category on cakes(category);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  total_price numeric not null,
  delivery_datetime timestamptz,
  status text default 'New',
  notes text,
  channel text default 'web',
  created_at timestamptz default now()
);
create index if not exists idx_orders_status on orders(status);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  cake_id uuid references cakes(id),
  custom_size text,
  flavor text,
  icing_style text,
  custom_text text,
  price numeric not null
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  customer_id uuid references customers(id),
  rating int check (rating between 1 and 5),
  text text,
  image_url text,
  approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  role text,
  supabase_auth_uid uuid,
  created_at timestamptz default now()
);
