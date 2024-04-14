import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  expect: {
    timeout: 10 * 1000,
  },
  globalTimeout: 60 * 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "https://shop.mercedes-benz.com",

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "MicrosoftEdge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "GoogleChrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
