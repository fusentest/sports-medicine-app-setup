
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bnunqxzeiudgguuchxqq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJudW5xeHplaXVkZ2d1dWNoeHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMzczNTQsImV4cCI6MjA3NjgxMzM1NH0.cvOvY1pWMMJ77402GfpIkQnDKiLIGtWTc64fJAkw7-w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);