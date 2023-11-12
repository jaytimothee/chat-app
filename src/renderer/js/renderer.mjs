// renderer.js

// Import necessary classes for sign up form
import { PhoneNumberStep, ConfirmCodeStep, NameStep } from "./StepStrategy.mjs";
import { initializeSidebarChatConversation } from "./initializeSidebarChatConversation.mjs";
import { initializeMainWindowConversation } from "./mainChatWindowConversation.mjs";

const currentPage = getCurrentPage();
console.log("Renderer process started!");
// Create and execute the appropriate strategy based on the current page
let currentStepStrategy;

if (currentPage.includes("phone-number.html")) {
  currentStepStrategy = new PhoneNumberStep();
} else if (currentPage.includes("confirm-code.html")) {
  ipcRenderer.send("set-user-phone-number");
  currentStepStrategy = new ConfirmCodeStep();
} else if (currentPage.includes("name.html")) {
  currentStepStrategy = new NameStep();
}

// Execute the strategy
if (currentStepStrategy) {
  currentStepStrategy.execute();
}

ipcRenderer.on("send-user-phone-number", (event) => {
  document.getElementById(
    "display-phone-number"
  ).innerText = `+1${event["phone-number"]}`;
});

if (currentPage.includes("chat-screen.html")) {
  initializeSidebarChatConversation();
  initializeMainWindowConversation();

  ipcRenderer.on("send-selected-conversation", (event) => {
    initializeMainWindowConversation(event.id);
  });
}
