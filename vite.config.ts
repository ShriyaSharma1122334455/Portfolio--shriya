import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Vite only exposes env vars matching these prefixes to client code — the
    // default is VITE_ alone, so an unprefixed name silently reads as
    // `undefined` in the browser. WEB3FORMS_ is listed explicitly so the
    // contact form's access key can keep one name across .env, the source and
    // the Vercel dashboard. Deliberately a short allowlist rather than "": the
    // point of the prefix is to stop server secrets reaching the bundle.
    envPrefix: ["VITE_", "WEB3FORMS_"],
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
