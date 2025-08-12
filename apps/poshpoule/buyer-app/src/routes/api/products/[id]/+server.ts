import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const GET: RequestHandler = async ({ params }) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', params.id).single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 404 });
  return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
};
