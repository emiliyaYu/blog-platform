import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";
import {isSingleArticle} from "../single-article";

export const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST'
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAILED = 'GET_ARTICLES_FAILED';

export const CURRENT_PAGE_OF_ARTICLES = 'CURRENT_PAGE_OF_ARTICLES';

export const getArticlesRequest = createAction(GET_ARTICLES_REQUEST, isLoad => isLoad);
export const getArticlesSuccess = createAction(GET_ARTICLES_SUCCESS, articlesData => articlesData);
export const getArticlesFailed = createAction(GET_ARTICLES_FAILED, isError => isError);
export const setCurrentPage = createAction(CURRENT_PAGE_OF_ARTICLES, page => page);

export const updateArticlesList = (key, offset) => async (dispatch) => {
    const api = new Api();
    dispatch(getArticlesRequest(true))
    dispatch(getArticlesFailed(false));
    try{
        const request = await api.getListOfArticles(key, offset);
        dispatch(getArticlesSuccess(request));

        dispatch(getArticlesRequest(false));
        dispatch(isSingleArticle(false))
    }
    catch {
        dispatch(getArticlesRequest(false))
        dispatch(getArticlesFailed(true));
    }

}