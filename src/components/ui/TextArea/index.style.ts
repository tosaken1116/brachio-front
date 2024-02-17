import { css } from "hono/css";

export const baseStyle = css`
  border-radius: 8px;
  min-height: 60px;
  padding: 8px;
  border-width: 1px;
  outline: none;
  &:focus-visible {
    border-width: 2px;
    border-color: var(--primary-main);
    outline: none;
  }
`;
