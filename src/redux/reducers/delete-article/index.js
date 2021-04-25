import * as remove from '../../actions/delete-article/index'

const initialState = {
    deleteArticleRequest: false,
    deleteArticleSuccess: false,
    deleteArticleFailed: null,
}
const deleteArticleReducer = (state=initialState, {type, payload}) => {
    switch (type){
        case remove.DELETE_ARTICLE_REQUEST:
            return{
                ...state,
                deleteArticleRequest: payload
            };
        case remove.DELETE_ARTICLE_SUCCESS:
            return{
                ...state,
                deleteArticleSuccess: payload
            };
        case remove.DELETE_ARTICLE_FAILED:
            return{
                ...state,
                deleteArticleFailed: payload
            };
        default:
            return state;
    }
}
export default deleteArticleReducer;