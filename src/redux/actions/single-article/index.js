import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const GET_SINGLE_ARTICLE_STATUS = 'GET_SINGLE_ARTICLES_STATUS'
export const GET_SINGLE_ARTICLE_ENTITIES = 'GET_SINGLE_ARTICLES_ENTITIES';

export const getSingleArticleStatus = createAction(GET_SINGLE_ARTICLE_STATUS, status => status);
export const getSingleArticleEntities = createAction(GET_SINGLE_ARTICLE_ENTITIES, article => article);

export const getArticle = (slug) => async (dispatch) => {
    const api = new Api();
    dispatch(getSingleArticleStatus('loading'));
    try {
        const request = await api.getSingleArticle(slug);
        dispatch(getSingleArticleEntities(request));
        dispatch(getSingleArticleStatus('success'));
    }
    catch{
        dispatch(getSingleArticleStatus('error'));
    }
}
