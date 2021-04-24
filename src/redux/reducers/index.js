import {combineReducers} from "redux";
import articlesReducer from "./articles";
import singleArticleReducer from "./single-article";
import registrationReducer from "./registartion/registartionSuccessReducer";
import loginReducer from "./login";
import createArticleReducer from "./create-article";

import logOutReducer from "./logout";
import updateEditProfile from "./edit-profile";


const appReducer = combineReducers({articlesReducer, singleArticleReducer,
registrationReducer,loginReducer, logOutReducer, updateEditProfile, createArticleReducer});

export default appReducer;
