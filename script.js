console.log("Farcaster Mini App JS loaded ✅");

const btn = document.getElementById("testBtn");

if (btn) {
  btn.addEventListener("click", () => {
    alert("Button working! 🎉");
  });
} else {
  console.error("Button not found ❌");
}
