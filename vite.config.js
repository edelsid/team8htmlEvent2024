import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    }
  }
});
