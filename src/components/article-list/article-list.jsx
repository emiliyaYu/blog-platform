import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";
import Article from "../article";
import styles from './article-list.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {favoriteArticleStatus, unFavoriteArticleStatus} from "../../redux/actions/favorites-article";
import openNotification from "../../services/notification/notification";
import {updateArticlesList} from "../../redux/actions/articles";
import {successStatus, errorStatus, loadStatus} from "../../constants/status";

const ArticleList = ({articlesData, isLoading, statusOfLiked, statusOfUnLiked, updateStatusOfLiked, updateStatusOfUnLiked}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
       if(statusOfLiked === successStatus || statusOfUnLiked === successStatus) {
           updateStatusOfUnLiked(null);
           updateStatusOfLiked(null)
       }
       if(statusOfUnLiked === errorStatus || statusOfUnLiked === errorStatus) {
           openNotification('error', 'Error', 'Request failed.')
           updateStatusOfLiked(null);
           updateStatusOfUnLiked(null)
       }
    },[statusOfLiked, statusOfUnLiked, updateStatusOfLiked, updateStatusOfUnLiked])

    const articlesList = articlesData.map((article) => (
            <Article article={article} key={article.slug}/>
        ))
    return(
        <div className={styles.articleList}>
            {isLoading === loadStatus ? <Loader type="Rings" color='#2196f3' height={80} width={80}/> : articlesList}
        </div>
    )
}
ArticleList.defaultProps = {
    articlesData: [],
    isLoading: 'loading',
    likedArticle: {},
    statusOfLiked: 'loading',
    statusOfUnLiked: 'loading',
    updateStatusOfLiked: PropTypes.func,
    updateStatusOfUnLiked: ()=>{},
    
}


ArticleList.propTypes = {
    articlesData: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.string,
    likedArticle: PropTypes.shape({slug: PropTypes.string}),
    statusOfLiked: PropTypes.string,
    statusOfUnLiked: PropTypes.string,
    updateStatusOfLiked: PropTypes.func,
    updateStatusOfUnLiked: PropTypes.func,
}
const mapDispatchToProps = (dispatch) => ({
    updateStatusOfLiked: (status) => dispatch(favoriteArticleStatus(status)),
    updateStatusOfUnLiked: (status) => dispatch(unFavoriteArticleStatus(status)),
    renewArticlesList: (key, page) => dispatch(updateArticlesList(key, page)),
})
const mapStateToProps = (state) => ({
    articlesData: state.articlesReducer.articlesEntities,
    isLoading: state.articlesReducer.articlesStatus,
    likedArticle: state.favoritesArticleReducer.favoriteArticleEntities.article,
    statusOfLiked: state.favoritesArticleReducer.favoriteArticleStatus,
    statusOfUnLiked: state.favoritesArticleReducer.unFavoriteArticleStatus,
})
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);