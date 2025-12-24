const statusEl = document.getElementById("status");
const btn = document.getElementById("testBtn");

function log(msg) {
  console.log(msg);
  if (statusEl) {
    statusEl.textContent += msg + "\n";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  log("📄 App loaded");

  // ⚠️ DO NOT early return in Mini Apps
  if (!window.farcaster) {
    log("🌐 Normal browser (not Farcaster)");
    btn.onclick = () => {
      alert("Running in normal browser");
    };
    return;
  }

  log("🟣 Farcaster SDK detected");

  // Wait safely for Farcaster context
  window.farcaster.ready()
    .then(() => {
      const ctx = window.farcaster.getContext();
      log("✅ Farcaster context ready");
      log("FID: " + ctx.user.fid);

      btn.onclick = () => {
        alert(`✅ Mini App working\nFID: ${ctx.user.fid}`);
      };
    })
    .catch((err) => {
      log("❌ Farcaster ready failed");
      console.error(err);
    });
});
