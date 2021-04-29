import * as login from '../../actions/login/index'
import {removeItem, setItem} from "../../../services/local-storage";

const initialState = {
    loginRequest: false,
    loginSuccess: [],
    loginFailed: null,
    isLogin: false
}
const loginReducer = (state= initialState, {type, payload}) => {
    switch(type){
        case login.LOGIN_REQUEST:

            return{
                ...state,
                loginRequest: payload
            }
        case login.LOGIN_SUCCESS:
            setItem('user',payload);
            return{
                ...state,
                loginSuccess: payload
            }
        case login.LOGIN_FAILED:
            return{
                ...state,
                loginFailed: payload
            }
        case login.LOG_IN:
            setItem('isLogin', payload)
            return{
                ...state,
                isLogin: payload
            }
        case login.LOG_OUT :
            removeItem('user');
            setItem('isLogin', false);
            return {
                ...state,
                isLogin: false
            }
        default:
            return state;

    }
}
export default loginReducer;