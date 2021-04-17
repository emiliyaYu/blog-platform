import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Tag, Avatar } from 'antd';
import {uniqueId} from 'lodash';
import {Link} from 'react-router-dom';
import styles from './article.module.scss';
import convertDate from "../../utilts/convertDate";


const Article = ({title, tagList, user, date, slug, description}) => {
    const dt = convertDate(date)
    const {username, image} = user;
    const tags = tagList.map(tag => <Tag key={uniqueId('id')}>{tag}</Tag>);

    const {articleWrapper, articleInfo, articleTitle, articleDesc, userInfo, nameAndDate, userName, articleDate, articleText} = styles;

    return(
        <div className={articleWrapper}>
            <div className={articleDesc}>
                <div className={articleInfo}>
                    <div>
                        <Link to={`/article/${slug}`}>
                            <span className={articleTitle}>{title}</span>
                        </Link>
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
        </div>
    )
}
Article.defaultProps = {
    // getArticle: ()=>{},
    title: '',
    tagList: [],
    user: [],
    date: '',
    slug: '',
    description: '',
}
Article.propTypes = {
    // getArticle: PropTypes.func,
    title: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape([]),
    date: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.string
}
const mapStateToProps = (state) => ({
    isSingle: state.isSingleArticleReducer
})
export default connect(mapStateToProps)(Article);