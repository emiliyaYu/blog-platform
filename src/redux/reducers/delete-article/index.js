import * as remove from '../../actions/delete-article/index'

const initialState = {
    deleteArticleStatus: null,
}
const deleteArticleReducer = (state=initialState, {type, payload}) => {
    switch (type){
        case remove.DELETE_ARTICLE_STATUS:
            return{
                ...state,
                deleteArticleStatus: payload
            };
        default:
            return state;
    }
}
export default deleteArticleReducer;