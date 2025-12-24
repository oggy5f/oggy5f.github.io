console.log("script.js loaded");

// Check if Farcaster SDK is available
if (!window.farcaster) {
  console.log("Running in normal browser (not Farcaster)");
} else {
  console.log("Running inside Farcaster");
}

const btn = document.getElementById("testBtn");

btn.addEventListener("click", () => {
  alert("✅ Test button working");
});

// ---- Farcaster init ----
async function initFarcaster() {
  try {
    if (!window.farcaster) return;

    // VERY IMPORTANT
    await window.farcaster.ready();

    const ctx = await window.farcaster.context;
    console.log("Farcaster context:", ctx);

    // Tell Farcaster app that UI is ready
    window.farcaster.resize();

  } catch (err) {
    console.error("Farcaster init error:", err);
  }
}

initFarcaster();
