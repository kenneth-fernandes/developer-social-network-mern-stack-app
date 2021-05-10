import {
  CLEAR_PROFILE,
  GET_PROILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false, repos: [] };
    default:
      return state;
  }
};
