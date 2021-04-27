import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {uniqueId} from 'lodash';
import Loader from "react-loader-spinner";
import Article from "../article";
import styles from './article-list.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {isSingleArticle} from "../../redux/actions/single-article";
import {updateArticlesList} from "../../redux/actions/articles";
import {getIsLogin, getUser} from "../../services/local-storage";
import {favoriteArticleFailed, unFavoriteArticleFailed} from "../../redux/actions/favorites-article";
import openNotification from "../notification";

const ArticleList = ({articlesData, isLoading, jToken, page, renewArticlesList, isErrorOfLiked, isErrorOfUnLiked, updateIsErrorOfLiked, isLogin, updateIsErrorOfUnLiked}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
       if(isErrorOfLiked === false || isErrorOfUnLiked === false) {
           renewArticlesList(5, page, jToken);
           updateIsErrorOfLiked(null);
           updateIsErrorOfUnLiked(null)
       }
       if(isErrorOfLiked === true) {
           openNotification('error', 'Error', 'No authorization.')
           updateIsErrorOfLiked(null);
           updateIsErrorOfUnLiked(null)
       }
    },[isErrorOfLiked, isErrorOfUnLiked, isLogin, jToken, page, renewArticlesList, updateIsErrorOfLiked, updateIsErrorOfUnLiked])

    const articlesList = articlesData.map((article) => (
            <Article title={article.title}
                     tagList={article.tagList}
                     description={article.description}
                     date={article.createdAt}
                     user={article.author}
                     bodyText={article.body}
                     key={uniqueId('article_id')}
                     slug={article.slug}
                     likesCount={article.favoritesCount}
                     isFavorite={article.favorited}/>
        ))
    return(
        <div className={styles.articleList}>
            {isLoading === true ? <Loader type="Rings" color='#2196f3' height={80} width={80}/> : articlesList}
        </div>
    )
}
ArticleList.defaultProps = {
    articlesData: [],
    isLoading: true,
    likedArticle: {},
    isErrorOfLiked: false,
    isErrorOfUnLiked: false,
    renewArticlesList: ()=>{},
    jToken: '',
    page: 1,
    updateIsErrorOfLiked: PropTypes.func,
    updateIsErrorOfUnLiked: ()=>{},
    isLogin: false
}


ArticleList.propTypes = {
    articlesData: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    likedArticle: PropTypes.shape({slug: PropTypes.string}),
    isErrorOfLiked: PropTypes.bool,
    isErrorOfUnLiked: PropTypes.bool,
    renewArticlesList: PropTypes.func,
    jToken: PropTypes.string,
    page: PropTypes.number,
    updateIsErrorOfLiked: PropTypes.func,
    updateIsErrorOfUnLiked: PropTypes.func,
    isLogin: PropTypes.bool
}
const mapDispatchToProps = (dispatch) => ({
    setSingle: (bool) => dispatch(isSingleArticle(bool)),
    renewArticlesList:(key, page, token)=> dispatch(updateArticlesList(key, page, token)),
    updateIsErrorOfLiked: (isError) => dispatch(favoriteArticleFailed(isError)),
    updateIsErrorOfUnLiked: (isError) => dispatch(unFavoriteArticleFailed(isError))
})
const mapStateToProps = (state) => ({
    articlesData: state.articlesReducer.articlesSuccess,
    isLoading: state.articlesReducer.articlesRequest,
    likedArticle: state.favoritesArticleReducer.favoriteArticleSuccess.article,
    isErrorOfLiked: state.favoritesArticleReducer.favoriteArticleFailed,
    isErrorOfUnLiked: state.favoritesArticleReducer.unFavoriteArticleFailed,
    jToken: getUser() === null ? '' : getUser().token,
    page: state.articlesReducer.currentPage,
    isLogin: getIsLogin(),
})
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);