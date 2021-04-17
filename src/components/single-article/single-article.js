import React, {useEffect} from 'react';
import {useDispatch, connect} from "react-redux";
import PropTypes from 'prop-types';
import {getArticle} from "../../redux/actions/getSingleArticles";
import Article from "../article";

const SingleArticle = ({match, article}) => {

    const dispatch = useDispatch();

    const {title, tagList, body, author, createdAt, slug, description} = article;

    useEffect(() => {
            // eslint-disable-next-line react/prop-types
            dispatch(getArticle(match.params.slug))
    })

    return(
             <Article title={title} bodyText={body} user={author} slug={slug} date={createdAt} tagList={tagList} description={description}/>
    )
}
SingleArticle.defaultProps = {
    match: {},
    article: [],
}
SingleArticle.propTypes = {
    match: PropTypes.shape({}),
    article: PropTypes.shape([])
}
const mapStateToProps = (state) => ({
    article: state.getSingleArticleSuccessReducer.currentArticle.article
})
export default connect(mapStateToProps)(SingleArticle);