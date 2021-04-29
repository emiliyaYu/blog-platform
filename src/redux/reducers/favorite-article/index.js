import * as favorite from '../../actions/favorites-article/index';

const initialState = {
    favoriteArticleRequest: false,
    favoriteArticleSuccess: [],
    favoriteArticleFailed: null,
    unFavoriteArticleRequest: false,
    unFavoriteArticleSuccess: [],
    unFavoriteArticleFailed: null,
}

const favoritesArticleReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case favorite.FAVORITE_ARTICLE_REQUEST:
            return{
                ...state,
                favoriteArticleRequest: payload
            }
        case favorite.FAVORITE_ARTICLE_SUCCESS:
            return{
                ...state,
                favoriteArticleSuccess: payload,
            }
        case favorite.FAVORITE_ARTICLE_FAILED:
            return{
                ...state,
                favoriteArticleFailed: payload
            }
        case favorite.UN_FAVORITE_ARTICLE_REQUEST:
            return {
                ...state,
                unFavoriteArticleRequest: payload
            }
        case favorite.UN_FAVORITE_ARTICLE_SUCCESS:
            return {
                ...state,
                unFavoriteArticleSuccess: payload
            }
        case favorite.UN_FAVORITE_ARTICLE_FAILED:
            return {
                ...state,
                unFavoriteArticleFailed: payload
            }
        default:
            return state;
    }
}
export default favoritesArticleReducer;
