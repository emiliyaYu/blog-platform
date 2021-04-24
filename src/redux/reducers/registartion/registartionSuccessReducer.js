import * as registration from '../../actions/registration/index';

const initialState = {
    registrationRequest: false,
    registrationSuccess : [],
    registrationFailed: null,
};

const registrationReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case registration.REGISTRATION_REQUEST:
            return{
                ...state,
                registrationRequest: payload
            };
        case registration.REGISTRATION_SUCCESS:
            return{
                ...state,
                registrationSuccess: payload
            }
        case registration.REGISTRATION_FAILED:
            return{
                ...state,
                registrationFailed: payload
            }
        default:
            return state;
    }
}
export default registrationReducer;


