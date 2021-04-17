import { handleActions } from 'redux-actions';
import {getSingleArticleSuccess} from "../../actions/getSingleArticles";

const initialState = {
    currentArticle: []
}
const updateArticle = (state, {payload: article}) => ({currentArticle: article});

const handler = {
    [getSingleArticleSuccess] : updateArticle,
}

const getSingleArticleSuccessReducer = handleActions(handler, initialState);

export default getSingleArticleSuccessReducer;