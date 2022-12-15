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

  body {
    background-color: var(--c-gray-700);
  }
`;

export default GlobalStyles;
