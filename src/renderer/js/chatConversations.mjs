const senderIdMap = {};
let isYou = true;

function getSenderId(name) {
  if (!senderIdMap[name]) {
    senderIdMap[name] = generateUniqueId();
  }
  return senderIdMap[name];
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function addMessage(message) {
  isYou == true ? (message.to = getSenderId("Darryl")) : null;
  if (isYou) {
    message.from = "you";
  } else {
    message.from = "other";
    message.recipientName = "Darryl";
    message.recipientAvatar = "./assets/img.png";
  }
  (message.timestamp = getFormattedTimestamp()), (isYou = !isYou); // Toggle the sender for the next message

  chatConversation.unshift(message);
  getLatestMessage();
}

function getLatestMessage() {
  return chatConversation[0];
}

const chatConversation = [
  {
    id: getSenderId("Darryl"),
    recipientName: "Darryl",
    recipientAvatar: "./assets/img.png",
    text: "but I think mostly they targeting parents cos my friend’s mother got scammed 20K",
    timestamp: getFormattedTimestamp(),
    from: "other",
    type: "text",
  },

  {
    text: "I saw the most recent scam is the ads on Facebook selling seafood at a cheap price",
    timestamp: getFormattedTimestamp(),
    from: "you",
    to: getSenderId("Darryl"),
  },
];

function getFormattedTimestamp() {
  const date = new Date();

  const randomMinutes = Math.floor(Math.random() * 60);
  date.setMinutes(date.getMinutes() + randomMinutes);

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTimestamp = date.toLocaleTimeString("en-US", options);

  return formattedTimestamp;
}
export { addMessage, getLatestMessage };
export default chatConversation;
