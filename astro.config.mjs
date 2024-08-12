import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        webAnalytics: { enabled: true }
    }),
    integrations: [react({
        experimentalReactChildren: true
    })],
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'viewport'
    },
});