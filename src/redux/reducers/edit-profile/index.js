import {EDIT_PROFILE_ENTITIES, EDIT_PROFILE_STATUS} from "../../actions/edit-profile";

const initialState = {
    editProfileStatus: null,
    editProfileEntities: [],
}

const updateEditProfile = (state = initialState, action) => {

   switch (action.type) {
       case EDIT_PROFILE_STATUS:
           return {
               ...state,
               editProfileStatus: action.payload,
           };
       case EDIT_PROFILE_ENTITIES :
           return {
               ...state,
               editProfileEntities: action.payload
           }
       default:
           return state;
   }
}
export default updateEditProfile;