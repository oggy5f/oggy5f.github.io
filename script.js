// STEP 4 — Farcaster + Base Wallet (FINAL SAFE VERSION)

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

let sdk;

// Init when page loads
async function init() {
  // 1️⃣ Check Farcaster SDK
  if (!window.farcaster?.sdk) {
    status.innerText = "❌ Not opened inside Farcaster";
    return;
  }

  sdk = window.farcaster.sdk;

  // 2️⃣ Tell Farcaster app we're ready (VERY IMPORTANT)
  await sdk.actions.ready();

  // 3️⃣ Get Farcaster context
  try {
    const context = await sdk.context.get();
    const user = context?.user;

    if (user?.username) {
      status.innerText = `🟣 Logged in as @${user.username}`;
    } else {
      status.innerText = "🟣 Farcaster user detected";
    }
  } catch (err) {
    console.error(err);
    status.innerText = "⚠️ Could not read Farcaster context";
  }
}

// Button click = wallet check
btn.addEventListener("click", async () => {
  try {
    status.innerText = "🔍 Checking Base wallet...";

    // 4️⃣ Request wallet from Farcaster
    const wallet = await sdk.wallet.get();

    if (!wallet) {
      status.innerText = "❌ Wallet not connected";
      return;
    }

    // 5️⃣ Check Base network (chainId = 8453)
    if (wallet.chainId !== 8453) {
      status.innerText = "⚠️ Please switch to Base network";
      return;
    }

    // 6️⃣ SUCCESS
    status.innerText =
      `✅ Base wallet connected\n` +
      `💼 ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}\n` +
      `🎯 Check-in ready`;

  } catch (err) {
    console.error(err);
    status.innerText = "❌ Wallet check failed";
  }
});

// Start app
init();
