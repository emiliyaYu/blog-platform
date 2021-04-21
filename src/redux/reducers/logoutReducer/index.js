import {handleActions} from 'redux-actions';
import setLogOutSuccess from "../../actions/logout";

const initialState = false;
const updateLogOutStatus = (state, {payload:isLogOut}) => isLogOut;
const handler = {
    [setLogOutSuccess] : updateLogOutStatus
}
const logOutReducer = handleActions(handler, initialState);
export default logOutReducer;