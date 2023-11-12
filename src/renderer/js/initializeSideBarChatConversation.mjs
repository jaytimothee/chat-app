import chatConversations from "./chatConversations.mjs";

function initializeSidebarChatConversation() {
  // Call the function to render sidebar conversations
  renderConversations();
}

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
    if (conversation.from === "you") return; //safe gaurd to ensure sidebar conversations do not include messages from myself
    const conversationItem = createSidebarConversationItem(conversation);

    conversationItem.addEventListener("click", () => {
      // Emit event to main process with conversation details
      ipcRenderer.send("select-conversation", conversation);
    });
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

export { initializeSidebarChatConversation };
