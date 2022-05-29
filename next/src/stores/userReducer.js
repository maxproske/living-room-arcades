export const initialUserState = {
  dir: 'NW',
}

export const userReducer = (state, action) => {
  const { type, dir } = action

  switch (type) {
    case 'UPDATE_DIR':
      return {
        ...state,
        dir,
      }
    default: {
      console.error(`Unhandled action type: ${type}`)
      return state
    }
  }
}
