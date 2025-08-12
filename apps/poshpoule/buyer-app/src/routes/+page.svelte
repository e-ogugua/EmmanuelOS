<script lang="ts">
  let products: any[] = [];
  onMount(async () => {
    const res = await fetch('/api/products');
    products = await res.json();
  });
</script>

<svelte:head><title>Buyer — PoshPOULE</title></svelte:head>
<section class="max-w-4xl mx-auto p-4">
  <h1 class="text-xl font-semibold">Shop Products</h1>
  <div class="grid md:grid-cols-3 gap-4 mt-4">
    {#each products as p}
      <div class="border rounded p-3">
        <div class="font-medium">{p.name}</div>
        <div class="text-emerald-700 font-semibold">₦{p.price_naira}</div>
        <form method="post" action="/api/orders" class="mt-2 space-y-2">
          <input type="hidden" name="product_id" value={p.id}>
          <input type="number" name="qty" min="1" class="border rounded px-2 py-1 w-full" placeholder="Quantity">
          <input type="date" name="delivery_date" class="border rounded px-2 py-1 w-full">
          <button class="px-3 py-1.5 bg-emerald-600 text-white rounded">Create Order</button>
        </form>
      </div>
    {/each}
  </div>
</section>
