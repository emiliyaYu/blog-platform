import * as articles from '../../actions/single-article/index';

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
        default:
            return state;
    }
}
export default singleArticleReducer;