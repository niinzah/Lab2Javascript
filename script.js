    const form = document.getElementById("FeedbackForm");
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("nameError");    

    const nameFormat = /^[\p{L}\p{M}][\p{L}\p{M}' \-]*$/u;

    function validateName() {const value = nameInput.value.trim();

    if (value === "") {
      return "Name is required.";
    }
    if (value.length < 2) {
      return "Name must be at least 2 characters.";
    }
    if (!nameFormat.test(value)) {
      return "Use only letters, spaces, apostrophes, and hyphens.";
    }
    return "";}
