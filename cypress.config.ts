import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "baseUrl": "http://localhost:4000",
    "chromeWebSecurity": false,
    "viewportWidth": 1680,
    "viewportHeight": 1024
  },
});
