import { EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILED } from "../../actions/edit-profile";

const initialState = {
    editProfileRequest: false,
    editProfileSuccess: [],
    editProfileFailed: null,
}

const updateEditProfile = (state = initialState, action) => {

   switch (action.type) {
       case EDIT_PROFILE_REQUEST:
           return {
               ...state,
               editProfileRequest: action.payload,
           };
       case EDIT_PROFILE_SUCCESS :
           return {
               ...state,
               editProfileSuccess: action.payload
           }
       case EDIT_PROFILE_FAILED :
           return {
               ...state,
               editProfileFailed : action.payload
           }
       default:
           return state;
   }
}
export default updateEditProfile;