export let ActionType

;(function (ActionType) {
  ActionType['UpdateDir'] = 'UPDATE_DIR'
})(ActionType || (ActionType = {}))

export const updateDir = (dir) => {
  return {
    type: ActionType.UpdateDir,
    dir,
  }
}
