import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

const GET_SINGLE_ARTICLE_REQUEST = 'GET_SINGLE_ARTICLES_REQUEST'
const GET_SINGLE_ARTICLE_SUCCESS = 'GET_SINGLE_ARTICLES_SUCCESS';
const GET_SINGLE_ARTICLE_FAILED = 'GET_SINGLE_ARTICLES_FAILED';
const IS_SINGLE_ARTICLE = 'IS_SINGLE_ARTICLE';

export const getSingleArticleRequest = createAction(GET_SINGLE_ARTICLE_REQUEST, isLoad => isLoad);
export const getSingleArticleSuccess = createAction(GET_SINGLE_ARTICLE_SUCCESS, article => article);
export const getSingleArticleFailed = createAction(GET_SINGLE_ARTICLE_FAILED, isError => isError);
export const isSingleArticle = createAction(IS_SINGLE_ARTICLE, isSingle => isSingle)

export const getArticle = (slug) => async (dispatch) => {
    const api = new Api();
    dispatch(getSingleArticleRequest(true));
    dispatch(getSingleArticleFailed(false));
    try {
        const request = await api.getSingleArticle(slug);
        dispatch(getSingleArticleSuccess(request));
        dispatch(getSingleArticleRequest(false));
        dispatch(isSingleArticle(true))
    }
    catch{
        dispatch(getSingleArticleFailed(true));
        dispatch(getSingleArticleRequest(false));
    }
}
