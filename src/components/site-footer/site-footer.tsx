import { VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "~/styles/colors";

const Root = styled.footer`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  background-color: ${colors.white};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 80px;

  @media (max-width: 767px) {
    padding: 0 40px;
  }

  @media (max-width: 540px) {
    padding: 0 20px;
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 15px 0;
  background-color: ${colors.almostWhite};
`;

const TopWrapper = styled.div`
  padding: 60px 120px;

  @media (max-width: 1079px) {
    padding: 0;
  }
`;

const TopList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 40px 0;
  }
`;

const TopItem = styled.li`
  width: 50%;
  display: flex;
  margin-top: 20px;

  &:nth-child(-n + 2) {
    margin-top: 0;
  }

  @media (max-width: 767px) {
    width: 100%;

    &:nth-child(-n + 2) {
      margin-top: 20px;
    }

    &:first-child {
      margin-top: 0;
    }
  }
`;

const FooterLink = styled(Link)`
  font-weight: 400;
  font-size: 14px;
  color: #484848;
`;

const BottomWrapper = styled.div`
  padding: 60px 0;

  @media (max-width: 1079px) {
    padding: 30px 0;
  }
`;

const Copyright = styled.p`
  font-size: 13px;
`;

const SiteFooter: VFC = () => {
  return (
    <Root>
      <Container>
        <Divider />
        <TopWrapper>
          <TopList>
            <TopItem>
              <FooterLink to="/">Home</FooterLink>
            </TopItem>
            <TopItem>
              <FooterLink to="/about">About Us</FooterLink>
            </TopItem>
            <TopItem>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </TopItem>
          </TopList>
        </TopWrapper>
        <Divider />
        <BottomWrapper>
          <Copyright>Powered by WordPress.</Copyright>
        </BottomWrapper>
      </Container>
    </Root>
  );
};

export { SiteFooter };
