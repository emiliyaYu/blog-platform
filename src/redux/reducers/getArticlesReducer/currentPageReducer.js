import { handleActions } from 'redux-actions';
import {setCurrentPage} from "../../actions/articles";

const initialState = 1;
const updateCurrentPage = (state, {payload: page}) => page;

const handler = {
    [setCurrentPage] : updateCurrentPage,
}
const currentPageReducer = handleActions(handler, initialState);
export default currentPageReducer;