import { lazy, Suspense, VFC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/layout";
import { ScrollToTop } from "./components/scroll-to-top";
import { AppProviders } from "./hooks/app-providers";
import { SiteConfigContext } from "./hooks/use-site-config";

const GlobalHeader = lazy(
  () => import(/* webpackPrefetch: true */ "./components/global-header")
);
const SiteFooter = lazy(
  () => import(/* webpackPrefetch: true */ "./components/site-footer")
);
const Homepage = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/homepage")
);
const About = lazy(() => import(/* webpackPrefetch: true */ "./pages/about"));
const Post = lazy(() => import(/* webpackPrefetch: true */ "./pages/post"));
const Contact = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/contact")
);
const NotFound = lazy(() => import("./pages/404"));

const App: VFC = () => {
  return (
    <AppProviders>
      <SiteConfigContext.Consumer>
        {({ baseUrl }) => {
          return (
            <Suspense fallback="">
              <BrowserRouter basename={baseUrl}>
                <ScrollToTop>
                  <GlobalHeader />
                  <Layout>
                    <Switch>
                      <Route exact path="/" component={Homepage} />
                      <Route exact path="/about" component={About} />
                      <Route exact path="/contact" component={Contact} />
                      <Route exact path="/posts/:id" component={Post} />
                      <Route component={NotFound} />
                    </Switch>
                  </Layout>
                  <SiteFooter />
                </ScrollToTop>
              </BrowserRouter>
            </Suspense>
          );
        }}
      </SiteConfigContext.Consumer>
    </AppProviders>
  );
};

export default App;
