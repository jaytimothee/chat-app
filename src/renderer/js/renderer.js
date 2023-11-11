// DOM elements
const phoneNumberForm = document.getElementById("phone-number-form");
const confirmTextForm = document.getElementById("confirm-text-form");
const nameForm = document.getElementById("name-form");
const chatContainer = document.getElementById("chat-container");

// User information
let user = {};

// Check the current page and add event listeners accordingly
const currentPage = getCurrentPage();

if (currentPage.includes("phone-number.html")) {
  // Step 1: Phone Number
  phoneNumberForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const phoneNumber = document.getElementById("phone-number-input").value;

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
      ipcRenderer.send("move-to-next-step", "confirm-text", user);
    } else {
      alertError("Invalid phone number. Please enter a valid phone number.");
    }
  });
} else if (currentPage.includes("confirm-text.html")) {
  // Step 2: Confirm Text
  confirmTextForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const confirmText = document.getElementById("confirm-text-input").value;

    if (confirmText) {
      ipcRenderer.send("move-to-next-step", "name", user);
    } else {
      alertError("Invalid confirmation text. Please enter a valid code.");
    }
  });
} else if (currentPage.includes("name.html")) {
  // Step 3: Name
  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name-input").value;

    if (name) {
      user.name = name;
      ipcRenderer.send("move-to-next-step", "chat-screen", user);
    } else {
      alertError("Please enter your name.");
    }
  });
}

// Handle Toast message
function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}
