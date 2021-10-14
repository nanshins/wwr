import { Fragment, VFC } from "react";
import styled from "styled-components";
import { Section } from "~/components/section";
import { SEO } from "~/components/seo";
import { colors } from "~/styles/colors";
import { keyframes } from "~/styles/variables";

const ModifiedSection = styled(Section)`
  min-height: calc(100vh - 101px);
  background-color: ${colors.blue};
  display: flex;
  align-items: flex-end;
  animation: ${keyframes.fadein} 200ms ease;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 40px;
`;

const About: VFC = () => {
  return (
    <Fragment>
      <SEO title="About us" />
      <ModifiedSection>
        <Title>About us.</Title>
      </ModifiedSection>
    </Fragment>
  );
};

export { About };
