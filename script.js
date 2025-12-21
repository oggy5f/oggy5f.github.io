// STEP 4 – Farcaster + Base wallet (FINAL SAFE VERSION)

import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function init() {
  try {
    // Tell Farcaster app we are ready
    await sdk.actions.ready();

    // Get Farcaster context
    const context = await sdk.context;

    const user = context?.user;
    const wallet = context?.wallets?.[0];

    if (user) {
      status.innerText = `👤 @${user.username}`;
    }

    if (wallet) {
      status.innerText += `\n💼 ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;
    }

    if (!user && !wallet) {
      status.innerText = "🟣 Running inside Farcaster Mini App";
    }

  } catch (err) {
    console.error(err);
    status.innerText = "❌ Failed to load Farcaster context";
  }
}

btn.addEventListener("click", async () => {
  try {
    status.innerText += `\n⏳ Checking wallet...`;

    const wallet = await sdk.wallet.get();

    if (!wallet) {
      status.innerText += `\n❌ Wallet not connected`;
      return;
    }

    if (wallet.chainId !== 8453) {
      status.innerText += `\n⚠️ Switch to Base network`;
      return;
    }

    status.innerText += `\n✅ Base wallet connected`;
    status.innerText += `\n🎯 Daily check-in success (demo)`;

  } catch (err) {
    console.error(err);
    status.innerText += `\n❌ Wallet check failed`;
  }
});

init();
