import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/resolver';
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // Icons({
    //   autoInstall: true,
    //   resolvers: [IconsResolver()],
    // }),
    lazyImport({
      resolvers: [
        VxeResolver({
          libraryName: 'vxe-table'
        }),
        VxeResolver({
          libraryName: 'vxe-pc-ui'
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 这里可以添加一些全局的 SCSS 变量等
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
