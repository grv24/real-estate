import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   },
//   plugins: [react()]
// });
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Use 'http://localhost:3000' instead of '::1:3000'
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()]
});

