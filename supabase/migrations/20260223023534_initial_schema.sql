create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

create table families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text check (role in ('admin', 'member')) default 'member'
);

create table todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  completed boolean default false,
  due_date timestamptz,
  calendar_event_id text,
  created_at timestamptz default now()
);

-- Row level security
alter table todos enable row level security;
create policy "Users can manage own todos"
  on todos for all
  using (auth.uid() = user_id);

create policy "Family members can view each other's todos"
  on todos for select
  using (
    user_id in (
      select fm2.user_id from family_members fm1
      join family_members fm2 on fm1.family_id = fm2.family_id
      where fm1.user_id = auth.uid()
    )
  );
