import * as articles from '../../actions/articles/index';
import {FAVORITE_ARTICLE_SUCCESS, UN_FAVORITE_ARTICLE_SUCCESS} from "../../actions/favorites-article";


const initialState = {
    articlesRequest: false,
    articlesSuccess: [],
    articlesFailed: null,
    currentPage: 1
}

const articlesReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case articles.GET_ARTICLES_REQUEST:
            return{
                ...state,
                articlesRequest: payload,
            }
        case articles.GET_ARTICLES_SUCCESS:
            return{
                ...state,
                articlesSuccess: payload,
            }

        case articles.GET_ARTICLES_FAILED:
            return{
                ...state,
                articlesFailed: false,
            }
        case articles.CURRENT_PAGE_OF_ARTICLES:
            return{
                ...state,
                currentPage: payload,
            }
        case FAVORITE_ARTICLE_SUCCESS:
            return {
                ...state,
                articlesSuccess: state.articlesSuccess.map((el) => {
                    let res = {...el};
                    const {article} = payload
                    if(res.slug === article.slug) {
                        res = article;
                    }
                    return res;
                })
            }
        case UN_FAVORITE_ARTICLE_SUCCESS:
            return {
                ...state,
                articlesSuccess: state.articlesSuccess.map((el) => {
                    let res = {...el};
                    const {article} = payload
                    if(res.slug === article.slug) {
                        res = article;
                    }
                    return res;
                })
            }
        default:
            return state;

    }
}
export default articlesReducer;