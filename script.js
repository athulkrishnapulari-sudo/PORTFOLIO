(function () {
  const statusEl = document.getElementById("status");
  if (!statusEl) return;

  const words = ["B.Tech Student", "Web Developer", "Ethical Hacker"];
  const typeSpeed = 180;
  const deleteSpeed = 180;
  const pauseBetween = 1400;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  statusEl.appendChild(cursor);

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = words[wordIndex];
    if (!deleting) {
      charIndex++;
      statusEl.firstChild && statusEl.removeChild(statusEl.firstChild);
      statusEl.insertBefore(
        document.createTextNode(current.slice(0, charIndex)),
        cursor,
      );

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseBetween);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      statusEl.firstChild && statusEl.removeChild(statusEl.firstChild);
      statusEl.insertBefore(
        document.createTextNode(current.slice(0, charIndex)),
        cursor,
      );

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, typeSpeed);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  statusEl.insertBefore(document.createTextNode(""), cursor);
  tick();
})();

// Contact form submit logic
const container = document.getElementById("success_container");
function success() {
  const btn = document.getElementById("Alertbtn");
  const container = document.getElementById("success_container");
  btn.addEventListener("click", function (e) {
    container.classList.toggle("active");
  });
}

const scriptUrl =
    "https://script.google.com/macros/s/AKfycbxCellDwMGgCr0EFkDgG0D4wFhynRFLADhe3hgCYT4xiEODwfItCiJzYyDtTRHJ2FxCvQ/exec";


const form = document.getElementById("contact_form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    const subject = document.getElementById("subject_input").value;
    const message = document.getElementById("message_input").value;
    const payload = {
      Name: name,
      Email: email,
      Subject: subject,
      Message: message,
    };
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const result = await response.json();
    console.log("Server response:", result);


    if (result.message === "Data added successfully") {
      console.log("True");
      container.classList.toggle("active");
    } else {
      console.log("False or error occurred");
      console.log("Comparison failed. Expected: 'Data added successfully', Got:", result.message);
    }
    success();
    form.reset();
  } catch (err) { }
});
