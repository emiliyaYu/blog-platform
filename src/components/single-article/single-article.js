import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import {Avatar, Tag} from "antd";
import Loader from "react-loader-spinner";
import {getArticle, isSingleArticle,} from "../../redux/actions/getSingleArticles";
import styles from './single-article.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import convertDate from "../../utilts/convertDate";

const SingleArticle = ({match, article, isLoad, getSingleArticle}) => {
    
    useEffect(() => 
            // eslint-disable-next-line react/prop-types
             getSingleArticle(match.params.slug)

    ,[])// eslint-disable-line react-hooks/exhaustive-deps

    const {singleArticleWrapper, articleDesc, articleInfo,articleTitle, articleText, userInfo, nameAndDate, userName, articleDate, articleBody, loader} = styles;
    if(isLoad === true) return <Loader type="Rings" color='#2196f3' height={80} width={80} className={loader}/>;

   const {title, tagList, body, author, createdAt, description} = article;
    const tags = tagList.map((el) => <Tag>{el}</Tag>);
    const dt = convertDate(createdAt);
    const {username, image} = author;


    return (
        <div className={singleArticleWrapper}>
            <div className={articleDesc}>
                <div className={articleInfo}>
                    <div>
                        <span className={articleTitle}>{title}</span>
                        <div>{tags}</div>
                    </div>
                    <span className={articleText}>{description}</span>

                </div>
                <div className={userInfo}>
                    <div className={nameAndDate}>
                        <span className={userName}>{username}</span>
                        <span className={articleDate}>{`${dt.monthLong} ${dt.day}, ${dt.year}`}</span>
                    </div>
                    <Avatar size={45} src={image} />
                </div>
            </div>
           <div className={articleBody}><ReactMarkdown>{body}</ReactMarkdown></div>
        </div>
    )
}
SingleArticle.defaultProps = {
    match: {},
    article: [],
    isLoad: true,
    getSingleArticle: ()=>{}
}
SingleArticle.propTypes = {
    match: PropTypes.shape({}),
    article: PropTypes.shape([]),
    isLoad: PropTypes.bool,
    getSingleArticle: PropTypes.func
}

const mapStateToProps = (state) => ({
    article: state.getSingleArticleSuccessReducer.currentArticle.article,
    isLoad: state.getSingleArticleRequestReducer,

})
const mapDispatchToProps = (dispatch) => ({
    setSingle: (bool) => dispatch(isSingleArticle(bool)),
    getSingleArticle: (slug)=> dispatch(getArticle(slug))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);