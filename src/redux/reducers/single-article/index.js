import * as article from '../../actions/single-article/index';

const initialState = {
    articleRequest: false,
    articleSuccess: [],
    articleFailed: null,
    isSingleArticle: false,
}
const singleArticleReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case article.GET_SINGLE_ARTICLE_REQUEST:
            return{
                ...state,
                articleRequest: payload
            }
        case article.GET_SINGLE_ARTICLE_SUCCESS:
            return{
                ...state,
                articleSuccess: payload
            }
        case article.GET_SINGLE_ARTICLE_FAILED:
            return{
                ...state,
                articleFailed: payload
            }
        case article.IS_SINGLE_ARTICLE:
            return{
                ...state,
                isSingleArticle: payload
            }
        default:
            return state;
    }
}
export default singleArticleReducer;