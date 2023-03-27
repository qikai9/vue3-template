import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
//自动导入elementui
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import config from './config.js'

const CWD = process.cwd()

export default ({ mode }) => {
  const { VITE_ENV } = loadEnv(mode, CWD)
  console.log('VITE_ENV', VITE_ENV)
  const isProd = ['dev', 'test', 'production'].includes(VITE_ENV)

  return defineConfig({
    plugins: [
      vue(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
        // imports: ['vue']
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    },
    base: './', // 设置打包路径
    server: {
      host: '0.0.0.0', // 设置ip启动
      port: 4000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'http://xxx.xxx.xxx.xxx:8000',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace('/api/', '/')
      //   }
      // }
    },

    // 去除 console debugger
    esbuild: {
      pure: isProd ? ['console.log', 'debugger'] : []
    },

    // 生产环境打包配置
    build: {
      target: 'es2015', // 浏览器兼容性
      cssTarget: 'chrome79', // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
      chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）。
      outDir: config.outputDir || 'dist', // 指定输出路径
      assetsDir: config.assetsDir || 'static', // 指定生成静态资源的存放路径（相对于 build.outDir）。
      manifest: false // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";'
        }
      }
    }
  })
}
