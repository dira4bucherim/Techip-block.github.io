import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ykkdjrptxixjyxwncpgb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra2RqcnB0eGl4anl4d25jcGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mzc1NTcsImV4cCI6MjA3ODIxMzU1N30.W-rrBBdDYat-VR4-4cq_kLMAMqnmPgg5cS1J7Eo640w'
)