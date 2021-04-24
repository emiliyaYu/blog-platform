import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOG_IN = 'lOG_IN';

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
