-- Hermetika: banco editorial, revisões, permissões e mídia do blog.

create extension if not exists pgcrypto;

do $$ begin
  create type public.blog_post_status as enum ('draft', 'scheduled', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.blog_admin_role as enum ('viewer', 'author', 'editor', 'admin');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.blog_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.blog_admin_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 180),
  excerpt text not null default '',
  content jsonb not null default '[]'::jsonb check (jsonb_typeof(content) = 'array'),
  status public.blog_post_status not null default 'draft',
  category text not null default 'Kabbalah',
  tags text[] not null default '{}',
  featured_letters text[] not null default '{}',
  cover_image_url text,
  cover_image_alt text,
  seo_title text,
  seo_description text,
  reading_time integer not null default 1 check (reading_time between 1 and 999),
  author_id uuid not null default auth.uid() references auth.users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_date_required check (status not in ('published', 'scheduled') or published_at is not null)
);

create index if not exists blog_posts_publication_idx
  on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_author_idx
  on public.blog_posts (author_id, updated_at desc);
create index if not exists blog_posts_tags_idx
  on public.blog_posts using gin (tags);

create table if not exists public.blog_post_revisions (
  id bigint generated always as identity primary key,
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  editor_id uuid references auth.users(id) on delete set null,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists blog_post_revisions_post_idx
  on public.blog_post_revisions (post_id, created_at desc);

create table if not exists public.blog_redirects (
  source_slug text primary key,
  destination_slug text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  check (source_slug <> destination_slug)
);

create or replace function public.blog_touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_profiles_touch_updated_at on public.blog_profiles;
create trigger blog_profiles_touch_updated_at
before update on public.blog_profiles
for each row execute function public.blog_touch_updated_at();

drop trigger if exists blog_posts_touch_updated_at on public.blog_posts;
create trigger blog_posts_touch_updated_at
before update on public.blog_posts
for each row execute function public.blog_touch_updated_at();

create or replace function public.blog_create_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.blog_profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists blog_create_profile_after_signup on auth.users;
create trigger blog_create_profile_after_signup
after insert on auth.users
for each row execute function public.blog_create_profile();

create or replace function public.blog_is_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.blog_profiles
    where id = auth.uid()
      and role in ('author', 'editor', 'admin')
  );
$$;

create or replace function public.blog_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.blog_profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.blog_is_editor() to anon, authenticated;
grant execute on function public.blog_is_admin() to authenticated;

create or replace function public.blog_save_revision()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old is distinct from new then
    insert into public.blog_post_revisions (post_id, editor_id, snapshot)
    values (old.id, auth.uid(), to_jsonb(old));
  end if;
  return new;
end;
$$;

drop trigger if exists blog_posts_save_revision on public.blog_posts;
create trigger blog_posts_save_revision
before update on public.blog_posts
for each row execute function public.blog_save_revision();

alter table public.blog_profiles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_revisions enable row level security;
alter table public.blog_redirects enable row level security;

drop policy if exists "Profiles: view own" on public.blog_profiles;
create policy "Profiles: view own"
on public.blog_profiles for select
to authenticated
using (id = auth.uid() or public.blog_is_admin());

drop policy if exists "Profiles: admin manages" on public.blog_profiles;
create policy "Profiles: admin manages"
on public.blog_profiles for all
to authenticated
using (public.blog_is_admin())
with check (public.blog_is_admin());

drop policy if exists "Posts: public reads published" on public.blog_posts;
create policy "Posts: public reads published"
on public.blog_posts for select
to anon, authenticated
using (status in ('published', 'scheduled') and published_at <= now());

drop policy if exists "Posts: editors read all" on public.blog_posts;
create policy "Posts: editors read all"
on public.blog_posts for select
to authenticated
using (public.blog_is_editor());

drop policy if exists "Posts: editors insert" on public.blog_posts;
create policy "Posts: editors insert"
on public.blog_posts for insert
to authenticated
with check (public.blog_is_editor() and author_id = auth.uid());

drop policy if exists "Posts: editors update" on public.blog_posts;
create policy "Posts: editors update"
on public.blog_posts for update
to authenticated
using (public.blog_is_editor())
with check (public.blog_is_editor());

drop policy if exists "Posts: admins delete" on public.blog_posts;
create policy "Posts: admins delete"
on public.blog_posts for delete
to authenticated
using (public.blog_is_admin());

drop policy if exists "Revisions: editors read" on public.blog_post_revisions;
create policy "Revisions: editors read"
on public.blog_post_revisions for select
to authenticated
using (public.blog_is_editor());

drop policy if exists "Redirects: public reads" on public.blog_redirects;
create policy "Redirects: public reads"
on public.blog_redirects for select
to anon, authenticated
using (true);

drop policy if exists "Redirects: editors manage" on public.blog_redirects;
create policy "Redirects: editors manage"
on public.blog_redirects for all
to authenticated
using (public.blog_is_editor())
with check (public.blog_is_editor());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-media',
  'blog-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Blog media: public reads" on storage.objects;
create policy "Blog media: public reads"
on storage.objects for select
to public
using (bucket_id = 'blog-media');

drop policy if exists "Blog media: editors upload" on storage.objects;
create policy "Blog media: editors upload"
on storage.objects for insert
to authenticated
with check (bucket_id = 'blog-media' and public.blog_is_editor());

drop policy if exists "Blog media: editors update" on storage.objects;
create policy "Blog media: editors update"
on storage.objects for update
to authenticated
using (bucket_id = 'blog-media' and public.blog_is_editor())
with check (bucket_id = 'blog-media' and public.blog_is_editor());

drop policy if exists "Blog media: editors delete" on storage.objects;
create policy "Blog media: editors delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog-media' and public.blog_is_editor());

-- Depois de criar seu usuário em Authentication > Users, execute uma vez:
-- update public.blog_profiles set role = 'admin' where id = 'UUID-DO-SEU-USUARIO';
