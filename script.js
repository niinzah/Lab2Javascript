const form = document.getElementById("FeedbackForm");

if (form) {
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const topicInput = document.getElementById("topic");
  const topicError = document.getElementById("topicError");
  const websiteInput = document.getElementById("website");
  const websiteError = document.getElementById("websiteError");
  const commentsInput = document.getElementById("comments");
  const commentsError = document.getElementById("commentsError");
  const commentsCounter = document.getElementById("commentsCounter");
  const formStatus = document.getElementById("formStatus");
  const clearButton = form.querySelector('button[type="reset"]');

  const fieldPairs = [
    [nameInput, nameError],
    [emailInput, emailError],
    [topicInput, topicError],
    [websiteInput, websiteError],
    [commentsInput, commentsError],
  ];

  const COMMENTS_MIN = 15;
  const nameFormat = /^[\p{L}\p{M}][\p{L}\p{M}' \-]*$/u;
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateFullName() {
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

  function validateWebsite() {
    if (websiteInput.value === "") return "";
    if (!websiteInput.validity.valid) return websiteInput.validationMessage;
    if (!/^https?:\/\//i.test(websiteInput.value)) {
      return "URL must start with http:// or https://";
    }
    return "";
  }

  function validateComments() {
    const length = commentsInput.value.trim().length;
    if (length === 0) return "Comments are required.";
    if (length < COMMENTS_MIN) {
      return `Comments must be at least ${COMMENTS_MIN} characters (${COMMENTS_MIN - length} more needed).`;
    }
    return "";
  }

  function showFieldError(input, errorEl, message) {
    errorEl.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.classList.remove("valid");
  }

  function clearFieldError(input, errorEl) {
    errorEl.textContent = "";
    input.removeAttribute("aria-invalid");
    input.classList.remove("valid");
  }

  function markFieldValid(input) {
    input.setAttribute("aria-invalid", "false");
    input.classList.add("valid");
  }

  function applyValidation(input, errorEl, message) {
    if (message) {
      showFieldError(input, errorEl, message);
      return;
    }
    clearFieldError(input, errorEl);
    if (input.value.trim() !== "") markFieldValid(input);
  }

function renderCommentsCounter(length) {
  const met = length >= COMMENTS_MIN;

  commentsCounter.textContent = met
    ? `${length} characters ✓`
    : `${length} / ${COMMENTS_MIN} characters minimum`;

  commentsCounter.style.color = "";
  commentsCounter.classList.toggle("too-short", !met && length > 0);
  commentsCounter.classList.toggle("long-enough", met);
}

function updateCommentsCounter() {
  renderCommentsCounter(commentsInput.value.trim().length);
}

  function setFormStatus(message, isSuccess) {
    formStatus.textContent = message;
    formStatus.classList.toggle("success", isSuccess);
  }

  function resetForm() {
    fieldPairs.forEach(([input, errorEl]) => clearFieldError(input, errorEl));
    renderCommentsCounter(0);
}

  nameInput.addEventListener("blur", () => {
    applyValidation(nameInput, nameError, validateFullName());
  });

  emailInput.addEventListener("blur", () => {
    applyValidation(emailInput, emailError, validateEmail());
  });

  topicInput.addEventListener("change", () => {
    applyValidation(topicInput, topicError, validateTopic());
  });

  websiteInput.addEventListener("blur", () => {
    applyValidation(websiteInput, websiteError, validateWebsite());
  });

  commentsInput.addEventListener("input", () => {
    updateCommentsCounter();
    if (commentsInput.getAttribute("aria-invalid") === "true") {
      applyValidation(commentsInput, commentsError, validateComments());
    }
  });

  commentsInput.addEventListener("blur", () => {
    applyValidation(commentsInput, commentsError, validateComments());
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const messages = [
      validateFullName(),
      validateEmail(),
      validateTopic(),
      validateWebsite(),
      validateComments(),
    ];

    fieldPairs.forEach(([input, errorEl], i) => {
      applyValidation(input, errorEl, messages[i]);
    });

    const firstErrorIndex = messages.findIndex((m) => m !== "");
    if (firstErrorIndex !== -1) {
      setFormStatus("", false);
      fieldPairs[firstErrorIndex][0].focus();
      return;
    }

    setFormStatus("Thank you! Your feedback has been submitted.", true);
    form.reset();
  });

  form.addEventListener("reset", resetForm);

  clearButton.addEventListener("click", () => {
    setFormStatus("", false);
  });

  clearButton.addEventListener("click", () => {
    setFormStatus("", false);
  });

  updateCommentsCounter(); 
}