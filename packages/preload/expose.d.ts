import IExposedApi from "./IExposedApi";

declare global {
  interface Window {
    api: IExposedApi;
  }
}
