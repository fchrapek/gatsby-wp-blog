import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --c-white: #FFF;
    --c-gray-600: #302E2B;
    --c-gray-700: #27231F;
    --c-gray-800: #1B1A19;
    --c-mint-100: #A6C2BD;
    --c-mint-200: #D0F1ED;
    --c-heading: var(--c-mint-200);
    --c-text: var(--c-mint-100);
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  
  body {
    background-color: var(--c-gray-700);
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;
