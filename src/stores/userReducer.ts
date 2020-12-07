import { IUserState } from '~/stores/UserProvider';
import { UserActions } from '~/stores/userActions';

export const initialUserState: IUserState = {
  dir: 'NW',
};

export const userReducer = (
  state: IUserState,
  action: UserActions
): IUserState => {
  const { type, dir } = action;

  switch (type) {
    case 'UPDATE_DIR':
      return {
        ...state,
        dir,
      };
    default: {
      console.error(`Unhandled action type: ${type}`);
      return state;
    }
  }
};
