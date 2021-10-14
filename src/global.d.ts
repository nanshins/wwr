type WindowConfig = {
  siteTitle: string;
  siteDescription: string;
  appId: string;
  buildId: string;
  api: string;
  baseUrl: string;
  staticUri: string;
};

interface Window {
  config: WindowConfig;
}

declare const window: Window;
