import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILED = 'CREATE_ARTICLE_FAILED';

export const createArticleRequest = createAction(CREATE_ARTICLE_REQUEST, isLoad=>isLoad);
export const createArticleSuccess = createAction(CREATE_ARTICLE_SUCCESS, newArticle=>newArticle);
export const createArticleFailed = createAction(CREATE_ARTICLE_FAILED, isError=>isError);

export const createNewArticle = (newArticle, token) => async (dispatch) => {
    const api = new Api();
    dispatch(createArticleRequest(true));
    try{
        const request = await api.createArticle(newArticle, token);
        const {article} = request;
        dispatch(createArticleSuccess(article));
        dispatch(createArticleRequest(false));
        dispatch(createArticleFailed(false));
    }
    catch {
        dispatch(createArticleFailed(true));
        dispatch(createArticleRequest(false));
    }
}
