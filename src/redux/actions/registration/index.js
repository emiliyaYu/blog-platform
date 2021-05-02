import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const REGISTRATION_STATUS = 'REGISTRATION_STATUS';
export const REGISTRATION_ENTITIES = 'REGISTRATION_ENTITIES';

export const registrationStatus = createAction(REGISTRATION_STATUS, status => status);
export const registrationEntities = createAction(REGISTRATION_ENTITIES, user => user);

export const getUser = (username, email, password) => async (dispatch) => {
    const api = new Api();
    dispatch(registrationStatus('loading'));
    try {
        const request = await api.registration(username, email, password);
        const {user} = request;
        dispatch(registrationEntities(user));
        dispatch(registrationStatus('success'));
    }
    catch {
        dispatch(registrationStatus('error'));
    }
}
