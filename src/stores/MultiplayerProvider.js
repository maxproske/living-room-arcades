import { createContext, useReducer, useContext, useMemo } from 'react'

const initialState = {
  allPlayerPos: {},
}

export const MultiplayerContext = createContext(initialState)

MultiplayerContext.displayName = 'MultiplayerContext'

function reducer(state, action) {
  switch (action.type) {
    case `UPDATE_ALL_PLAYER_POS`:
      return {
        ...state,
        allPlayerPos: {
          ...state.allPlayerPos,
          [action.socketId]: {
            pos: action.pos,
          },
        },
      }
    case `REMOVE_PLAYER_POS`:
      delete state.allPlayerPos[action.socketId]
      return {
        ...state,
      }

    default: {
      console.error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}

export const MultiplayerProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateAllPlayerPos = ({ socketId, pos }) => dispatch({ type: 'UPDATE_ALL_PLAYER_POS', socketId, pos })
  const removePlayerPos = ({ socketId }) => dispatch({ type: 'REMOVE_PLAYER_POS', socketId })

  const value = useMemo(
    () => ({
      ...state,
      updateAllPlayerPos,
      removePlayerPos,
    }),
    [state]
  )

  return <MultiplayerContext.Provider value={value} {...props} />
}

export const useMultiplayerStore = () => {
  const context = useContext(MultiplayerContext)
  if (context === undefined) {
    throw new Error(`useMultiplayerStore must be used within an MultiplayerProvider`)
  }
  return context
}

export const ManagedMultiplayerContext = ({ children }) => <MultiplayerProvider>{children}</MultiplayerProvider>
