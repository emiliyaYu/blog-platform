import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";
import {getSingleArticleEntities} from "../single-article";

export const EDIT_ARTICLE_STATUS = 'EDIT_ARTICLE_STATUS';

export const editArticleStatus = createAction(EDIT_ARTICLE_STATUS, status => status);

export const updateArticle = (slug, data) => async (dispatch) => {
    const api = new Api();

    dispatch(editArticleStatus('loading'));
    try{
        const request = await api.editArticle(data, slug);
        dispatch(getSingleArticleEntities(request));
        dispatch(editArticleStatus('success'));

    }
    catch{
        dispatch(editArticleStatus('error'));
    }
}
