import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const FAVORITE_ARTICLE_STATUS = 'FAVORITE_ARTICLE_STATUS';
export const FAVORITE_ARTICLE_ENTITIES= 'FAVORITE_ARTICLE_ENTITIES';

export const UN_FAVORITE_ARTICLE_STATUS = 'UN_FAVORITE_ARTICLE_STATUS';
export const UN_FAVORITE_ARTICLE_ENTITIES = 'UN_FAVORITE_ARTICLE_ENTITIES';


export const favoriteArticleStatus = createAction(FAVORITE_ARTICLE_STATUS, status => status);
export const favoriteArticleEntities = createAction(FAVORITE_ARTICLE_ENTITIES, newArticle => newArticle);

export const unFavoriteArticleStatus = createAction(UN_FAVORITE_ARTICLE_STATUS, status => status);
export const unFavoriteArticleEntities = createAction(UN_FAVORITE_ARTICLE_ENTITIES, newArticle => newArticle);


export const favoriteArticle = (slug) => async (dispatch) => {
    const api = new Api();
    dispatch(favoriteArticleStatus('loading'));
    try{
        const request = await api.likedArticle(slug);
        dispatch(favoriteArticleEntities(request));
        dispatch(favoriteArticleStatus('success'));
    }
    catch{
        dispatch(favoriteArticleStatus('error'));
    }
}

export const unFavoriteArticle = (slug, token) => async (dispatch) => {
    const api = new Api();
    dispatch(unFavoriteArticleStatus('loading'));
    try{
        const request = await api.unLickedArticle(slug, token);

        dispatch(unFavoriteArticleEntities(request));
        dispatch(unFavoriteArticleStatus('success'));
    }
    catch {
        dispatch(unFavoriteArticleStatus('error'));
    }
}
