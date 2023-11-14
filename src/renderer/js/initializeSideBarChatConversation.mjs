import chatConversations from "./chatConversations.mjs";

function initializeSidebarChatConversation() {
  // Call the function to render sidebar conversations
  renderConversations();
}

// Function to render the conversations in the sidebar
function renderConversations(conversation) {
  const conversationList = document.getElementById("conversation-list");

  // Clear existing items
  conversationList.innerHTML = "";

  const conversationItem = createSidebarConversationItem(
    conversation || chatConversations[0]
  );
  conversationList.appendChild(conversationItem);
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
      ? conversation.text.substring(0, 33) + "..."
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

export { initializeSidebarChatConversation, renderConversations };
