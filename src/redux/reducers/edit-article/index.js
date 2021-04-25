import * as edit from '../../actions/edit-article/index';

const initialState = {
    editArticleRequest: false,
    editArticleSuccess: null,
    editArticleFailed: null,
}

const editArticleReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case edit.EDIT_ARTICLE_REQUEST:
            return{
                ...state,
                editArticleRequest: payload
            }
        case edit.EDIT_ARTICLE_SUCCESS:
            return{
                ...state,
                editArticleSuccess: payload
            }
        case edit.EDIT_ARTICLE_FAILED:
            return{
                ...state,
                editArticleFailed: payload
            }
        default:
            return state;
    }

}
export default editArticleReducer;