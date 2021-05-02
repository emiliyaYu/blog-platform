import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";

export const FAVORITE_ARTICLE_REQUEST = 'FAVORITE_ARTICLE_REQUEST';
export const FAVORITE_ARTICLE_SUCCESS = 'FAVORITE_ARTICLE_SUCCESS';
export const FAVORITE_ARTICLE_FAILED = 'FAVORITE_ARTICLE_FAILED';

export const UN_FAVORITE_ARTICLE_REQUEST = 'UN_FAVORITE_ARTICLE_REQUEST';
export const UN_FAVORITE_ARTICLE_SUCCESS = 'UN_FAVORITE_ARTICLE_SUCCESS';
export const UN_FAVORITE_ARTICLE_FAILED = 'UN_FAVORITE_ARTICLE_FAILED';


export const favoriteArticleRequest = createAction(FAVORITE_ARTICLE_REQUEST, isLoad => isLoad);
export const favoriteArticleSuccess = createAction(FAVORITE_ARTICLE_SUCCESS, newArticle => newArticle);
export const favoriteArticleFailed = createAction(FAVORITE_ARTICLE_FAILED, isError => isError);

export const unFavoriteArticleRequest = createAction(UN_FAVORITE_ARTICLE_REQUEST, isLoad => isLoad);
export const unFavoriteArticleSuccess = createAction(UN_FAVORITE_ARTICLE_SUCCESS, newArticle => newArticle);
export const unFavoriteArticleFailed = createAction(UN_FAVORITE_ARTICLE_FAILED, isError => isError);


export const favoriteArticle = (slug) => async (dispatch) => {
    const api = new Api();
    dispatch(favoriteArticleRequest(true));
    try{
        const request = await api.likedArticle(slug);
        dispatch(favoriteArticleSuccess(request));
        dispatch(favoriteArticleRequest(false));
        dispatch(favoriteArticleFailed(false));
    }
    catch{
        dispatch(favoriteArticleRequest(false));
        dispatch(favoriteArticleFailed(true));
    }
}

export const unFavoriteArticle = (slug, token) => async (dispatch) => {
    const api = new Api();
    dispatch(unFavoriteArticleRequest(true));
    try{
        const request = await api.unLickedArticle(slug, token);

        dispatch(unFavoriteArticleSuccess(request));
        dispatch(unFavoriteArticleRequest(false));
        dispatch(unFavoriteArticleFailed(false));
    }
    catch {
        dispatch(unFavoriteArticleRequest(false));
        dispatch(unFavoriteArticleFailed(true));
    }
}
