export const initialUserState = {
  dir: 'SE',
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'UPDATE_DIR':
      const { dir } = action
      return {
        ...state,
        dir,
      }
    default: {
      console.error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
