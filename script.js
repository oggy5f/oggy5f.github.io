// STEP 6 – Real Farcaster signature check-in (Base)

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function init() {
  if (!window.farcaster?.sdk) {
    status.innerText = "❌ Farcaster SDK not found";
    return;
  }

  const sdk = window.farcaster.sdk;

  // very important
  await sdk.actions.ready();

  const context = await sdk.context.get();
  const username = context?.user?.username;

  status.innerText = `🟣 Logged in as @${username}`;
}

btn.addEventListener("click", async () => {
  try {
    status.innerText = "✍️ Requesting signature...";

    const sdk = window.farcaster.sdk;

    const message = `Badgehub daily check-in\nDate: ${new Date().toDateString()}`;

    const signature = await sdk.signer.signMessage({
      message
    });

    status.innerText =
      "✅ Check-in successful!\n" +
      "🔏 Signature received\n" +
      signature.slice(0, 16) + "...";

    console.log("Signature:", signature);

  } catch (err) {
    console.error(err);

    status.innerText =
      err?.message?.includes("preview")
        ? "⚠️ Preview mode – signature blocked"
        : "❌ Signature rejected by user";
  }
});

init();
