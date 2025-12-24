import { sdk } from "https://unpkg.com/@farcaster/frame-sdk/dist/index.js";

window.addEventListener("load", async () => {
  try {
    await sdk.actions.ready();
    console.log("✅ Farcaster Mini App READY called");
  } catch (err) {
    console.error("❌ Farcaster READY failed", err);
  }
});
