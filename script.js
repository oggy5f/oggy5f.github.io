import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

async function init() {
  try {
    // Tell Farcaster app that UI is ready
    await sdk.actions.ready();
    console.log("Farcaster Mini App ready");
  } catch (err) {
    console.error("SDK ready failed", err);
  }
}

init();

