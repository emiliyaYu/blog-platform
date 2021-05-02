import * as registration from '../../actions/registration/index';

const initialState = {
    registrationStatus: null,
    registrationEntities : [],
};

const registrationReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case registration.REGISTRATION_STATUS:
            return{
                ...state,
                registrationStatus: payload
            };
        case registration.REGISTRATION_ENTITIES:
            return{
                ...state,
                registrationEntities: payload
            }
        default:
            return state;
    }
}
export default registrationReducer;
