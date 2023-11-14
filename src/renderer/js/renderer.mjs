// renderer.js

// Import necessary classes for sign up form
import { PhoneNumberStep, ConfirmCodeStep, NameStep } from "./StepStrategy.mjs";
import { initializeSidebarChatConversation } from "./initializeSidebarChatConversation.mjs";
import {
  initializeMainWindowConversation,
  updateChatUI,
} from "./mainChatWindowConversation.mjs";

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

  const sendChatBtn = document.getElementById("send-chat-btn");
  const inputElement = document.querySelector(".chat-input input");

  // Event listener for the click event on the button
  sendChatBtn.addEventListener("click", () => {
    sendMessage();
  });

  // Event listener for the keydown event on the input field
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  // Function to send the message
  function sendMessage() {
    const messageText = inputElement.value.trim();

    if (messageText !== "") {
      const newMessage = {
        text: messageText,
      };

      ipcRenderer.send("send-message", newMessage);

      // Clear the input field
      inputElement.value = "";
    }
  }

  ipcRenderer.on("update-chat-ui", (event) => {
    // Update the chat UI based on the latest chat state
    updateChatUI(event);
  });
}
