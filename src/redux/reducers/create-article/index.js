import * as create from '../../actions/create-article/index';

const initialState = {
    createArticleStatus: null,
    createArticleEntities: [],
}
const createArticleReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case create.CREATE_ARTICLE_STATUS:
            return{
                ...state,
                createArticleStatus: payload,
            }
        case create.CREATE_ARTICLE_ENTITIES:
            return{
                ...state,
                createArticleEntities: payload,
            }
        default:
            return state;

    }
}
export default createArticleReducer;