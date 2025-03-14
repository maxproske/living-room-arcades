'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '~/components/GlobalStyle'
import { ManagedMultiplayerContext } from '~/stores/MultiplayerProvider'
import { UserProvider } from '~/stores/UserProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={{}}>
          <ManagedMultiplayerContext>
            <UserProvider>
              {children}
              <GlobalStyle />
            </UserProvider>
          </ManagedMultiplayerContext>
        </ThemeProvider>
      </body>
    </html>
  )
}
