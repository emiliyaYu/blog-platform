import React, {useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {useHistory, Link} from 'react-router-dom';
import {uniqueId} from 'lodash';
import ReactMarkdown from "react-markdown";
import {Avatar, Tag, Popconfirm} from "antd";
import Loader from "react-loader-spinner";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {getArticle, getSingleArticleEntities, getSingleArticleStatus} from "../../redux/actions/single-article";
import styles from './single-article.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import convertDate from "../../utilts/convertDate";
import localStorageService from "../../services/local-storage";
import {deleteArticle, deleteArticleStatus} from "../../redux/actions/delete-article";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import {favoriteArticle, favoriteArticleStatus, unFavoriteArticle, unFavoriteArticleStatus} from "../../redux/actions/favorites-article";
import openNotification from "../../services/notification/notification";
import { errorStatus} from "../../constants/status";

const SingleArticle = ({match, article, getSingleArticle, isLogin, removeArticle, renewArticlesList, page, nickName, updateStatusOfDelete, likesArticle, unLikesArticle,
                        updateArticle, statusOfLiked, statusOfUnLiked}) => {

    const {singleArticleWrapper, articleDesc, articleInfo,articleTitle, articleText, userInfo, nameAndDate, userName, articleBody, loader, articleDate, userActions,
        buttonEdit, buttonDelete, articleLikes, likeOutLined, likeCount, headerArticle} = styles;

        const history = useHistory();

    const initHistory = useCallback(() =>{
        if(statusOfLiked === errorStatus || statusOfUnLiked === errorStatus){
            openNotification('error', 'Error', 'Request failed.')
        }
    },[statusOfLiked, statusOfUnLiked])

    useEffect( () => {
        getSingleArticle(match.params.slug) // запрос на статью
        initHistory()
    },[getSingleArticle, match.params.slug, initHistory, statusOfUnLiked])

    const confirm = async () => {
        await removeArticle(match.params.slug);
        updateArticle([]);
        renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
        updateStatusOfDelete(null);
        history.push(path.home);
    }

    const renderArticle = (singleArticle) => {

        // eslint-disable-next-line no-shadow
        const {article} = singleArticle;

            const {title, description, author, createdAt, body, tagList, slug, favoritesCount, favorited} = article;
            const {username, image} = author;
            const tags = tagList.map((tag) => <Tag key={uniqueId('id')}>{tag}</Tag>)

             const handleLikeSubmit = () => {
                if(isLogin){
                    if(!favorited) {
                        likesArticle(slug);

                    }
                    if(favorited) {
                        unLikesArticle(slug);
                    }
                }
                if(!isLogin) {
                    openNotification('error', 'Error', 'Not auth.')
                }

             }
            const dt = convertDate(createdAt);
            return (
                <div className={singleArticleWrapper}>
                    <div className={articleDesc}>
                        <div className={articleInfo}>
                            <div>
                                <div className={headerArticle}>
                                    <span className={articleTitle}>{title}</span>
                                    <div className={articleLikes}>
                                        {favorited ?  <HeartFilled style={{color: '#1890FF', cursor: 'pointer'}} onClick={handleLikeSubmit}/> : <HeartOutlined className={likeOutLined} onClick={handleLikeSubmit}/>}
                                        <span className={likeCount}>{favoritesCount}</span>
                                    </div>
                                </div>
                                <div>{tags}</div>
                            </div>
                            <span className={articleText}>{description}</span>
                        </div>
                        <div>
                            <div className={userInfo}>
                                <div className={nameAndDate}>
                                    <span className={userName}>{username}</span>
                                    <span className={articleDate}>{`${dt.monthLong} ${dt.day}, ${dt.year}`}</span>
                                </div>
                                <Avatar size={45} src={image}/>
                            </div>
                            {isLogin && username === nickName ? <div className={userActions}>
                                <Link to={`/article/edit-article/${slug}`}><button type='button' className={buttonEdit}>Edit</button></Link>
                                <Popconfirm
                                    title="Are you sure to delete this article?"
                                    onConfirm={confirm}
                                    onCancel={()=>{}}
                                    okText="Yes"
                                    cancelText="No"><button type='button' className={buttonDelete}>Delete</button> </Popconfirm>
                            </div> : ''}
                        </div>
                    </div>
                    <div className={articleBody}><ReactMarkdown>{body}</ReactMarkdown></div>
                </div>
            )
    }
    if(article.length === 0) return <Loader type="Rings" color='#2196f3' height={80} width={80} className={loader}/>;

   return renderArticle(article);
}                     
SingleArticle.defaultProps = {
    match: {},
    article: [],
    isLogin: false,
    statusOfDelete: 'loading',
    page: 1,
    nickName: '',
    getSingleArticle: ()=>{},
    removeArticle: ()=>{},
    renewArticlesList: ()=>{},
    updateStatusOfDelete: ()=>{},
    likesArticle: ()=>{},
    unLikesArticle: ()=>{},
    statusOfLiked: false,
    statusOfUnLiked: false,
    likedArticle: {},
    updateStatusOfLiked: ()=>{},
    updateStatusUnLiked: ()=>{},
    updateArticle: ()=>{},
    updateIsLoad: ()=>{}
}

SingleArticle.propTypes = {
    match: PropTypes.shape({params: PropTypes.shape({slug: PropTypes.string})}),
    article: PropTypes.shape({}),
    isLogin: PropTypes.bool,
    statusOfDelete: PropTypes.string,
    page: PropTypes.number,
    nickName: PropTypes.string,
    getSingleArticle: PropTypes.func,
    removeArticle: PropTypes.func,
    renewArticlesList: PropTypes.func,
    updateStatusOfDelete: PropTypes.func,
    likesArticle: PropTypes.func,
    unLikesArticle: PropTypes.func,
    statusOfLiked: PropTypes.string,
    statusOfUnLiked: PropTypes.string,
    likedArticle: PropTypes.shape({}),
    updateStatusOfLiked: PropTypes.func,
    updateStatusOfUnLiked: PropTypes.func,
    updateArticle: PropTypes.func,
    updateStatusArticle: PropTypes.func
}

const mapStateToProps = (state) => {
    const isLogin = localStorageService().get('isLogin');
    const user = localStorageService().get('user');
    const nickName = user === null? '' : user.username;
    return {
        article: state.singleArticleReducer.articleEntities,
        statusOfDelete: state.deleteArticleReducer.deleteArticleStatus,
        page: state.articlesReducer.currentPage,
        isLogin,
        nickName,
        statusOfLiked: state.favoritesArticleReducer.favoriteArticleStatus,
        statusOfUnLiked: state.favoritesArticleReducer.unFavoriteArticleStatus,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getSingleArticle: (slug) => dispatch(getArticle(slug)),
    updateArticle: (article) => dispatch(getSingleArticleEntities(article)),
    updateStatusArticle: (status) => dispatch(getSingleArticleStatus(status)),
    removeArticle: (slug) => dispatch(deleteArticle(slug)),
    renewArticlesList: (key, page)=> dispatch(updateArticlesList(key, page)),
    updateStatusOfDelete: (status) => dispatch(deleteArticleStatus(status)),
    likesArticle: (slug) => dispatch(favoriteArticle(slug)),
    unLikesArticle: (slug) => dispatch(unFavoriteArticle(slug)),
    updateStatusOfLiked: (status) => dispatch(favoriteArticleStatus(status)),
    updateStatusOfUnLiked: (status) => dispatch(unFavoriteArticleStatus(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);