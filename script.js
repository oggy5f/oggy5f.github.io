const status = document.getElementById("status");
const btn = document.getElementById("btn");

function log(msg) {
  console.log(msg);
  status.textContent += msg + "\n";
}

document.addEventListener("DOMContentLoaded", async () => {
  log("App loaded");

  if (!window.fc) {
    log("Not inside Farcaster");
    return;
  }

  try {
    await window.fc.ready();
    log("Mini App ready");

    const ctx = await window.fc.getContext();
    log("FID: " + ctx.user.fid);

    btn.onclick = () => {
      alert("Mini App works. FID: " + ctx.user.fid);
    };
  } catch (e) {
    log("Init failed");
    console.error(e);
  }
});
