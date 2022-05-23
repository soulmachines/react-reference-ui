import { createGlobalStyle } from 'styled-components';
import { primaryAccent } from './config';
import breakpoints from './utils/breakpoints';

const buttonSidePadding = '0.8rem';
const buttonVerticalPadding = '0.4rem';

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
  .text-button {
    padding: 0;

    background: none;
    border: none;
    color: rgb(33, 37, 41);
    text-decoration: underline;
  }
  .primary-accent, h1, h2 {
    color: ${primaryAccent};
  }
  .primary-accent.btn {
    color: #FFF;
    background: ${primaryAccent};
  }
  .primary-accent-outline.btn {
    border: 1px solid ${primaryAccent};
    color: ${primaryAccent}
  }
`;
