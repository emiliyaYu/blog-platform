import {combineReducers} from "redux";
import articlesReducer from "./articles";
import singleArticleReducer from "./single-article";
import registrationReducer from "./registartion";
import loginReducer from "./login";
import createArticleReducer from "./create-article";
import deleteArticleReducer from "./delete-article";
import editArticleReducer from "./edit-article";
import updateEditProfile from "./edit-profile";
import favoritesArticleReducer from "./favorite-article";


const appReducer = combineReducers({articlesReducer, singleArticleReducer,
    registrationReducer,loginReducer, updateEditProfile, createArticleReducer, deleteArticleReducer, editArticleReducer,
    favoritesArticleReducer});

export default appReducer;
