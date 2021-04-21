import { handleActions } from "redux-actions";
import {registrationSuccess} from "../../actions/registration";

const initialState = [];
const getUser = (state, {payload: user}) => user;

const handler = {
    [registrationSuccess] : getUser,
}

const registrationSuccessReducer = handleActions(handler,initialState);

export default registrationSuccessReducer;

