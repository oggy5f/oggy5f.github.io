import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function init() {
  try {
    await sdk.actions.ready();

    const context = await sdk.context.get();
    const user = context?.user;

    if (user) {
      status.innerText = `👤 @${user.username}`;
    } else {
      status.innerText = "👤 User not found";
    }
  } catch (e) {
    console.error(e);
    status.innerText = "⚠️ Farcaster context error";
  }
}

btn.onclick = async () => {
  try {
    status.innerText += "\n⏳ Checking wallet...";

    const wallet = await sdk.wallet.get();

    if (!wallet) {
      status.innerText += "\n❌ Wallet not connected";
      return;
    }

    if (wallet.chainId !== 8453) {
      status.innerText += "\n⚠️ Switch to Base network";
      return;
    }

    status.innerText += "\n✅ Base wallet connected";
    status.innerText += "\n🎉 Ready for onchain check-in";
  } catch (e) {
    console.error(e);
    status.innerText += "\n❌ Wallet check failed (preview limit)";
  }
};

init();
