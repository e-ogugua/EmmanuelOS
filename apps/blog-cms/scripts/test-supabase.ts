import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

console.log('Supabase URL length:', supabaseUrl.length)
console.log('Service Role Key length:', supabaseServiceRoleKey.length)

if (!supabaseUrl || supabaseUrl.length < 10) {
  console.error('Supabase URL is missing or invalid')
  process.exit(1)
}

if (!supabaseServiceRoleKey || supabaseServiceRoleKey.length < 10) {
  console.error('Supabase Service Role Key is missing or invalid')
  process.exit(1)
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test a simple query
    const { data, error } = await supabase
      .from('authors')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('Supabase error:', error.message)
      console.error('Error details:', error)
      return
    }
    
    console.log('Connection successful!')
    console.log('Test query result:', data)
  } catch (err) {
    console.error('Connection failed:', err)
  }
}

testConnection()
