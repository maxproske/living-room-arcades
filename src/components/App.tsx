import { ThemeProvider } from 'styled-components';

import { Game } from './Game';

const theme = {
  primary: '#642002',
  secondary: '#dd2211',
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
};
