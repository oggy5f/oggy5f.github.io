console.log("script.js loaded");

// Helper
function log(msg, data = "") {
  console.log(`[MiniApp] ${msg}`, data);
}

// Button test (existing)
const testBtn = document.getElementById("testBtn");
if (testBtn) {
  testBtn.addEventListener("click", () => {
    alert("✅ Test button working");
  });
}

// ---- Farcaster Context Step ----

if (window.frameSDK) {
  log("Farcaster SDK detected");

  try {
    window.frameSDK.actions.ready();
    log("frameSDK ready() called");

    window.frameSDK.context
      .then((ctx) => {
        log("Farcaster context received", ctx);

        // Show on UI
        const status = document.getElementById("status");
        if (status) {
          status.innerText =
            "✅ Running inside Farcaster\n" +
            `FID: ${ctx?.user?.fid || "N/A"}\n` +
            `Username: ${ctx?.user?.username || "N/A"}`;
        }
      })
      .catch((err) => {
        log("Context error", err);
      });
  } catch (e) {
    log("SDK error", e);
  }
} else {
  log("Running in normal browser (not Farcaster)");
}
