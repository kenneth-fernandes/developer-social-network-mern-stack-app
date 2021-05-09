import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

// Combines all reduces created
export default combineReducers({ alert, auth });
