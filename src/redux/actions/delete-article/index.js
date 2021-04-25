import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILED = 'DELETE_ARTICLE_FAILED';

export const deleteArticleRequest = createAction(DELETE_ARTICLE_REQUEST, isLoad=>isLoad);
export const deleteArticleSuccess = createAction(DELETE_ARTICLE_SUCCESS, isSuccess=>isSuccess)
export const deleteArticleFailed = createAction(DELETE_ARTICLE_FAILED, isError=>isError);

export const deleteArticle = (slug, token) => async (dispatch) => {
    const api = new Api();
    dispatch(deleteArticleRequest(true));
    try {
       await api.deleteArticle(slug, token);
       dispatch(deleteArticleSuccess(true));
       dispatch(deleteArticleRequest(false));
       dispatch(deleteArticleFailed(false))

    }
    catch {
        dispatch(deleteArticleRequest(false));
        dispatch(deleteArticleFailed(true));
        dispatch(deleteArticleSuccess(false));
    }
}