// STEP 3 – Base wallet + Farcaster context (SAFE MODE)

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function init() {
  // Check Farcaster SDK
  if (!window.farcaster?.sdk) {
    status.innerText = "❌ Farcaster SDK not found";
    return;
  }

  const sdk = window.farcaster.sdk;

  // Tell Farcaster app is ready
  await sdk.actions.ready();

  // Get user context
  const context = await sdk.context.get();
  const username = context?.user?.username;

  status.innerText = `🟣 Logged in as @${username}`;
}

btn.addEventListener("click", async () => {
  try {
    status.innerText = "🔍 Checking wallet & network...";

    const sdk = window.farcaster.sdk;

    // Request wallet
    const wallet = await sdk.wallet.get();

    if (!wallet) {
      status.innerText = "❌ Wallet not connected";
      return;
    }

    // Check chain
    const chainId = wallet.chainId;

    if (chainId !== 8453) {
      status.innerText = "⚠️ Please switch to Base network";
      return;
    }

    status.innerText = "✅ Base wallet connected. Check-in ready!";
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Wallet check failed";
  }
});

init();
