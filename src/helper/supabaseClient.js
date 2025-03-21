import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://erkysgjxkdtdkjitbfvx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVya3lzZ2p4a2R0ZGtqaXRiZnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDE3NzEsImV4cCI6MjA1NzI3Nzc3MX0.T8n-cZEjLTZssPjcoRpkw0ugoSFToZo3ldsWAb1PsJU';
export const supabase = createClient(supabaseUrl, supabaseKey);
