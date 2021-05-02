import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";
import Article from "../article";
import styles from './article-list.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {isSingleArticle} from "../../redux/actions/single-article";
import {favoriteArticleFailed, unFavoriteArticleFailed} from "../../redux/actions/favorites-article";
import openNotification from "../../services/notification/notification";
import {updateArticlesList} from "../../redux/actions/articles";

const ArticleList = ({articlesData, isLoading, isErrorOfLiked, isErrorOfUnLiked, updateIsErrorOfLiked, updateIsErrorOfUnLiked,}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
       if(isErrorOfLiked === false || isErrorOfUnLiked === false) {
           updateIsErrorOfLiked(null);
           updateIsErrorOfUnLiked(null)
       }
       if(isErrorOfLiked || isErrorOfUnLiked) {
           openNotification('error', 'Error', 'Request failed.')
           updateIsErrorOfLiked(null);
           updateIsErrorOfUnLiked(null)
       }
    },[isErrorOfLiked, isErrorOfUnLiked, updateIsErrorOfLiked, updateIsErrorOfUnLiked])

    const articlesList = articlesData.map((article) => (
            <Article article={article} key={article.slug}/>
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
    updateIsErrorOfLiked: PropTypes.func,
    updateIsErrorOfUnLiked: ()=>{},
    
}


ArticleList.propTypes = {
    articlesData: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    likedArticle: PropTypes.shape({slug: PropTypes.string}),
    isErrorOfLiked: PropTypes.bool,
    isErrorOfUnLiked: PropTypes.bool,
    updateIsErrorOfLiked: PropTypes.func,
    updateIsErrorOfUnLiked: PropTypes.func,
}
const mapDispatchToProps = (dispatch) => ({
    setSingle: (bool) => dispatch(isSingleArticle(bool)),
    updateIsErrorOfLiked: (isError) => dispatch(favoriteArticleFailed(isError)),
    updateIsErrorOfUnLiked: (isError) => dispatch(unFavoriteArticleFailed(isError)),
    renewArticlesList: (key, page) => dispatch(updateArticlesList(key, page)),
})
const mapStateToProps = (state) => ({
    articlesData: state.articlesReducer.articlesSuccess,
    isLoading: state.articlesReducer.articlesRequest,
    likedArticle: state.favoritesArticleReducer.favoriteArticleSuccess.article,
    isErrorOfLiked: state.favoritesArticleReducer.favoriteArticleFailed,
    isErrorOfUnLiked: state.favoritesArticleReducer.unFavoriteArticleFailed,
})
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);