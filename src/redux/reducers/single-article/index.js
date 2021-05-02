import * as articles from '../../actions/single-article/index';

const initialState = {
    articleStatus: null,
    articleEntities: [],
}
const singleArticleReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case articles.GET_SINGLE_ARTICLE_STATUS:
            return {
                ...state,
                articleStatus: payload
            }
        case articles.GET_SINGLE_ARTICLE_ENTITIES:
            return {
                ...state,
                articleEntities: payload
            }
        default:
            return state;
    }
}
export default singleArticleReducer;