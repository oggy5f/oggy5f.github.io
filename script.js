// script.js – Farcaster Mini App SAFE VERSION

const statusEl = document.getElementById("status");
const testBtn = document.getElementById("testBtn");

function log(msg) {
  if (statusEl) {
    statusEl.textContent += msg + "\n";
  }
  console.log(msg);
}

// Detect Farcaster environment safely
function isFarcaster() {
  return typeof window.farcaster !== "undefined";
}

async function initFarcaster() {
  try {
    log("⏳ Initializing Farcaster context...");

    // REQUIRED: wait for SDK
    await window.farcaster.ready();

    const ctx = window.farcaster.getContext();
    log("✅ Farcaster context ready");
    log("FID: " + ctx.user?.fid);

    return ctx;
  } catch (err) {
    log("❌ Farcaster init failed");
    console.error(err);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  log("📄 App loaded");

  if (!isFarcaster()) {
    log("🌐 Running in normal browser (not Farcaster)");
    return;
  }

  log("🟣 Running inside Farcaster");
  const ctx = await initFarcaster();

  if (ctx && testBtn) {
    testBtn.onclick = () => {
      alert("✅ Farcaster Mini App working!\nFID: " + ctx.user.fid);
    };
  }
});
