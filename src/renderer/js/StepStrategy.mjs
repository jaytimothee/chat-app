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
    if (this.validationCallback(inputValue[this.currentStep])) {
      if (this.currentStep === "name") {
        // Handle the name step with separate first-name and last-name inputs
        this.user.firstName = inputValue["first-name"];
        this.user.lastName = inputValue["last-name"];
      } else {
        this.user[this.currentStep] = inputValue[this.currentStep];
      }
      this.user.nextStep = this.nextStep;

      ipcRenderer.send("move-to-next-step", this.user);
    } else {
      alertError(
        `Invalid ${this.currentStep}. Please enter a valid ${this.currentStep}.`
      );
    }
  }

  #getInputValue() {
    const inputElements = this.form.querySelectorAll("input");
    const inputValues = {};

    inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
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
    duration: 3000,
    close: false,
    position: "bottom right",
    style: {
      background: "#E53E3E",
      color: "#FFF",
      borderRadius: "8px",
      fontSize: "1rem",
      padding: "1.25rem",
      width: "200px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
    },
  });
}

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "#E53E3E",
      color: "#FFF",
      borderRadius: "8px",
      fontSize: "1rem",
      padding: "1.25rem",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
  });
}

// Export the strategy classes
export { StepStrategy, PhoneNumberStep, ConfirmCodeStep, NameStep };
