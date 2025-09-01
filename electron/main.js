const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false,
    webPreferences: { nodeIntegration: true }
  });

  win.loadURL("http://localhost:3001");
}

app.whenReady().then(createWindow);
