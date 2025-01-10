import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure the root points to the correct directory
  server: {
    port: 5173, // Ensure this matches the port you see in the terminal
  },
});