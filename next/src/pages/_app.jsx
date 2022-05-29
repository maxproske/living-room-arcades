import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '~/components/GlobalStyle'
import { ManagedMultiplayerContext } from '~/stores/MultiplayerProvider'
import { UserProvider } from '~/stores/UserProvider'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={{}}>
      <ManagedMultiplayerContext>
        <UserProvider>
          <Component {...pageProps} />
          <GlobalStyle />
        </UserProvider>
      </ManagedMultiplayerContext>
    </ThemeProvider>
  )
}

export default App
