import { Fragment, ReactNode, useEffect, useState, VFC } from "react";
import { withRouter, RouteComponentProps } from "react-router";

type ScrollToTopProps = RouteComponentProps & {
  children: ReactNode;
};

const ScrollToTopComp: VFC<ScrollToTopProps> = ({ history, children }) => {
  const [prevLocation, setPrevLocation] = useState<string>();
  const [prevScrollTop, setPrevScrollTop] = useState<number>(0);
  useEffect(() => {
    const unlisten = history.listen(() => {
      if (
        history.action === "REPLACE" &&
        prevLocation &&
        history.location.pathname === prevLocation
      ) {
        setPrevScrollTop(window.scrollY);
        setPrevLocation(history.location.pathname);
        return;
      }
      if (history.action !== "POP") {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, prevScrollTop);
      }
      setPrevScrollTop(window.scrollY);
      setPrevLocation(history.location.pathname);
    });

    return () => {
      unlisten();
    };
  }, []);
  return <Fragment>{children}</Fragment>;
};

export const ScrollToTop = withRouter(ScrollToTopComp);
