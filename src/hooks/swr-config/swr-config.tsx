import { createContext, FC, useContext } from "react";
import { SWRConfig } from "swr";
import { useSiteConfig } from "../use-site-config";
import { WPClient } from "~/lib/api";

type SWRConfigContextValiue = {
  fetcher<Response = {}>(url: string): Promise<Response>;
  client: WPClient;
};

const SWRConfigContext = createContext<SWRConfigContextValiue>({
  fetcher: async () => null as any,
  client: null as any
});

const SWRConfigProvider: FC = ({ children }) => {
  const { api } = useSiteConfig();
  const client = new WPClient(api);

  async function fetcher<Response = {}>(url: string) {
    const response = await client.get<{}, Response>(url);

    return response;
  }

  return (
    <SWRConfig
      value={{
        fetcher
      }}
    >
      <SWRConfigContext.Provider
        value={{
          fetcher,
          client
        }}
      >
        {children}
      </SWRConfigContext.Provider>
    </SWRConfig>
  );
};

const useSWRConfigContext = () => useContext(SWRConfigContext);

export { SWRConfigProvider, useSWRConfigContext };
