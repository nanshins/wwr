import { Fragment, VFC } from "react";
import styled from "styled-components";
import { Section } from "~/components/section";
import { SEO } from "~/components/seo";
import { colors } from "~/styles/colors";

const ModifiedSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 72px;
  line-height: 0.9;
  font-weight: 400;
  margin-bottom: 61px;
`;

const Text = styled.p``;

const NotFound: VFC = () => {
  return (
    <Fragment>
      <SEO title="Not Found" />
      <ModifiedSection backgroundColor={colors.almostWhite}>
        <Title>Page Not Found</Title>
        <Text>
          Sorry, it appears that the page you requested doesn&apos;t exist
          anymore and cannot be found.
        </Text>
      </ModifiedSection>
    </Fragment>
  );
};

export { NotFound };
