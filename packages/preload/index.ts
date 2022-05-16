import { ipcRenderer, contextBridge } from "electron";
import IExposedApi from "./IExposedApi";

const api: IExposedApi = {
  getAppVersion(): string {
    return ipcRenderer.sendSync("version");
  },
};

ipcRenderer.on("message", (_event, msg: string) => {
  console.log(msg);
});

contextBridge.exposeInMainWorld("api", api);
