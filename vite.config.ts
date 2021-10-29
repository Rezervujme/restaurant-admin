/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import VitePluginWindicss from 'vite-plugin-windicss';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, '/src')}/`,
    },
  },
  server: {
    host: true,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver(),
        PrimeVueResolver(),
      ],
    }),
    Icons({ compiler: 'vue3' }),
    VitePluginWindicss(),
  ],
});
