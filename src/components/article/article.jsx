import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Tag, Avatar } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import {uniqueId} from 'lodash';
import {Link} from 'react-router-dom';
import styles from './article.module.scss';
import convertDate from "../../utilts/convertDate";
import {favoriteArticle, unFavoriteArticle} from "../../redux/actions/favorites-article";
import localStorageService from "../../services/local-storage";
import openNotification from "../../services/notification/notification";


const Article = ({article, unLikesArticle, likesArticle, isLogin }) => {

    const {title, tagList, author, createdAt, slug, description, favorited, favoritesCount} = article;

    const dt = convertDate(createdAt)
    const {username, image} = author;
    const tags = tagList.map(tag => <Tag key={uniqueId('id')}>{tag}</Tag>);

    const {articleWrapper, articleInfo, articleTitle, articleDesc, userInfo, nameAndDate, userName, articleDate, articleText, articleLikes, titleInfo, likeOutLined, likeCount} = styles;

    const handleLikeSubmit = () => {
        if(isLogin){
            if(!favorited){
                likesArticle(slug);
            }
            if(favorited) {
                unLikesArticle(slug)
            }
        }
        if(!isLogin){
            openNotification('error', 'Error', 'Not auth');
        }

    }

    return(
        <div className={articleWrapper}>
            <div className={articleDesc}>
                <div className={articleInfo}>
                    <div>
                        <div className={titleInfo}>
                            <Link to={`/article/${slug}`}>
                                <span className={articleTitle}>{title}</span>
                            </Link>
                            <div className={articleLikes}>
                                {favorited ?  <HeartFilled style={{color: '#1890FF'}} onClick={handleLikeSubmit}/> : <HeartOutlined className={likeOutLined} onClick={handleLikeSubmit}/>}

                                <span className={likeCount}>{favoritesCount}</span>
                            </div>
                        </div>
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
   article: {},
    likesArticle: ()=>{},
    unLikesArticle: ()=>{},
    isLogin: false

}

Article.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        tagList: PropTypes.arrayOf(PropTypes.string),
        author: PropTypes.shape([]),
        createdAt: PropTypes.string,
        slug: PropTypes.string,
        description: PropTypes.string,
        favoritesCount: PropTypes.number,
        favorited: PropTypes.bool,
    }),

    likesArticle: PropTypes.func,
    unLikesArticle: PropTypes.func,
    isLogin: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isSingle: state.singleArticleReducer.isSingleArticle,
    isErrorOfLiked: state.favoritesArticleReducer.favoriteArticleFailed,
    isLogin: localStorageService().get('isLogin')
})
const mapDispatchToProps = (dispatch) => ({
    likesArticle: (slug) => dispatch(favoriteArticle(slug)),
    unLikesArticle: (slug) => dispatch(unFavoriteArticle(slug))
})
export default connect(mapStateToProps, mapDispatchToProps)(Article);