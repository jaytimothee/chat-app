import chatConversations from "./chatConversations.mjs";

function initializeMainWindowConversation(id) {
  const chatMessagesContainer = document.querySelector(".chat-messages");
  chatMessagesContainer.innerHTML = "";
  getMessagesForRecipient(chatConversations, id).forEach((message) => {
    const messageElement = createMessageElement(message);
    chatMessagesContainer.appendChild(messageElement);
  });
  updateChatHeader(id);
}

function getMessagesForRecipient(messages, id) {
  if (!id) {
    // If no id is provided, return first conversation from side bar
    return messages.length > 0
      ? getMessagesForRecipient(messages, messages[0].id)
      : [];
  }

  // Filter and sort messages
  const filteredMessages = messages.filter((message) => {
    // Check if the message matches the provided id
    if (message.id === id) {
      return true;
    }

    // Check if the message is from you and has a 'to' field matching the provided id
    if (message.from === "you" && message.to === id) {
      return true;
    }

    return false;
  });

  // Sort messages by timestamp
  filteredMessages.sort((a, b) => {
    const timeA = convertTimestampToComparable(a.timestamp);
    const timeB = convertTimestampToComparable(b.timestamp);
    return timeA.localeCompare(timeB);
  });

  return filteredMessages;
}

function updateChatHeader(conversationId) {
  const conversation = getConversationById(conversationId);

  if (conversation) {
    const recipientAvatar = document.getElementById("recipient-avatar");
    const chattingWith = document.querySelector(".chatting-with");

    // Update recipient avatar
    recipientAvatar.src = conversation.recipientAvatar;
    recipientAvatar.alt = `Avatar of ${conversation.recipientName}`;

    // Update chatting with text
    chattingWith.textContent = conversation.recipientName;
  } else {
    // Handle the case where conversationId is not valid or conversation not found
    console.log("Conversation not found");
  }
}

function getConversationById(conversationId) {
  // If no conversationId is provided, return the first conversation
  if (!conversationId) {
    return chatConversations[0];
  }

  // Find the conversation with the provided conversationId
  const conversation = chatConversations.find(
    (chat) => chat.id === conversationId
  );

  // Return the found conversation or null if not found
  return conversation || null;
}

// Function to convert timestamp to a comparable format
function convertTimestampToComparable(timestamp) {
  const date = new Date();
  const [time, period] = timestamp.split(" ");
  const [hours, minutes] = time.split(":");
  date.setHours(
    parseInt(hours) + (period === "PM" && parseInt(hours) !== 12 ? 12 : 0)
  );
  date.setMinutes(parseInt(minutes));
  return date.toISOString();
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

export { initializeMainWindowConversation };
