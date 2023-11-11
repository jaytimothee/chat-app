const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require("toastify-js");

// Expose ipcRenderer for communication with the main process
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

// Expose Toastify for showing toasts
contextBridge.exposeInMainWorld("Toastify", {
  toast: (options) => Toastify(options).showToast(),
});

// Expose a function to get the current page URL
contextBridge.exposeInMainWorld("getCurrentPage", () => {
  return window.location.href;
});
