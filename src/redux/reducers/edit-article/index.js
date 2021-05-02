import * as edit from '../../actions/edit-article/index';

const initialState = {
    editArticleStatus: null,
}

const editArticleReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case edit.EDIT_ARTICLE_STATUS:
            return{
                ...state,
                editArticleStatus: payload
            }
        default:
            return state;
    }

}
export default editArticleReducer;