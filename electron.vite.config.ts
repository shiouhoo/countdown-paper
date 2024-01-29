import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';import UnoCSS from 'unocss/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [
            vue(),
            UnoCSS(),
            AutoImport({
                imports: ['vue'],
                resolvers: [ElementPlusResolver()],
                dts: 'src/auto-import.d.ts',
            }),
            Components({
                dirs: ['src/components'],
                resolvers: [ElementPlusResolver()],
                dts: 'src/components.d.ts',
            })
        ]
    }
});
