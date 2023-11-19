import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epenscsapzwwljqhyhzc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZW5zY3NhcHp3d2xqcWh5aHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNDEyMjcsImV4cCI6MjAxNDgxNzIyN30.TSQjOJUu3oNjlNEYGTXOYauEH9YzGVfpUxqphFtelXs'

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;