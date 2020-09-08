import { useReducer } from 'react'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'

import UserContext from '../stores/UserContext'
import { userReducer, initialUserState } from '../stores/userReducer'

import { Game } from './Game'

const theme = {
  primary: '#642002',
  secondary: '#dd2211',
}

export const App = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={[state, dispatch]}>
        <Game />
        <GlobalStyle />
      </UserContext.Provider>
    </ThemeProvider>
  )
}
