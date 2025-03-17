/*
  # Create todos table and security policies

  1. New Tables
    - `todos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text, nullable)
      - `due_date` (timestamptz, nullable)
      - `priority` (text)
      - `category` (text)
      - `completed` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on todos table
    - Add policies for CRUD operations
      - Users can only access their own todos
      - Insert requires authentication
      - Update/delete limited to todo owner
*/

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  due_date timestamptz,
  priority text NOT NULL DEFAULT 'medium',
  category text NOT NULL DEFAULT 'personal',
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own todos"
  ON todos
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own todos"
  ON todos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos"
  ON todos
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos"
  ON todos
  FOR DELETE
  USING (auth.uid() = user_id);