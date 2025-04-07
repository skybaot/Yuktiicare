
import { createClient } from '@supabase/supabase-js';

// Use the provided credentials
const supabaseUrl = 'https://nbilmxvtsrtkffvaeysq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaWxteHZ0c3J0a2ZmdmFleXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzczNTAsImV4cCI6MjA1ODA1MzM1MH0._-twDE8x62Xqu5hpMw4bIDTz25KvfjxHIOKhmVart3I';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to check if the Supabase connection is working
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('jobs').select('count').limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
};

// Initialize connection check
checkSupabaseConnection().then(isConnected => {
  if (isConnected) {
    console.log('Successfully connected to Supabase');
  } else {
    console.error('Failed to connect to Supabase. Please check your credentials and network connection.');
  }
});
