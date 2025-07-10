let shareCount = 0;
const shareBtn = document.getElementById("shareBtn");
const shareCounter = document.getElementById("shareCounter");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

if (localStorage.getItem("submitted") === "true") {
  disableForm();
}

shareBtn.addEventListener("click", () => {
  if (shareCount < 5) {
    shareCount++;
    const shareText = "Hey Buddy, Join Tech For Girls Community";
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");

    shareCounter.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      shareCounter.innerText += " ✅ Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please share on WhatsApp 5 times before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  // Upload file to Google Drive via Apps Script
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", file);

 const response = await fetch(
  "https://script.google.com/macros/s/AKfycby3GgPicS2e_xnOB-ISzizJO7m-waPZQ-eg7DKwMhCN17UGUoM00zYkbAjHg6k7uFDA/exec",
    { method: "POST" }
  );

  if (response.ok) {
    localStorage.setItem("submitted", "true");
    disableForm();
    message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
  } else {
    alert("Error submitting the form. Please try again.");
  }
});

function disableForm() {
  document.querySelectorAll("input, button").forEach(el => {
    el.disabled = true;
  });
  message.textContent = "🎉 You have already submitted the form.";
}
