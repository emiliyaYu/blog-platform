import {combineReducers} from "redux";
import getArticleSuccessReducer from "./getArticlesReducer/getArticleSuccessReducer";
import currentPageReducer from "./getArticlesReducer/currentPageReducer";
import getArticleRequestReducer from "./getArticlesReducer/getArticleRequestReducer";
import getSingleArticleRequestReducer from "./getSingleArticle/getSingleArticleRequestReducer";
import getSingleArticleSuccessReducer from "./getSingleArticle/getSingleArticleSuccessReducer";
import isSingleArticleReducer from "./getSingleArticle/isSingleArticleReducer";
import registrationSuccessReducer from "./registartionReducer/registartionSuccessReducer";
import loginSuccessReducer from "./loginReducer/loginSuccesReducer";
import isLoginReducer from "./loginReducer/isLoginReducer";
import loginUserFailedReducer from "./loginReducer/loginUserFailed";
import logOutReducer from "./logoutReducer";
import updateEditProfile from "./edit-profile";


const appReducer = combineReducers({getArticleSuccessReducer,getArticleRequestReducer, currentPageReducer, getSingleArticleRequestReducer,getSingleArticleSuccessReducer, isSingleArticleReducer,
registrationSuccessReducer, loginSuccessReducer, isLoginReducer, loginUserFailedReducer, logOutReducer, updateEditProfile});

export default appReducer;
