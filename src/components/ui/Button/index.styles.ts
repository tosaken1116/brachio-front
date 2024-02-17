import { css } from "hono/css";

export const buttonClass = css`
  border-radius: 4px;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  transition-property: background-color;
  transition-duration: 0.2s;
  cursor: pointer;
`;

export const disabledStyle = css`
  cursor: auto;
`;
export const disabledOutline = css`
  border: 2px solid gray;
  color: gray;
  &:hover {
    background-color: transparent;
  }
`;

export const disabledContain = css`
  background-color: gray;
  color: white;
  &:hover {
    background-color: gray;
  }
`;

export const disabledText = css`
  color: gray;
  &:hover {
    background-color: transparent;
  }
`;

export const outline = css`
  border: 2px solid var(--primary-main);
  color: var(--primary-main);
  &:hover {
    background-color: var(--primary-transparent);
  }
`;

export const contain = css`
  background-color: var(--primary-main);
  color: white;
  &:hover {
    background-color: var(--primary-dark);
  }
`;

export const text = css`
  color: var(--primary-main);
  &:hover {
    background-color: var(--primary-transparent);
  }
`;
