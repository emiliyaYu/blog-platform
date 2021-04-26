import * as articles from '../../actions/articles/index';

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
        default:
            return state;

    }
}
export default articlesReducer;