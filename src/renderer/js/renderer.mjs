// renderer.js

// Import necessary classes for sign up form
import { PhoneNumberStep, ConfirmCodeStep, NameStep } from "./StepStrategy.mjs";
import { initializeSidebarChatConversation } from "./initializeSidebarChatConversation.mjs";
import {
  initializeMainWindowConversation,
  getMessagesForRecipient,
  createMessageElement,
} from "./mainChatWindowConversation.mjs";
import chatConversations, { addMessage } from "./chatConversations.mjs";

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

  ipcRenderer.on("current-chat-recipient", (event) => {
    let messageId = event;
    console.log("message-id", messageId);

    const sendChatBtn = document.getElementById("send-chat-btn");

    // Listen for the click event on the send button
    sendChatBtn.addEventListener("click", () => {
      const inputElement = document.querySelector(".chat-input input");
      const messageText = inputElement.value.trim();

      if (messageText !== "") {
        const newMessage = {
          text: messageText,
          timestamp: getCurrentTimestamp(),
          from: "you",
          to: messageId,
        };

        addMessage(newMessage);
        console.log("message-id-again", messageId);

        updateChatUI(messageId);
        inputElement.value = ""; // Clear the input field
      }
    });
  });

  function updateChatUI(messageId) {
    const chatMessagesContainer = document.querySelector(".chat-messages");
    chatMessagesContainer.innerHTML = ""; // Clear existing messages
    console.log("id", messageId);
    // Iterate through chatConversation and create message elements
    getMessagesForRecipient(chatConversations, messageId).forEach((message) => {
      const messageElement = createMessageElement(message);
      chatMessagesContainer.appendChild(messageElement);
    });
  }

  // Function to get the current timestamp
  function getCurrentTimestamp() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    return `${hours % 12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }
}
