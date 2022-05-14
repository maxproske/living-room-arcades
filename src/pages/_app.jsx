import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '~/components/GlobalStyle'
import { UserProvider } from '~/stores/UserProvider'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={{}}>
      <UserProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
