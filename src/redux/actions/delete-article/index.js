import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const DELETE_ARTICLE_STATUS = 'DELETE_ARTICLE_STATUS';

export const deleteArticleStatus = createAction(DELETE_ARTICLE_STATUS, status => status);

export const deleteArticle = (slug) => async (dispatch) => {
    const api = new Api();
    dispatch(deleteArticleStatus('loading'));
    try {
       await api.deleteArticle(slug);
       dispatch(deleteArticleStatus('success'));

    }
    catch {
        dispatch(deleteArticleStatus('error'));
    }
}