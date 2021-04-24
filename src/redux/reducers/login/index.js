import * as login from '../../actions/login/index'
import {setUser, setIsLogin} from "../../../services/local-storage";

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
            setUser(payload);
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
            setIsLogin(payload)
            return{
                ...state,
                isLogin: payload
            }
        default:
            return state;

    }
}
export default loginReducer;