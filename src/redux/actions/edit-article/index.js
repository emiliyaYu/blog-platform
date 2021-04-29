import {createAction} from 'redux-actions';
import Api from "../../../services/api-service";
import {getSingleArticleSuccess} from "../single-article";
import {editProfileFailed} from "../edit-profile";

export const EDIT_ARTICLE_REQUEST = 'EDIT_ARTICLE_REQUEST';
export const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
export const EDIT_ARTICLE_FAILED = 'EDIT_ARTICLE_FAILED';

export const editArticleRequest = createAction(EDIT_ARTICLE_REQUEST, isLoad => isLoad);
export const editArticleSuccess = createAction(EDIT_ARTICLE_SUCCESS, isSuccess => isSuccess);
export const editArticleFailed = createAction(EDIT_ARTICLE_FAILED, isError=> isError);

export const updateArticle = (slug, data) => async (dispatch) => {
    const api = new Api();
    dispatch(editArticleRequest(true));
    try{
        const request = await api.editArticle(data, slug);
        dispatch(getSingleArticleSuccess(request))
        dispatch(editArticleSuccess(true));
        dispatch(editArticleRequest(false));
        dispatch(editArticleFailed(false));
    }
    catch{
        dispatch(editProfileFailed(true));
        dispatch(editArticleFailed(false));
        dispatch(editArticleSuccess(false));
    }
}
