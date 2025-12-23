// STEP 6 – Stable Farcaster init + ready fix

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function waitForSDK() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.farcaster?.sdk) {
        resolve(window.farcaster.sdk);
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}

async function init() {
  status.innerText = "⏳ Initializing Farcaster…";

  const sdk = await waitForSDK();

  // VERY IMPORTANT
  await sdk.actions.ready();

  const context = await sdk.context.get();
  const username = context?.user?.username;

  status.innerText = `🟣 Logged in as @${username}`;
}

btn.addEventListener("click", async () => {
  try {
    status.innerText = "✍️ Requesting signature…";

    const sdk = window.farcaster.sdk;

    const message = `Badgehub daily check-in\nDate: ${new Date().toDateString()}`;

    const signature = await sdk.signer.signMessage({ message });

    status.innerText =
      "✅ Check-in successful\n" +
      "🔏 Signature received";

    console.log("Signature:", signature);

  } catch (err) {
    console.error(err);
    status.innerText =
      err?.message?.includes("preview")
        ? "⚠️ Preview mode – signature blocked"
        : "❌ User rejected signature";
  }
});

init();
