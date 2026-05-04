/*
# Create Cadastros Table
Creates the table to store lead information from the landing page.

## Query Description: 
This operation creates a new table `cadastros` to store user registrations (name, email, whatsapp). It also sets up Row Level Security (RLS) policies to allow the frontend to insert new records and the admin panel to read and delete records using the anonymous key.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: `public.cadastros`
- Columns: `id` (uuid), `nome` (text), `email` (text), `whatsapp` (text), `criado_em` (timestamp)

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Added insert, select, and delete policies for anonymous users.
*/

CREATE TABLE IF NOT EXISTS public.cadastros (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null,
  whatsapp text not null,
  criado_em timestamp with time zone default now()
);

-- Enable Row Level Security
ALTER TABLE public.cadastros ENABLE ROW LEVEL SECURITY;

-- Create policies to allow the frontend to interact with the database
-- Note: Since the admin login is frontend-based, we allow anon to select and delete.
CREATE POLICY "Allow anon insert" ON public.cadastros FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon select" ON public.cadastros FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon delete" ON public.cadastros FOR DELETE TO anon USING (true);
