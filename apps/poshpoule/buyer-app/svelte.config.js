import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      edge: true, // Enable edge functions
      split: false // Handle all routes with a single function
    }),
    // Explicitly set the build directory
    outDir: '.svelte-kit',
    // Ensure Vite outputs to the expected directory
    vite: {
      build: {
        outDir: '.netlify'
      }
    }
  }
};

export default config;
