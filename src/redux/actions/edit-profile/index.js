import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";
import {getLoginUserEntities} from "../login";
import localStorageService from "../../../services/local-storage";

export const EDIT_PROFILE_STATUS = 'EDIT_PROFILE_STATUS';
export const EDIT_PROFILE_ENTITIES = 'EDIT_PROFILE_ENTITIES';


export const editProfileStatus = createAction(EDIT_PROFILE_STATUS, status => status);
export const editProfileEntities = createAction(EDIT_PROFILE_ENTITIES, newUserData => newUserData);

const updateUser = (userData) => async (dispatch) => {
    const api = new Api();
    dispatch(editProfileStatus('loading'));
    try {
        const request = await api.editProfile(userData);
        const {user} = request;
        dispatch(editProfileEntities(user));
        dispatch(getLoginUserEntities(user))
        localStorageService().set('user', user);
        dispatch(editProfileStatus('success'));
    }
    catch {
        dispatch(editProfileStatus('error'));
    }
}
export default updateUser;