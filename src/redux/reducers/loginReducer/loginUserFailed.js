import { handleActions } from "redux-actions";
import {getLoginUserFailed} from "../../actions/login";

const initialState = null;

const updateStatusFailed = (state, {payload: isError}) => isError;

const handler = {
    [getLoginUserFailed] : updateStatusFailed,
}

const loginUserFailedReducer = handleActions(handler, initialState);

export default  loginUserFailedReducer;