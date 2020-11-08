// https://blog.harveydelaney.com/creating-your-own-mini-redux-in-react
import { useReducer, createContext, useContext } from 'react';
import { UserActions } from '~/stores/userActions';
import { userReducer, initialUserState } from '~/stores/userReducer';

export interface IUserState {
  dir: string | null;
}

export interface IUserContext {
  state: IUserState;
  dispatch: React.Dispatch<UserActions>;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): any => useContext(UserContext);
