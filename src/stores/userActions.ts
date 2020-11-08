export enum ActionType {
  UpdateDir = 'UPDATE_DIR',
}

interface IUpdateDir {
  type: ActionType.UpdateDir;
  dir: string;
}

export type UserActions = IUpdateDir;

export const updateDir = (dir: string): IUpdateDir => {
  return {
    type: ActionType.UpdateDir,
    dir,
  };
};
