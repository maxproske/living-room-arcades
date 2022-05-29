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



  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }



  figure {
    margin: 0;
  }



  img {
    width: 100%;
  }
`
