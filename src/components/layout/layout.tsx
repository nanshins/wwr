import { ReactNode, VFC } from "react";
import styled from "styled-components";

const Root = styled.main``;

type LayoutProps = {
  children: ReactNode;
};

const Layout: VFC<LayoutProps> = ({ children }) => {
  return <Root id="main-content">{children}</Root>;
};

export { Layout };
