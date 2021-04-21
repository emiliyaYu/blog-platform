import {createAction} from 'redux-actions';

const  LOG_OUT_SUCCESS =  'LOG_OUT_SUCCESS';

const setLogOutSuccess = createAction(LOG_OUT_SUCCESS, isLogout=>isLogout);
export default setLogOutSuccess;

