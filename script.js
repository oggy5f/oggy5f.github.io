const statusEl = document.getElementById("status");
const btn = document.getElementById("testBtn");

function log(msg) {
  console.log(msg);
  if (statusEl) statusEl.textContent += msg + "\n";
}

document.addEventListener("DOMContentLoaded", async () => {
  log("📄 App loaded");

  // Farcaster SDK must exist
  if (!window.farcaster || !window.farcaster.actions) {
    log("❌ Farcaster SDK not available");
    return;
  }

  try {
    // ✅ THIS IS THE MOST IMPORTANT LINE
    await window.farcaster.actions.ready();

    log("✅ sdk.actions.ready() called");

    const ctx = window.farcaster.getContext();
    log("FID: " + ctx.user.fid);

    btn.onclick = () => {
      alert(`Mini App working\nFID: ${ctx.user.fid}`);
    };
  } catch (e) {
    log("❌ Ready failed");
    console.error(e);
  }
});
