import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
const REGISTRATION_FAILED = 'REGISTRATION_FAILED';


export const registrationRequest = createAction(REGISTRATION_REQUEST, isLoad => isLoad);
export const registrationSuccess = createAction(REGISTRATION_SUCCESS, user => user);
export const registrationFailed = createAction(REGISTRATION_FAILED, isError => isError);

export const getUser = (username, email, password) => async (dispatch) => {
    const api = new Api();
    dispatch(registrationRequest(true));
    dispatch(registrationFailed(false))
    try {
        const request = await api.registration(username, email, password);
        dispatch(registrationSuccess(request));
        dispatch(registrationRequest(false));
    }
    catch {
        dispatch(registrationFailed(true));
        dispatch(registrationRequest(false));
    }
}
