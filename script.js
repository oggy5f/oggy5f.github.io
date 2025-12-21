// STEP 3 – Farcaster Mini App (ESM SAFE MODE)

import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function init() {
  try {
    // VERY IMPORTANT
    await sdk.actions.ready();

    const context = await sdk.context.get();
    const username = context?.user?.username;

    if (username) {
      status.innerText = `🟣 Logged in as @${username}`;
    } else {
      status.innerText = "🟡 User context not available";
    }
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Farcaster init failed";
  }
}

btn.addEventListener("click", () => {
  status.innerText += "\n✅ Check-in clicked";
});

init();
