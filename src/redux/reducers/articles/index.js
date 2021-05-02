import * as articles from '../../actions/articles/index';
import {FAVORITE_ARTICLE_ENTITIES, UN_FAVORITE_ARTICLE_ENTITIES} from "../../actions/favorites-article";

const initialState = {
    articlesStatus: null,
    articlesEntities: [],
    currentPage: 1
}

const articlesReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case articles.GET_ARTICLES_STATUS:
            return {
                ...state,
                articlesStatus: payload
            }
        case articles.GET_ARTICLES_ENTITIES:
            return {
                ...state,
                articlesEntities: payload
            }
        case articles.CURRENT_PAGE_OF_ARTICLES:
            return{
                ...state,
                currentPage: payload,
            }
        case FAVORITE_ARTICLE_ENTITIES:
            return {
                ...state,
                articlesEntities: state.articlesEntities.map((el) => {
                    let res = {...el};
                    const {article} = payload
                    if(res.slug === article.slug) {
                        res = article;
                    }
                    return res;
                })
            }
        case UN_FAVORITE_ARTICLE_ENTITIES:
            return {
                ...state,
                articlesEntities: state.articlesEntities.map((el) => {
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