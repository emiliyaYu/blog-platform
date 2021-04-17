import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {uniqueId} from 'lodash';
import Loader from "react-loader-spinner";
import Article from "../article";
import styles from './article-list.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ArticleList = ({articlesData, isLoading}) => {
    const articlesList = articlesData.map((article) => <Article title={article.title}
    tagList={article.tagList}
    description={article.description}
    date={article.createdAt}
    user={article.author}
    bodyText={article.body}
    key={uniqueId('article_id')}
    slug={article.slug}/>)
    return(
        <div className={styles.articleList}>
            {isLoading === true ? <Loader type="Rings" color='#2196f3' height={80} width={80}/> : articlesList}
        </div>
    )
}
ArticleList.defaultProps = {
    articlesData: [],
    isLoading: true,
}
ArticleList.propTypes = {
    articlesData: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool
}
const mapStateToProps = (state) => ({
    articlesData: state.getArticleSuccessReducer.articlesList.articles,
    isLoading: state.getArticleRequestReducer
})
export default connect(mapStateToProps, null)(ArticleList);