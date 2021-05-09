import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

// Combines all reduces created
export default combineReducers({ alert, auth, profile });
