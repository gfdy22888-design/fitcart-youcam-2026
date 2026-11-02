import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  root:"github-pages",
  base:"/fitcart-youcam-2026/",
  publicDir:"../public",
  plugins:[react()],
  define:{"import.meta.env.VITE_API_BASE":JSON.stringify("https://fitcart-youcam-2026.shi18395586367.chatgpt.site")},
  build:{outDir:"../docs",emptyOutDir:true},
});
