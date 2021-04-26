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
import {getUser} from "../../services/local-storage";


const Article = ({title, tagList, user, date, slug, description, likesCount, isFavorite,likesArticle, jToken, unLikesArticle}) => {
    const dt = convertDate(date)
    const {username, image} = user;
    const tags = tagList.map(tag => <Tag key={uniqueId('id')}>{tag}</Tag>);

    const {articleWrapper, articleInfo, articleTitle, articleDesc, userInfo, nameAndDate, userName, articleDate, articleText, articleLikes, titleInfo, likeOutLined, likeCount} = styles;


    const likeSubmit = () => {
        if(isFavorite === false){
            likesArticle(slug, jToken);
        }
        if(isFavorite === true) {
            unLikesArticle(slug, jToken)
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
                                {isFavorite ?  <HeartFilled style={{color: '#1890FF'}} onClick={likeSubmit}/> : <HeartOutlined className={likeOutLined} onClick={likeSubmit}/>}

                                <span className={likeCount}>{likesCount}</span>
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
    title: '',
    tagList: [],
    user: [],
    date: '',
    slug: '',
    description: '',
    likesCount: 0,
    isFavorite: false,
    jToken: '',
    likesArticle: ()=>{},
    unLikesArticle: ()=>{}
}

Article.propTypes = {
    title: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape([]),
    date: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.string,
    likesCount: PropTypes.number,
    isFavorite: PropTypes.bool,
    jToken: PropTypes.string,
    likesArticle: PropTypes.func,
    unLikesArticle: PropTypes.func

}
const mapStateToProps = (state) => ({
    isSingle: state.singleArticleReducer.isSingleArticle,
    jToken: getUser() === null ? '' : getUser().token
})
const mapDispatchToProps = (dispatch) => ({
    likesArticle: (slug, token) => dispatch(favoriteArticle(slug, token)),
    unLikesArticle: (slug, token) => dispatch(unFavoriteArticle(slug, token))
})
export default connect(mapStateToProps, mapDispatchToProps)(Article);