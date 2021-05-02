import React, {useEffect, useMemo} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
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
import * as path from '../../routes/index';
import PrivateRoute from "../private-route/private-logged";
import PrivateUsersActions from "../private-route/private-users-actions";
import 'normalize.css';
import localStorageService from "../../services/local-storage";


const BlogApp = () => {
    const {content, wrapper, container} = styles;
    const dispatch = useDispatch();
    const  setLogin = useMemo(() => {
        let isLogin = localStorageService().get('isLogin');
        const setIsLogin = isLogin === null ? isLogin = localStorageService().set('isLogin', false) : isLogin;
        return setIsLogin;
    },[])


    useEffect(() => {
        dispatch(updateArticlesList(5, 1));
        dispatch(setCurrentPage(1));
    }, [dispatch, setLogin])

    
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
                    <PrivateRoute path={path.signUp}>
                        <div className={content}>
                            <SignUp/>
                        </div>
                    </PrivateRoute>
                    <PrivateRoute path={path.signIn}>
                        <div className={content}>
                            <SignIn/>
                        </div>
                    </PrivateRoute>
                    <PrivateUsersActions  path={path.profile}>
                        <div className={content}>
                            <EditProfile/>
                        </div>
                    </PrivateUsersActions>
                    <PrivateUsersActions path={path.createArticle}>
                        <div className={content}>
                            <CreateArticle/>
                        </div>
                    </PrivateUsersActions>
                    <PrivateUsersActions path={path.editArticle}>
                        <div className={content}>
                            <EditArticle/>
                        </div>
                    </PrivateUsersActions>
                    <Redirect to={path.home} />
                </Switch>
            </div>
        </div>
        </Router>
    )
}

export default BlogApp;