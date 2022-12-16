import { createGlobalStyle } from 'styled-components';
import { breakpoint } from "../styles/BreakPoints";
import font from '../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf';

const Typography = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  @font-face {
    font-family: SpaceGrotesk;
    src: url(${font});
    font-weight: 100 1000;
  }
  
  * {
    color: var(--c-mint-100);
    font-family: SpaceGrotesk, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    line-height: 2.6rem;
    font-weight: 300;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--c-mint-200);
    font-weight: 500;
  }

  h1 {
    font-size: 2.8rem;
    line-height: 3.8rem;

    @media ${breakpoint.md} { 
      font-size: 4rem;
      line-height: 4.8rem;
    }
  }

  h2 {
    font-size: 2.2rem;
    line-height: 3.2rem;

    @media ${breakpoint.md} { 
      font-size: 2.8rem;
      line-height: 3.6rem;
    }
  }

  a {
    text-decoration: none;
  }

  p {
    a {
      color: var(--c-mint-200);
      text-decoration: underline;
      text-underline-offset: 0.2rem;
    }
  }
`;

export default Typography;
