import * as create from '../../actions/create-article/index';

const initialState = {
    createArticleRequest: false,
    createArticleSuccess: [],
    createArticleFailed: null,
}
const createArticleReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case create.CREATE_ARTICLE_REQUEST:
            return{
                ...state,
                createArticleRequest: payload,
            }
        case create.CREATE_ARTICLE_SUCCESS:
            return{
                ...state,
                createArticleRequest: payload,
            }
        case create.CREATE_ARTICLE_FAILED:
            return{
                ...state,
                createArticleFailed: payload,
            }
        default:
            return state;

    }
}
export default createArticleReducer;