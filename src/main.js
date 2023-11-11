const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;
let user;
let conversation = [];
let currentStep = "phone-number";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "./renderer/phone-number.html"));

  // Send the initial conversation to the renderer process
  mainWindow.webContents.send("initialize-conversation", conversation);
}

// ...

// Handle IPC events for onboarding flow
ipcMain.on("move-to-next-step", (event, nextStep, userData) => {
  currentStep = nextStep;

  if (currentStep === "name") {
    // Send the initial conversation and user information to the renderer process
    mainWindow.webContents.send("initialize-conversation", conversation);
    mainWindow.webContents.send("set-user", userData);
  }

  // Load the next step
  mainWindow.loadFile(path.join(__dirname, `./renderer/${currentStep}.html`));
});

ipcMain.on("set-user", (event, userData) => {
  user = userData;
});

// ...

// Handle IPC event to show the chat screen
ipcMain.on("show-chat-screen", () => {
  mainWindow.loadFile("chat-screen.html");
});

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
