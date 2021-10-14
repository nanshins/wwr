import { FC } from "react";
import { SWRConfigProvider } from "../swr-config";
import { SiteConfigProvider } from "../use-site-config";

const AppProviders: FC = ({ children }) => {
  return (
    <SiteConfigProvider>
      <SWRConfigProvider>{children}</SWRConfigProvider>
    </SiteConfigProvider>
  );
};

export { AppProviders };
