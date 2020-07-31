import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    margin: 0;
  }

  html {
    /* Include padding and border in all elements' total width and height. */
    box-sizing: border-box;

    background-color: black;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`
