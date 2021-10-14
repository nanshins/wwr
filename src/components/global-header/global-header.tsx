import { VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSiteConfig } from "~/hooks/use-site-config";
import { colors } from "~/styles/colors";

const Header = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  background-color: ${colors.white};
  height: 101px;
  border-bottom: 1px solid ${colors.almostWhite};
`;

const Nav = styled.nav`
  width: 100%;
  padding: 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;

  @media (max-width: 767px) {
    padding: 0 40px;
  }

  @media (max-width: 540px) {
    padding: 0 20px;
  }
`;

const LogoWrapper = styled.ul`
  flex-grow: 1;
`;

const LogoItem = styled.li`
  display: block;
`;

const LogoLink = styled(Link)`
  display: block;
  width: 48px;
  height: 48px;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
`;

const LinkItem = styled.li`
  display: block;
  margin-left: 20px;
`;

const NavLink = styled(Link)`
  display: block;
  color: ${colors.blue};
`;

const GlobalHeader: VFC = () => {
  const { staticUri } = useSiteConfig();
  return (
    <Header>
      <Nav>
        <LogoWrapper>
          <LogoItem>
            <LogoLink to="/">
              <img src={`${staticUri}/wordpress-logo.png`} />
            </LogoLink>
          </LogoItem>
        </LogoWrapper>
        <Links>
          <LinkItem>
            <NavLink to="/about">About</NavLink>
          </LinkItem>
          <LinkItem>
            <NavLink to="/contact">Contact</NavLink>
          </LinkItem>
        </Links>
      </Nav>
    </Header>
  );
};

export { GlobalHeader };
