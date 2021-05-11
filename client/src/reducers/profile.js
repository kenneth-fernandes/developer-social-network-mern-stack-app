import {
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
  REPOS_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };
    case REPOS_ERROR:
      return { ...state, error: payload, repos: [], loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false, repos: [] };
    case GET_REPOS:
      return { ...state, repos: payload, loading: false };
    default:
      return state;
  }
};

export default profileReducer;
