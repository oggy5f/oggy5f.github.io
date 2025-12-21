// STEP 4A – Daily Check-in logic (local, safe)

const btn = document.getElementById("checkinBtn");
const status = document.getElementById("status");

function todayKey() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `checkin_${today}`;
}

async function init() {
  // Farcaster SDK check
  if (!window.farcaster?.sdk) {
    status.innerText = "❌ Not running inside Farcaster";
    return;
  }

  const sdk = window.farcaster.sdk;

  // Tell Farcaster app we are ready
  await sdk.actions.ready();

  // Get Farcaster user
  const context = await sdk.context.get();
  const username = context?.user?.username;

  // Check if already checked in today
  if (localStorage.getItem(todayKey())) {
    status.innerText = `✅ @${username} already checked in today`;
    btn.disabled = true;
    btn.innerText = "Checked in";
    return;
  }

  status.innerText = `👤 @${username} — ready for check-in`;
}

btn.addEventListener("click", () => {
  // Save today's check-in
  localStorage.setItem(todayKey(), "done");

  btn.disabled = true;
  btn.innerText = "Checked in";

  status.innerText = "🎉 Check-in successful (today)";
});

init();
