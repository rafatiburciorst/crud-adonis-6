import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: [
        'resources/css/app.css',
        'resources/css/style.css',
        'resources/js/app.js',
        'resources/js/main.js',
        'resources/ts/user/form_edit.ts',
        'resources/ts/user/change_password.ts',
      ],
      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
