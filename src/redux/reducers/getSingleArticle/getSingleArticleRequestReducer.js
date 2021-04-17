import { handleActions } from "redux-actions";
import {getSingleArticleRequest} from "../../actions/getSingleArticles";

const initialState = true;

const updateRequest = (state, {payload: isLoad}) => isLoad;

const handler = {
    [getSingleArticleRequest] : updateRequest,
}

const getSingleArticleRequestReducer = handleActions(handler, initialState);

export default getSingleArticleRequestReducer;

