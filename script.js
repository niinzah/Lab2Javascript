console.log("1. script.js loaded");
const form = document.getElementById("FeedbackForm");
console.log("2. form found:", form);

if (form) {
  console.log("3. inside the if block");

  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const topicInput = document.getElementById("topic");
  const topicError = document.getElementById("topicError");
  const commentsInput = document.getElementById("comments");
  const commentsError = document.getElementById("commentsError");
  const commentsCounter = document.getElementById("commentsCounter");
  const websiteInput = document.getElementById("website");
  const websiteError = document.getElementById("websiteError");

  const COMMENTS_MIN = 15;
  const nameFormat = /^[\p{L}\p{M}][\p{L}\p{M}' \-]*$/u;
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") return "Name is required.";
    if (value.length < 2) return "Name must be at least 2 characters.";
    if (!nameFormat.test(value)) return "Use only letters, spaces, apostrophes, and hyphens.";
    return "";
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (value === "") return "Email is required.";
    if (!value.includes("@")) return "Email must contain an @ symbol.";
    if (!emailFormat.test(value)) return "Enter a valid email address, like name@example.com.";
    return "";
  }

  function validateTopic() {
    return topicInput.value === "" ? "Please select a topic." : "";
  }

  function validateComments() {
    const length = commentsInput.value.trim().length;
    if (length === 0) return "Comments are required.";
    if (length < COMMENTS_MIN) {
      return `Comments must be at least ${COMMENTS_MIN} characters (${COMMENTS_MIN - length} more needed).`;
    }
    return "";
  }

  function updateCommentsCounter() {
    const length = commentsInput.value.trim().length;
    const met = length >= COMMENTS_MIN;
    commentsCounter.textContent = met
      ? `${length} characters ✓`
      : `${length} / ${COMMENTS_MIN} characters minimum`;
    commentsCounter.style.color = met ? "green" : "gray";
  }

  function validateWebsite() {
  if (websiteInput.value === "") return "";

  if (!websiteInput.validity.valid) {
    return websiteInput.validationMessage;
  }
  if (!/^https?:\/\//i.test(websiteInput.value)) {
  return "URL must start with http:// or https://";
}
  return "";}

  nameInput.addEventListener("blur", () => {
    console.log("blur fired");
    nameError.textContent = validateName();
  });

  emailInput.addEventListener("blur", () => {
    emailError.textContent = validateEmail();
  });

  topicInput.addEventListener("change", () => {
    topicError.textContent = validateTopic();
  });

  websiteInput.addEventListener("blur", () => {
    websiteError.textContent = validateWebsite();
  });

  commentsInput.addEventListener("input", () => {
    updateCommentsCounter();
    if (commentsError.textContent !== "") {
      commentsError.textContent = validateComments();
    }
  });

  commentsInput.addEventListener("blur", () => {
    commentsError.textContent = validateComments();
  });

form.addEventListener("submit", (e) => {
  const nameMsg = validateName();
  const emailMsg = validateEmail();
  const topicMsg = validateTopic();
  const websiteMsg = validateWebsite();
  const commentsMsg = validateComments();

  nameError.textContent = nameMsg;
  emailError.textContent = emailMsg;
  topicError.textContent = topicMsg;
  websiteError.textContent = websiteMsg;
  commentsError.textContent = commentsMsg;

  if (nameMsg || emailMsg || topicMsg || websiteMsg || commentsMsg) {
    e.preventDefault();
    if (nameMsg) nameInput.focus();
    else if (emailMsg) emailInput.focus();
    else if (topicMsg) topicInput.focus();
    else if (websiteMsg) websiteInput.focus();
    else commentsInput.focus();
  }

form.addEventListener("reset", () => {
  nameError.textContent = "";
  emailError.textContent = "";
  topicError.textContent = "";
  websiteError.textContent = "";
  commentsError.textContent = ""; });

  // when reset it removes invalid markers because of using aria-invalid
  [nameInput, emailInput, topicInput, websiteInput, commentsInput].forEach((el) => {
    el.removeAttribute("aria-invalid");
  });

  setTimeout(updateCommentsCounter, 0);
});

  updateCommentsCounter();
}   