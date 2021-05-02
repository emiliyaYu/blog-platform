import * as articles from '../../actions/single-article/index';
import {FAVORITE_ARTICLE_SUCCESS, UN_FAVORITE_ARTICLE_SUCCESS} from "../../actions/favorites-article";

const initialState = {
    articleRequest: false,
    articleSuccess: [],
    articleFailed: null,
    isSingleArticle: false,
}
const singleArticleReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case articles.GET_SINGLE_ARTICLE_REQUEST:
            return {
                ...state,
                articleRequest: payload
            }
        case articles.GET_SINGLE_ARTICLE_SUCCESS:
            return {
                ...state,
                articleSuccess: payload
            }
        case articles.GET_SINGLE_ARTICLE_FAILED:
            return {
                ...state,
                articleFailed: payload
            }
        case articles.IS_SINGLE_ARTICLE:
            return {
                ...state,
                isSingleArticle: payload
            }
        case FAVORITE_ARTICLE_SUCCESS: {
            if(state.articleSuccess.article.slug === payload.article.slug) {
                return {
                    ...state,
                    articleSuccess: payload,
                }
            }
            return state;
        }
        case UN_FAVORITE_ARTICLE_SUCCESS: {
            if(state.articleSuccess.article.slug === payload.article.slug) {
                return {
                    ...state,
                    articleSuccess: payload,
                }
            }
            return state;
        }
        default:
            return state;
    }
}
export default singleArticleReducer;