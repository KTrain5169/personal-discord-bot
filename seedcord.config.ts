import { defineConfig } from 'seedcord';
import collections from '@content-collections/vite'

export default defineConfig({
    root: './src',
    instance: './bot.ts',
    // set false to hold the running arc and live dot still, which cuts idle redraws by ~80%
    idleAnimation: true,
    build: {
        tsconfig: './tsconfig.build.json',
        start: './index.ts'
    },
    hmr: {
        // set true to run tsc --watch alongside the bot, at the cost of a second node process
        typecheck: false
    },
    vitePlugins: () => [collections({ environment: 'seedcord' })]
});
