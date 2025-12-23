// FINAL READY FIX – PREVIEW SAFE

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

  // 🔑 THIS IS THE KEY LINE
  await sdk.actions.ready();

  const context = await sdk.context.get();
  const username = context?.user?.username ?? "unknown";

  status.innerText = `🟣 Logged in as @${username}`;
}

btn.addEventListener("click", () => {
  status.innerText += "\n✅ Check-in clicked";
});

init();
