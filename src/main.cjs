const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const userState = require("./renderer/js/userState.cjs");
// const chatConversations = require("./renderer/js/chatConversations.cjs");

let mainWindow;
let currentStep = "phone-number";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.cjs"),
    },
  });

  // Load the initial page
  loadPage("phone-number.html");
}

function loadPage(page) {
  // Load a page and handle potential errors
  try {
    mainWindow.loadFile(path.join(__dirname, `./renderer/${page}`));
  } catch (error) {
    console.error(`Error loading page: ${page}`, error);
  }
}

// IPC event handlers
ipcMain.on("move-to-next-step", (event, userData) => {
  // Move to the next step and load the corresponding page
  currentStep = userData.nextStep;
  userState.updateUser(userData);
  loadPage(`${currentStep}.html`);
});

ipcMain.on("set-user-phone-number", (event) => {
  // Send the user data to the renderer process
  event.sender.send("send-user-phone-number", userState.getUser());
});

// ipcMain.on("initialize-chat-conversation", (event) => {
//   // Send the initial conversation to the renderer process
//   event.sender.send("initialize-chat-conversation", chatConversations);
// });

// Application setup
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
