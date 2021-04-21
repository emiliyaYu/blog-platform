import { handleActions } from "redux-actions";
import {getLoginUserSuccess} from "../../actions/login";
import {setUser} from "../../../services/local-storage";


const initialState = [];

const getLoginUser = (state, {payload: currentUser}) =>{
    setUser(currentUser);
    return {
        currentUser
    }
};

const handler = {
    [getLoginUserSuccess] : getLoginUser,
}

const loginSuccessReducer = handleActions(handler, initialState);
export default loginSuccessReducer;