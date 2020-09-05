import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'

import { Game } from './Game'

const theme = {
  primary: '#642002',
  secondary: '#dd2211',
}

export const App = () => {
  console.log('Rendered App')

  return (
    <ThemeProvider theme={theme}>
      <Game />
      <GlobalStyle />
    </ThemeProvider>
  )
}
