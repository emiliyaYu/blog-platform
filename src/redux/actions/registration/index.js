import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';


export const registrationRequest = createAction(REGISTRATION_REQUEST, isLoad => isLoad);
export const registrationSuccess = createAction(REGISTRATION_SUCCESS, user => user);
export const registrationFailed = createAction(REGISTRATION_FAILED, isError => isError);

export const getUser = (username, email, password) => async (dispatch) => {
    const api = new Api();
    dispatch(registrationRequest(true));
    try {
        const request = await api.registration(username, email, password);
        const {user} = request;
        dispatch(registrationSuccess(user));
        dispatch(registrationRequest(false));
        dispatch(registrationFailed(false))
    }
    catch {
        dispatch(registrationFailed(true));
        dispatch(registrationRequest(false));
    }
}
