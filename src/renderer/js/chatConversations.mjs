const senderIdMap = {};

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
  // message.to = getSenderId(findRecipientNameById(id).recipientName);
  chatConversation.push(message);
  // console.log("new ", chatConversation);
}

// function findRecipientNameById(id) {
//   return chatConversation.find((recipient) => recipient.id === id);
// }

const chatConversation = [
  {
    id: getSenderId("Darryl"),
    recipientName: "Darryl",
    recipientAvatar: "./assets/img.png",
    text: "When are you visiting Scotland again?",
    timestamp: getFormattedTimestamp(),
    from: "other",
    type: "text",
  },
  {
    id: getSenderId("Darryl"),
    recipientName: "Darryl",
    recipientAvatar: "./assets/img.png",
    text: "I think mostly they are targeting parents; my friend’s mother got scammed 20k.",
    timestamp: getFormattedTimestamp(),
    from: "other",
    type: "text",
  },
  {
    id: getSenderId("Darryl"),
    recipientName: "Darryl",
    recipientAvatar: "./assets/img.png",
    text: "Planning any trips soon?",
    timestamp: getFormattedTimestamp(),
    from: "other",
    type: "text",
  },

  {
    text: "When are you comming to Spain",
    timestamp: getFormattedTimestamp(),
    from: "you",
    to: getSenderId("Darryl"),
  },
  {
    text: "Today I seen a blue bird for the first time in a long time",
    timestamp: getFormattedTimestamp(),
    from: "you",
    to: getSenderId("Darryl"),
  },
  {
    text: "Do you have a vacuum that I can borrow ",
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
export { addMessage };
export default chatConversation;
