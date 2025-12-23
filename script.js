import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function init() {
  try {
    // Tell Farcaster app we are ready
    await sdk.actions.ready();

    const context = await sdk.context.get();
    const user = context?.user;

    if (user) {
      status.innerText = `👤 @${user.username}`;
    } else {
      status.innerText = "⚠️ User not detected";
    }
  } catch (e) {
    status.innerText = "⚠️ SDK init failed";
  }
}

btn.addEventListener("click", async () => {
  status.innerText += "\n⏳ Checking wallet...";

  try {
    const wallet = await sdk.wallet.get();

    if (!wallet) {
      status.innerText += "\n❌ Wallet not connected";
      return;
    }

    if (wallet.chainId !== 8453) {
      status.innerText += "\n⚠️ Please switch to Base network";
      return;
    }

    status.innerText += "\n✅ Base wallet connected";
    status.innerText += `\n💼 ${wallet.address.slice(0,6)}...${wallet.address.slice(-4)}`;

  } catch (err) {
    status.innerText += "\n❌ Wallet check failed (preview limit)";
  }
});

init();
