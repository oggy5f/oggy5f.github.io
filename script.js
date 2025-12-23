const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

async function safeReady() {
  try {
    if (window.farcaster?.sdk?.actions?.ready) {
      await window.farcaster.sdk.actions.ready();
      return true;
    }
  } catch (e) {}
  return false;
}

async function init() {
  status.innerText = "⏳ Loading…";

  // try multiple times
  for (let i = 0; i < 10; i++) {
    const ok = await safeReady();
    if (ok) break;
    await new Promise(r => setTimeout(r, 200));
  }

  if (!window.farcaster?.sdk) {
    status.innerText =
      "⚠️ Preview SDK not injected\n(works in real Farcaster)";
    return;
  }

  const ctx = await window.farcaster.sdk.context.get();
  status.innerText = `🟣 Logged in as @${ctx?.user?.username}`;
}

btn.onclick = () => {
  status.innerText += "\n✅ Check-in clicked";
};

init();
