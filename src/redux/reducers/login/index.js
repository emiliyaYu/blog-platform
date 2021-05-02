import * as login from '../../actions/login/index'
import localStorageService from "../../../services/local-storage";

const initialState = {
    loginStatus: null,
    loginEntities: [],
    isLogin: false
}
const loginReducer = (state= initialState, {type, payload}) => {
    switch(type){
        case login.LOGIN_STATUS:

            return{
                ...state,
                loginStatus: payload
            }
        case login.LOGIN_ENTITIES:
            localStorageService().set('user', payload);
            return{
                ...state,
                loginEntities: payload
            }
        case login.LOG_IN:
            localStorageService().set('isLogin', payload)
            return{
                ...state,
                isLogin: payload
            }
        case login.LOG_OUT :
            localStorageService().remove('user');
            localStorageService().set('isLogin', false);
            return {
                ...state,
                isLogin: false
            }
        default:
            return state;

    }
}
export default loginReducer;