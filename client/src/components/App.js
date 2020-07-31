import React, { useEffect, useRef } from 'react'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'

import { SocketProvider } from '../store/SocketContext'

import { Game } from './Game'

const theme = {
  primary: '#642002',
  secondary: '#dd2211',
}

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider url={'http://localhost:4000'}>
        <Game />
        <GlobalStyle />
      </SocketProvider>
    </ThemeProvider>
  )
}
