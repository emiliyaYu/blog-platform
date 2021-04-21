import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";


const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOG_IN = 'lOG_IN';

export const getLoginUserRequest = createAction(LOGIN_REQUEST, isLoad => isLoad);
export const getLoginUserSuccess = createAction(LOGIN_SUCCESS, currentUser => currentUser);
export const getLoginUserFailed = createAction(LOGIN_FAILED, isError => isError);
export const isLogIn = createAction(LOG_IN, isLogin => isLogin);

export const getLoginUser = (email, password) => async (dispatch) => {

    const api = new Api();

    dispatch(getLoginUserRequest(true));
    dispatch(isLogIn(false));

    try {

     const request = await api.login(email, password);
     const {user} = request
     dispatch(getLoginUserSuccess(user));
     dispatch(getLoginUserRequest(false));
     dispatch(getLoginUserFailed(false));
     dispatch(isLogIn(true));

    }
    catch {
        dispatch(getLoginUserFailed(true));
        dispatch(getLoginUserRequest(false));
        dispatch(isLogIn(false));
    }
}
