import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const GET_ARTICLES_STATUS = 'GET_ARTICLES_REQUEST'
export const GET_ARTICLES_ENTITIES = 'GET_ARTICLES_ENTITIES';


export const CURRENT_PAGE_OF_ARTICLES = 'CURRENT_PAGE_OF_ARTICLES';

export const getArticlesStatus = createAction(GET_ARTICLES_STATUS, status => status);
export const getArticlesEntities = createAction(GET_ARTICLES_ENTITIES, articles => articles);

export const setCurrentPage = createAction(CURRENT_PAGE_OF_ARTICLES, page => page);

export const updateArticlesList = (key, offset) => async (dispatch) => {
    const api = new Api();
    dispatch(getArticlesStatus('loading'))
    try {
        const request = await api.getListOfArticles(key, offset);
        const { articles } = request
        dispatch(getArticlesEntities(articles));
        dispatch(getArticlesStatus('success'));
    }
    catch {
        dispatch(getArticlesStatus('error'))
    }

}