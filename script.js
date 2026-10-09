console.log("1. script.js loaded");
const form = document.getElementById("FeedbackForm");
console.log("2. form found:", form);

if (form) {
  console.log("3. inside the if block");

  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

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

  function validateEmail() {
    const value = emailInput.value.trim();

    if (value === "") {
      return "Email is required.";
    }
    if (!value.includes("@")) {
      return "Email must contain an @ symbol.";
    }
    if (!emailFormat.test(value)) {
      return "Enter a valid email address, like name@example.com.";
    }
    return "";
  }

  nameInput.addEventListener("blur", () => {
    console.log("blur fired");
    nameError.textContent = validateName();
  });

    emailInput.addEventListener("blur", () => {
    emailError.textContent = validateEmail();
  });

  form.addEventListener("submit", (e) => {
    const nameMsg = validateName();
    const emailMsg = validateEmail();

    nameError.textContent = nameMsg;
    emailError.textContent = emailMsg;

    if (nameMsg || emailMsg) {
      e.preventDefault();
      // Focus the first field that has a problem
      if (nameMsg) {
        nameInput.focus();
      } else {
        emailInput.focus();
      }
    }
  } );
}   