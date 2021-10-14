import { createContext, FC, useContext, useMemo } from "react";

type SiteConfigContextValue = WindowConfig;

const initialConfig: WindowConfig = {
  siteTitle: "",
  siteDescription: "",
  appId: "",
  buildId: "",
  api: "",
  staticUri: ""
};

const SiteConfigContext = createContext<SiteConfigContextValue>(initialConfig);

const SiteConfigProvider: FC = ({ children }) => {
  const config = useMemo(() => {
    if (typeof window === "undefined") {
      return initialConfig;
    }
    return window.config;
  }, []);
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
};

const useSiteConfig = () => useContext(SiteConfigContext);

export { SiteConfigProvider, useSiteConfig };
