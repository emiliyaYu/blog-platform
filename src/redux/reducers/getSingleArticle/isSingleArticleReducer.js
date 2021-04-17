import { handleActions } from 'redux-actions';
import {isSingleArticle} from "../../actions/getSingleArticles";

const initialState = false;
const updateSingleStatus = (state, {payload: isSingle}) => isSingle;
const handler = {
    [isSingleArticle] : updateSingleStatus,
}
const isSingleArticleReducer = handleActions(handler, initialState);
export default isSingleArticleReducer;