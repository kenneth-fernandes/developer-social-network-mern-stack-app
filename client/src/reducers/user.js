import { UPDATE_USER_AVATAR, ERROR_USER_AVATAR } from '../actions/types';
const initialState = {
  loading: true,
  auth: null,
};
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_AVATAR:
      return { ...state, loading: false, auth: { user: payload } };
    case ERROR_USER_AVATAR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default userReducer;
