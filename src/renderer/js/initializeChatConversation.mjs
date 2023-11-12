import chatConversations from "./chatConversations.mjs";

function initializeChatConversation() {
  const chatMessagesContainer = document.querySelector(".chat-messages");
  console.log("conversation init ", chatConversations);
  chatConversations.forEach((message) => {
    const messageElement = createMessageElement(message);
    chatMessagesContainer.appendChild(messageElement);
  });
}

function createMessageElement(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "message",
    message.from === "you" ? "from-you" : "from-other"
  );

  const textElement = document.createElement("span");
  textElement.classList.add("message-text");
  textElement.textContent = message.text;

  const timestampElement = document.createElement("span");
  timestampElement.classList.add("message-timestamp");
  timestampElement.textContent = message.timestamp;

  messageElement.appendChild(textElement);
  messageElement.appendChild(timestampElement);

  // Append the "seen" tick if the message is from you
  if (message.from === "you") {
    const seenTickElement = createSeenTickElement();
    messageElement.appendChild(seenTickElement);
  }

  return messageElement;
}

function createSeenTickElement() {
  const seenTickElement = document.createElement("span");
  seenTickElement.classList.add("seen-tick");

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", "16");
  svgElement.setAttribute("height", "16");
  svgElement.setAttribute("viewBox", "0 0 16 16");
  svgElement.setAttribute("fill", "none");

  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute("fill-rule", "evenodd");
  pathElement.setAttribute("clip-rule", "evenodd");
  pathElement.setAttribute(
    "d",
    "M15.0205 4.31319C15.2158 4.50846 15.2158 4.82504 15.0205 5.0203L8.35388 11.687C8.15862 11.8822 7.84203 11.8822 7.64677 11.687L4.31344 8.35363C4.11818 8.15837 4.11818 7.84179 4.31344 7.64653C4.5087 7.45127 4.82528 7.45127 5.02055 7.64653L8.00033 10.6263L14.3134 4.31319C14.5087 4.11793 14.8253 4.11793 15.0205 4.31319ZM11.6866 4.31319C11.8818 4.50846 11.8818 4.82504 11.6866 5.0203L8.35323 8.35363C8.15797 8.5489 7.84138 8.5489 7.64612 8.35363C7.45086 8.15837 7.45086 7.84179 7.64612 7.64653L10.9795 4.31319C11.1747 4.11793 11.4913 4.11793 11.6866 4.31319ZM0.979454 7.64653C1.17472 7.45127 1.4913 7.45127 1.68656 7.64653L5.01989 10.9799C5.21516 11.1751 5.21516 11.4917 5.01989 11.687C4.82463 11.8822 4.50805 11.8822 4.31279 11.687L0.979454 8.35363C0.784192 8.15837 0.784192 7.84179 0.979454 7.64653Z"
  );
  pathElement.setAttribute("fill", "white");

  svgElement.appendChild(pathElement);
  seenTickElement.appendChild(svgElement);

  return seenTickElement;
}

// Call the function to render sidebar conversations
renderConversations();

// Function to render the conversations in the sidebar
function renderConversations() {
  const conversationList = document.getElementById("conversation-list");

  // Clear existing items
  conversationList.innerHTML = "";

  // Filter conversations
  const filteredConversation = filterConversations(chatConversations);

  // Function to filter out conversations from yourself and keep only the first for each recipient
  function filterConversations(conversations) {
    const filteredConversation = [];
    const uniqueRecipients = new Set();

    for (const message of conversations) {
      if (
        message.from !== "you" &&
        !uniqueRecipients.has(message.recipientName)
      ) {
        filteredConversation.push(message);
        uniqueRecipients.add(message.recipientName);
      }
    }

    return filteredConversation;
  }

  // Add conversation items
  filteredConversation.forEach((conversation) => {
    if (conversation.from === "you") return;
    const conversationItem = createSidebarConversationItem(conversation);
    conversationList.appendChild(conversationItem);
  });
}

function createSidebarConversationItem(conversation) {
  const conversationItem = document.createElement("li");
  conversationItem.classList.add("conversation-item");

  const recipientAvatar = document.createElement("img");
  recipientAvatar.classList.add("recipient-avatar");
  recipientAvatar.src = conversation.recipientAvatar;
  recipientAvatar.alt = "avatar";

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("recipient-message-container");

  const recipientName = document.createElement("span");
  recipientName.classList.add("recipient-name");
  recipientName.textContent = conversation.recipientName;

  const recipientMessage = document.createElement("span");
  recipientMessage.classList.add("recipient-message");
  recipientMessage.textContent =
    conversation.text.length > 50
      ? conversation.text.substring(0, 50) + "..."
      : conversation.text;

  const timestamp = document.createElement("span");
  timestamp.classList.add("timestamp");
  timestamp.textContent = conversation.timestamp;

  messageContainer.appendChild(recipientName);
  messageContainer.appendChild(recipientMessage);
  messageContainer.appendChild(timestamp);

  conversationItem.appendChild(recipientAvatar);
  conversationItem.appendChild(messageContainer);

  return conversationItem;
}

export { initializeChatConversation };
