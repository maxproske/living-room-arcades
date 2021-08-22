import { createContext, useReducer, useContext, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from '~/stores/UserProvider';

const initialContextState = {
  setup: () => ({
    cells: [],
  }),
};

export const Context = createContext(initialContextState);

Context.displayName = 'Context';

function contextReducer(state, action) {
  const { userId } = action;

  switch (action.type) {
    case `UPDATE_USER_ID`:
      return {
        ...state,
        userId,
      };
    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(contextReducer, initialContextState);

  const updateUserId = (userId) => dispatch({ type: 'UPDATE_USER_ID', userId });

  const value = useMemo(
    () => ({
      ...state,
      updateUserId,
    }),
    [state]
  );

  return <Context.Provider value={value} {...props} />;
};

export const useManagedContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }

  return context;
};

export const ManagedContext = ({ children }) => (
  <ContextProvider>
    <ThemeProvider theme={{}}>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  </ContextProvider>
);
