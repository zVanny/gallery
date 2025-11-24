import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://obafpxigamjapiydfbvd.supabase.co";
const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYWZweGlnYW1qYXBpeWRmYnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTk4MjEsImV4cCI6MjA3ODM3NTgyMX0.HD8PPf3OASXL2MmAuZN8q9KP-EndLPeNS7T7JKpk4ow";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})