import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import {uniqueId} from 'lodash';
import Loader from "react-loader-spinner";
import Article from "../article";
import styles from './article-list.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {isSingleArticle} from "../../redux/actions/getSingleArticles";

const ArticleList = ({articlesData, isLoading, setSingle}) => {

    const history = useHistory();
    const {location} = history;

    useEffect(() => {
        if(location.pathname === '/home') {
            setSingle(false)
        }
    }, [articlesData]) // eslint-disable-line react-hooks/exhaustive-deps
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
    setSingle: ()=>{}
}
ArticleList.propTypes = {
    articlesData: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    setSingle: PropTypes.func
}
const mapDispatchToProps = (dispatch) => ({
    setSingle: (bool) => dispatch(isSingleArticle(bool))
})
const mapStateToProps = (state) => ({
    articlesData: state.getArticleSuccessReducer.articlesList.articles,
    isLoading: state.getArticleRequestReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);