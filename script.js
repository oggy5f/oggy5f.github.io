// STEP 6 – Stable Farcaster init (preview-safe)

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

  // MUST be called once
  await sdk.actions.ready();

  const context = await sdk.context.get();
  const username = context?.user?.username;

  status.innerText = `🟣 Logged in as @${username}`;
}

btn.addEventListener("click", async () => {
  status.innerText = "✅ Check-in clicked";

  // Preview tool limit message
  status.innerText += "\n⚠️ Wallet / signature disabled in preview";
});

init();
