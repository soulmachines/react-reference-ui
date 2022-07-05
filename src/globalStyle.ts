// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import { createGlobalStyle } from 'styled-components';
import breakpoints from './utils/breakpoints';

const buttonSidePadding = '0.8rem';
const buttonVerticalPadding = '0.4rem';
const primaryAccent = 'blue';

export default createGlobalStyle`
  svg {
    vertical-align: -0.125em;
  }
  .btn {
    font-size: 1.2rem;
    @media (min-width: ${breakpoints.md}px) {
      font-size: 1.8rem;
      padding-top: ${buttonVerticalPadding};
      padding-bottom: ${buttonVerticalPadding};
      padding-right: ${buttonSidePadding};
      padding-left: ${buttonSidePadding};
    }
  }
  .form-control, .input-display, .captions {
    @media (min-width: ${breakpoints.md}px) {
      font-size: 1.8rem;
    }
  }
  .btn.primary-accent {
    border: 1px solid ${primaryAccent};
    background: ${primaryAccent};
    color: #FFF;
  }
`;
