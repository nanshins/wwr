import { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "~/styles/colors";
import { keyframes } from "~/styles/variables";

type RootProps = {
  $backgroundColor?: string;
  $animation?: string;
};
const Root = styled.section<RootProps>`
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ?? colors.white};
  animation: ${keyframes.fadein} 200ms ease;
  animation: ${({ $animation }) => ($animation ? $animation : "")};
  min-height: calc(100vh - 101px);
  padding: 60px 80px;

  @media (max-width: 767px) {
    padding: 60px 40px;
  }

  @media (max-width: 540px) {
    padding: 60px 20px;
  }
`;

type SectionProps = HTMLAttributes<HTMLElement> & {
  backgroundColor?: string;
  animation?: string;
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ backgroundColor, animation, ...props }, forwardedRef) => {
    return (
      <Root
        {...props}
        $backgroundColor={backgroundColor}
        $animation={animation}
        ref={forwardedRef}
      />
    );
  }
);

export { Section };
