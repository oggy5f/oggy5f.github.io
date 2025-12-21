// STEP 3 – Farcaster context (SAFE + WORKING)

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function init() {
  if (!window.farcaster?.sdk) {
    status.innerText = "❌ Farcaster SDK not found";
    return;
  }

  const sdk = window.farcaster.sdk;

  // Tell Farcaster app we're ready
  await sdk.actions.ready();

  try {
    const context = await sdk.context.get();
    const username = context?.user?.username;

    if (username) {
      status.innerText = `🟣 Logged in as @${username}`;
    } else {
      status.innerText = "⚠️ User context not found";
    }
  } catch (e) {
    console.error(e);
    status.innerText = "❌ Failed to read Farcaster context";
  }
}

btn.addEventListener("click", () => {
  status.innerText += "\n✅ Check-in clicked (STEP 3 complete)";
});

init();
