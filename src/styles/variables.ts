import { keyframes as styledKeyframes } from "styled-components";
export const keyframes = {
  fadein: styledKeyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `
} as const;
