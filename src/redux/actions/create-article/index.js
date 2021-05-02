import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const CREATE_ARTICLE_STATUS = 'CREATE_ARTICLE_STATUS';
export const CREATE_ARTICLE_ENTITIES = 'CREATE_ARTICLE_ENTITIES';

export const createArticleStatus = createAction(CREATE_ARTICLE_STATUS, status => status);
export const createArticleEntities = createAction(CREATE_ARTICLE_ENTITIES, newArticle => newArticle);

export const createNewArticle = (newArticle) => async (dispatch) => {
    const api = new Api();
    dispatch(createArticleStatus('loading'));
    try{
        const request = await api.createArticle(newArticle);
        const {article} = request;
        dispatch(createArticleEntities(article));
        dispatch(createArticleStatus('success'));
    }
    catch {
        dispatch(createArticleStatus('error'));
    }
}
