import { css } from 'styled-components';

export const Vertical = css`
  &::before { content: ''; display: inline-block; height: 100%; vertical-align: middle; }
  & > span { display: inline-block; vertical-align: middle; }
`;