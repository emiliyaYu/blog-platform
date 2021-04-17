import {handleActions} from "redux-actions";
import {getArticlesRequest} from "../../actions/articles";

const initialState = true;

const updateRequest = (state, {payload:isLoad}) => isLoad;

const handler = {
    [getArticlesRequest] : updateRequest,
}

const getArticleRequestReducer = handleActions(handler, initialState);

export default getArticleRequestReducer;
