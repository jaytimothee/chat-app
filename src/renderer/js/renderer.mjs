// renderer.js

// Import necessary classes for sign up form
import { PhoneNumberStep, ConfirmCodeStep, NameStep } from "./StepStrategy.mjs";

const currentPage = getCurrentPage();

// Create and execute the appropriate strategy based on the current page
let currentStepStrategy;

if (currentPage.includes("phone-number.html")) {
  currentStepStrategy = new PhoneNumberStep();
} else if (currentPage.includes("confirm-code.html")) {
  currentStepStrategy = new ConfirmCodeStep();
} else if (currentPage.includes("name.html")) {
  currentStepStrategy = new NameStep();
}

// Execute the strategy
if (currentStepStrategy) {
  currentStepStrategy.execute();
}
