import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {updateArticlesList} from "../../redux/actions/articles";
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



const BlogApp = () => {
    const {content, wrapper, container} = styles;
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPageReducer);

    // const localStore = new LocalStorage();
    //
    // const login = JSON.parse(localStore.getIsLogin());

    useEffect(() => {
        dispatch(updateArticlesList(5, currentPage));
        
    })


    
    return(
        <Router>
        <div className={container}>
            <Header/>
            <div className={wrapper}>
                <Switch>
                    <Route path='/' exact render={() => (
                           <div className={content}>
                               <ArticleList/>
                               <MainPagination/>
                           </div>
                       )
                    }/>
                    <Route path='/article/:slug' exact render={({match}) => <div className={content}>
                        <SingleArticle match={match}/>
                    </div>} />
                    <Route path='/sign_up' render={() => <div className={content}>
                        <SignUp/>
                    </div>}/>
                    <Route path='/sign_in' render={() => <div className={content}>
                        <SignIn/>
                    </div>}/>
                    <Route path='/profile' render={() => <div className={content}>
                        <EditProfile/>
                    </div>}/>
                    <Route path='/new-article' render={() => <div className={content}>
                        <CreateArticle/>
                    </div>}/>
                </Switch>
            </div>
        </div>
        </Router>
    )
}

export default BlogApp;