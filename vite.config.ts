import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  console.log({ mode, command });

  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 4000,
      https: true,
      // strictPort: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 4000,
      // https: true,
      // https: {
      //   key: fs.readFileSync('RootCA-key.pem'),
      //   cert: fs.readFileSync('RootCA.pem'),
      //   ca: fs.readFileSync('../.local/share/mkcert/rootCA.pem'),
      // },
      // strictPort: true,
    },
    resolve: {
      alias: {
        '@': path.resolve('.'),
        '@public': fileURLToPath(new URL('./public', import.meta.url)),
        // '@public': path.resolve(path.resolve('.'), 'public'),
        '@src': path.resolve(path.resolve('.'), 'src'),
        '@api': path.resolve(path.resolve('.'), 'src/api'),
        '@asset': path.resolve(path.resolve('.'), 'src/asset'),
        '@component': path.resolve(path.resolve('.'), 'src/component'),
        '@hook': path.resolve(path.resolve('.'), 'src/hook'),
        '@page': path.resolve(path.resolve('.'), 'src/page'),
        '@util': path.resolve(path.resolve('.'), 'src/util'),
      },
    },
    esbuild: {
      jsxFactory: 'jsx',
      jsxFragment: 'Fragment',
      jsxInject: `import { jsx } from '@emotion/react';`,
      define: {
        this: 'window',
      },
    },
    build: {
      // minify: true,
      minify: 'terser',
      reportCompressedSize: false,
      outDir: 'docs',
      sourcemap: false,
      emptyOutDir: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        keep_classnames: true,
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'assets/img/[name]-[hash][extname]';
            }

            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
            }

            // default value
            // ref: https://rollupjs.org/guide/en/#outputassetfilenames
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    worker: {
      format: 'es',
    },
    // base: './',// build된 html파일의 시작되는 base경로. 기본값은 '/'이다. electron에서 이슈가 되어 필요하다.
  };
});
