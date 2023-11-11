// StepStrategy.js

class StepStrategy {
  constructor(form, currentStep, nextStep, validationCallback) {
    this.form = form;
    this.currentStep = currentStep;
    this.nextStep = nextStep;
    this.validationCallback = validationCallback;
    this.user = {}; // Initialize the user object
  }

  execute() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#validateAndProceed();
    });
  }

  #validateAndProceed() {
    const inputValue = this.#getInputValue();
    if (this.validationCallback(inputValue)) {
      this.user[this.nextStep] = inputValue;
      ipcRenderer.send("move-to-next-step", this.nextStep, this.user);
    } else {
      alertError(
        `Invalid ${this.currentStep}. Please enter a valid ${this.currentStep}.`
      );
    }
  }

  #getInputValue() {
    return this.form.querySelector("input").value;
  }
}

// Concrete strategy classes

// Step 1: Phone Number
class PhoneNumberStep extends StepStrategy {
  constructor() {
    super(
      document.getElementById("phone-number-form"),
      "phone-number",
      "confirm-code",
      isValidPhoneNumber
    );
  }
}

// Step 2: Confirm Code
class ConfirmCodeStep extends StepStrategy {
  constructor() {
    super(
      document.getElementById("confirm-code-form"),
      "confirm-code",
      "name",
      isValidConfirmCode
    );
  }
}

// Step 3: Name
class NameStep extends StepStrategy {
  constructor() {
    super(
      document.getElementById("name-form"),
      "name",
      "chat-screen",
      isValidName
    );
  }
}

// Utility functions for validation
function isValidPhoneNumber(phoneNumber) {
  // Implement validation logic for phone number
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidConfirmCode(confirmCode) {
  // Implement validation logic for confirmation Code
  const confirmCodeRegex = /^\d{6}$/;
  return confirmCodeRegex.test(confirmCode);
}

function isValidName(name) {
  // Implement validation logic for name
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  return nameRegex.test(name);
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}

// Export the strategy classes
export { StepStrategy, PhoneNumberStep, ConfirmCodeStep, NameStep };
