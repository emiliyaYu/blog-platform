import {combineReducers} from "redux";
import getArticleSuccessReducer from "./getArticlesReducer/getArticleSuccessReducer";
import currentPageReducer from "./getArticlesReducer/currentPageReducer";
import getArticleRequestReducer from "./getArticlesReducer/getArticleRequestReducer";
import getSingleArticleSuccessReducer from "./getSingleArticle/getSingleArticleSuccessReducer";
import isSingleArticleReducer from "./getSingleArticle/isSingleArticleReducer";


const appReducer = combineReducers({getArticleSuccessReducer,getArticleRequestReducer, currentPageReducer, getSingleArticleSuccessReducer, isSingleArticleReducer});

export default appReducer;
