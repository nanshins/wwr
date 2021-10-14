import { VFC } from "react";
import { Helmet } from "react-helmet";
import { useSiteConfig } from "~/hooks/use-site-config";

type SEOProps = {
  title?: string;
};

const SEO: VFC<SEOProps> = ({ title }) => {
  const { siteTitle } = useSiteConfig();
  return <Helmet title={title ? `${title} | ${siteTitle}` : siteTitle} />;
};

export { SEO };
