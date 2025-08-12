import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const GET: RequestHandler = async ({ params }) => {
  const { data: order, error } = await supabase.from('orders').select('*, order_items(*)').eq('id', params.id).single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 404 });
  return new Response(JSON.stringify(order), { headers: { 'content-type': 'application/json' } });
};

export const PATCH: RequestHandler = async ({ params, request }) => {
  const body = await request.json();
  const { status } = body;
  const { error } = await supabase.from('orders').update({ status }).eq('id', params.id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ ok: true }));
};
