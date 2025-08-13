import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Use edge functions if needed (disabled for now)
      edge: false,
      // Split mode for better performance
      split: false
    })
  }
};

export default config;
