// script.js – Farcaster Mini App Safe Bootstrap

window.addEventListener("load", () => {
  const statusLog = (msg) => {
    console.log(msg);
  };

  // Detect Farcaster SDK
  if (window.sdk && window.sdk.actions) {
    statusLog("🟣 Farcaster SDK detected");

    try {
      window.sdk.actions.ready();
      statusLog("✅ sdk.actions.ready() called");
    } catch (err) {
      console.error("❌ Error calling ready():", err);
    }

  } else {
    statusLog("🌐 Running in normal browser (not Farcaster)");
  }

  // Button test
  const btn = document.getElementById("testBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("✅ Test button working");
    });
  } else {
    console.warn("⚠️ testBtn not found in DOM");
  }
});
