import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";


export const LOGIN_STATUS = 'LOGIN_STATUS';
export const LOGIN_ENTITIES = 'LOGIN_ENTITIES';
export const LOG_IN = 'lOG_IN';
export const LOG_OUT = 'LOGOUT_SUCCESS'

export const getLoginUserStatus = createAction(LOGIN_STATUS, status => status);
export const getLoginUserEntities = createAction(LOGIN_ENTITIES, currentUser => currentUser);
export const isLogIn = createAction(LOG_IN, isLogin => isLogin);

export const logOutSuccess = createAction(LOG_OUT);

export const getLoginUser = (email, password) => async (dispatch) => {

    const api = new Api();

    dispatch(getLoginUserStatus('loading'));
    dispatch(isLogIn(false));

    try {

     const request = await api.login(email, password);
     const {user} = request
     dispatch(getLoginUserEntities(user));
     dispatch(getLoginUserStatus('success'));
     dispatch(isLogIn(true));

    }
    catch {
        dispatch(getLoginUserStatus('error'));
        dispatch(isLogIn(false));
    }
}
