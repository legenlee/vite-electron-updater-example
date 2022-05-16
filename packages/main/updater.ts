import { autoUpdater, ProgressInfo } from "electron-updater";
import log from "electron-log";
import { BrowserWindow } from "electron";

let win: BrowserWindow | null;

const logToRenderer = (text: string) => {
  log.info(text);
  win?.webContents.send("message", text);
};

export const checkForUpdates = (window: BrowserWindow) => {
  win = window;
  return autoUpdater.checkForUpdates();
};

autoUpdater.on("checking-for-update", () => {
  logToRenderer("Checking for update...");
});

autoUpdater.on("update-available", (info) => {
  logToRenderer("Update available.");
});

autoUpdater.on("update-not-available", (info) => {
  logToRenderer("Update not available.");
});

autoUpdater.on("error", (err) => {
  logToRenderer("Error in auto-updater. " + err);
});

autoUpdater.on("download-progress", (info: ProgressInfo) => {
  logToRenderer(
    `Download speed: ${info.bytesPerSecond} - Downloaded ${info.percent}% (${info.transferred}/${info.total})`
  );
});

autoUpdater.on("update-downloaded", (info) => {
  logToRenderer("Update downloaded");
});
