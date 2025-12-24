const statusEl = document.getElementById("status");
const btn = document.getElementById("testBtn");

function log(msg) {
  console.log(msg);
  if (statusEl) {
    statusEl.textContent += msg + "\n";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  log("App loaded");

  if (!window.farcaster) {
    log("Normal browser (not Farcaster)");
    if (btn) {
      btn.onclick = () => alert("Normal browser");
    }
    return;
  }

  log("Farcaster detected");

  window.farcaster.ready()
    .then(() => {
      const ctx = window.farcaster.getContext();
      log("Farcaster context ready");
      log("FID: " + ctx.user.fid);

      if (btn) {
        btn.onclick = () => {
          alert("Mini App working. FID: " + ctx.user.fid);
        };
      }
    })
    .catch((err) => {
      log("Farcaster ready failed");
      console.error(err);
    });
});
