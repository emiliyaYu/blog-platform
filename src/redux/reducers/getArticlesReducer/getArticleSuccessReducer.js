import { handleActions } from 'redux-actions';
import {getArticlesSuccess} from "../../actions/articles";

const articlesState = {
    articlesList: []
}
const updateArticleList = (state, {payload: articlesData}) => ({
        ...state,
        articlesList: articlesData
    })
const handler = {
    [getArticlesSuccess] : updateArticleList,
}
const getArticleSuccessReducer = handleActions(handler, articlesState);
export default getArticleSuccessReducer;
