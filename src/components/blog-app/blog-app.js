import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setCurrentPage, updateArticlesList} from "../../redux/actions/articles";
import Header from "../header";
import MainPagination from "../pagination";
import ArticleList from "../article-list";
import styles from './blog-app.module.scss';
import 'antd/dist/antd.css';
import SingleArticle from "../single-article/single-article";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import EditProfile from "../edit-profile";
import CreateArticle from "../create-article";
import EditArticle from "../edit-article";
import {getUser} from "../../services/local-storage";
import * as path from '../../routes/index';



const BlogApp = () => {
    const {content, wrapper, container} = styles;
    const dispatch = useDispatch();
    const jToken = getUser() === null ? '' : getUser().token;


    useEffect(() => {
        dispatch(updateArticlesList(5, 1, jToken));
        dispatch(setCurrentPage(1));
    })

    
    return(
        <Router>
        <div className={container}>
            <Header/>
            <div className={wrapper}>
                <Switch>
                    <Route path={path.home} exact render={() => (
                            <div className={content}>
                                <ArticleList/>
                                <MainPagination/>
                            </div>
                        )
                    }/>
                    <Route path={path.singleArticle} exact render={({match}) => <div className={content}>
                        <SingleArticle match={match}/>
                    </div>} />
                    <Route path={path.signUp} render={() => <div className={content}>
                        <SignUp/>
                    </div>}/>
                    <Route path={path.signIn} render={() => <div className={content}>
                        <SignIn/>
                    </div>}/>
                    <Route path={path.profile} render={() => <div className={content}>
                        <EditProfile/>
                    </div>}/>
                    <Route path={path.createArticle} render={() => <div className={content}>
                        <CreateArticle/>
                    </div>}/>
                    <Route path={path.editArticle} exact render={({match}) => <div className={content}>
                        <EditArticle match={match}/>
                    </div>}/>
                </Switch>
            </div>
        </div>
        </Router>
    )
}

export default BlogApp;