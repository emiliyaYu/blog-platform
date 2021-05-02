import * as favorite from '../../actions/favorites-article/index';

const initialState = {
    favoriteArticleStatus: null,
    favoriteArticleEntities: [],
    unFavoriteArticleStatus: null,
    unFavoriteArticleEntities: [],
}

const favoritesArticleReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case favorite.FAVORITE_ARTICLE_STATUS:
            return{
                ...state,
                favoriteArticleStatus: payload
            }
        case favorite.FAVORITE_ARTICLE_ENTITIES:
            return{
                ...state,
                favoriteArticleEntities: payload,
            }
        case favorite.UN_FAVORITE_ARTICLE_STATUS:
            return {
                ...state,
                unFavoriteArticleStatus: payload
            }
        case favorite.UN_FAVORITE_ARTICLE_ENTITIES:
            return {
                ...state,
                unFavoriteArticleStatus: payload
            }
        default:
            return state;
    }
}
export default favoritesArticleReducer;
