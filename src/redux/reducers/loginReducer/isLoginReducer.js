import {handleActions} from 'redux-actions';
import {isLogIn} from "../../actions/login";
import { setIsLogin } from '../../../services/local-storage';


const initialState = false;

const updateStatusLogin = (state, {payload: isLogin}) => {
    setIsLogin(isLogin)
    return isLogin;
}

const handler = {
    [isLogIn] : updateStatusLogin,
};

const isLoginReducer = handleActions(handler, initialState);
export default isLoginReducer;