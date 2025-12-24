const statusEl = document.getElementById("status");
const btn = document.getElementById("testBtn");

function log(msg) {
  console.log(msg);
  if (statusEl) statusEl.textContent += msg + "\n";
}

document.addEventListener("DOMContentLoaded", async () => {
  log("📄 App loaded");

  if (!window.farcaster) {
    log("🌐 Normal browser (not Farcaster)");
    return;
  }

  log("🟣 Inside Farcaster");

  try {
    await window.farcaster.ready();
    const ctx = window.farcaster.getContext();
    log("✅ Context ready");
    log("FID: " + ctx.user.fid);

    btn.onclick = () => {
      alert("✅ Mini App working!\nFID: " + ctx.user.fid);
    };
  } catch (e) {
    log("❌ Farcaster init failed");
    console.error(e);
  }
});
