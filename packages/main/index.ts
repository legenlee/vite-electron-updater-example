import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { checkForUpdates } from "./updater";

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    title: "vite-electron-updater-example",
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs"),
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  } else {
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

    win.webContents.openDevTools();
    win.loadURL(url);
  }
}

app.on("ready", () => {
  createWindow();
  checkForUpdates(win);
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length === 0) {
    createWindow();
  }
});

ipcMain.on("version", (event) => {
  event.returnValue = app.getVersion();
});
