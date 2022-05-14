// https://blog.harveydelaney.com/creating-your-own-mini-redux-in-react
import { useReducer, createContext, useContext } from 'react'
import { userReducer, initialUserState } from '~/stores/userReducer'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
