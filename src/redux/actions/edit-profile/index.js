import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";
import {getLoginUserSuccess} from "../login";
import {setUser} from "../../../services/local-storage";

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED = 'EDIT_PROFILE_FAILED';

export const editProfileRequest = createAction(EDIT_PROFILE_REQUEST, isLoad => isLoad);
export const editProfileSuccess = createAction(EDIT_PROFILE_SUCCESS, newUserData => newUserData);
export const editProfileFailed = createAction(EDIT_PROFILE_FAILED, isError => isError);

const updateUser = (userData, token) => async (dispatch) => {
    const api = new Api();
    dispatch(editProfileRequest(true));
    try {
        const request = await api.editProfile(userData, token);
        const {user} = request;
        dispatch(editProfileSuccess(user));
        dispatch(getLoginUserSuccess(user))
        setUser(user);
        dispatch(editProfileRequest(false));
        dispatch(editProfileFailed(false));
    }
    catch {
        dispatch(editProfileFailed(true));
    }
}
export default updateUser;