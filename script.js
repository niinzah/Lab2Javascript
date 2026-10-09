console.log("1. script.js loaded");
const form = document.getElementById("FeedbackForm");
console.log("2. form found:", form);

if (form) {
  console.log("3. inside the if block");

  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  console.log("4. nameInput:", nameInput, "nameError:", nameError);

  const nameFormat = /^[\p{L}\p{M}][\p{L}\p{M}' \-]*$/u;

  function validateName() {
    const value = nameInput.value.trim();

    if (value === "") {
      return "Name is required.";
    }
    if (value.length < 2) {
      return "Name must be at least 2 characters.";
    }
    if (!nameFormat.test(value)) {
      return "Use only letters, spaces, apostrophes, and hyphens.";
    }
    return "";
  }

  nameInput.addEventListener("blur", () => {
    console.log("blur fired");
    nameError.textContent = validateName();
  });

  form.addEventListener("submit", (e) => {
    console.log("submit fired");
    const error = validateName();
    nameError.textContent = error;

    if (error) {
      e.preventDefault();
      nameInput.focus();
    }
  });

  console.log("5. listeners attached");
}