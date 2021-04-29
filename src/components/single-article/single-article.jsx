import React, {useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {useHistory, Link} from 'react-router-dom';
import {uniqueId} from 'lodash';
import ReactMarkdown from "react-markdown";
import {Avatar, Tag, Popconfirm} from "antd";
import Loader from "react-loader-spinner";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {
    getArticle, getSingleArticleFailed, getSingleArticleRequest,
    getSingleArticleSuccess,
    isSingleArticle,
} from "../../redux/actions/single-article";
import styles from './single-article.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import convertDate from "../../utilts/convertDate";
import {getItem} from "../../services/local-storage";
import {deleteArticle, deleteArticleFailed} from "../../redux/actions/delete-article";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import {
    favoriteArticle,
    favoriteArticleFailed,
    unFavoriteArticle,
    unFavoriteArticleFailed
} from "../../redux/actions/favorites-article";
import openNotification from "../../services/notification";



const SingleArticle = ({match, article, getSingleArticle, isLogin, removeArticle, renewArticlesList, page, nickName, updateStatusOfDeleteError, likesArticle, unLikesArticle,
                        isErrorOfLiked, isErrorOfUnLiked, updateIsErrorOfLiked, updateIsErrorOfUnLiked, isErrorOfGetSingleArticle, updateArticle, updateIsError, updateIsLoad}) => {

    const {singleArticleWrapper, articleDesc, articleInfo,articleTitle, articleText, userInfo, nameAndDate, userName, articleBody, loader, articleDate, userActions,
        buttonEdit, buttonDelete, articleLikes, likeOutLined, likeCount, headerArticle} = styles;

        const history = useHistory();

    const initHistory = useCallback(() => {
        
        if(isErrorOfLiked === false || isErrorOfUnLiked === false) {
            // getSingleArticle(match.params.slug, jToken);
            updateIsErrorOfLiked(null);
            updateIsErrorOfUnLiked(null);
        }
        if(isErrorOfLiked === true ) {
            openNotification('error', 'Error', 'No authorization.')
            updateIsErrorOfLiked(null);
            updateIsErrorOfUnLiked(null)
        }
    }, [isErrorOfLiked, isErrorOfUnLiked, updateIsErrorOfLiked, updateIsErrorOfUnLiked]);

    useEffect( () => {
        initHistory();
        const fetchData = async () => {
            try{
                await getSingleArticle(match.params.slug) // запрос на статью
            }
            catch {
                updateIsError(true);
            }

        }
        fetchData();

        if(isErrorOfGetSingleArticle === true) {
            openNotification('error', 'Error', 'Request failed.')
        }

        return () => {
            updateIsLoad(true);
        };
    },[])// eslint-disable-line react-hooks/exhaustive-deps



    const confirm = async () => {
        await removeArticle(match.params.slug);
        updateArticle([]);
        renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
        updateStatusOfDeleteError(null);
        history.push(path.home);
        updateIsError(false);
    }

    const renderArticle = (singleArticle) => {

        // eslint-disable-next-line no-shadow
        const {article} = singleArticle;

            const {title, description, author, createdAt, body, tagList, slug, favoritesCount, favorited} = article;
            const {username, image} = author;
            const tags = tagList.map((tag) => <Tag key={uniqueId('id')}>{tag}</Tag>)

             const handleLikeSubmit = () => {
                if(favorited === false) {
                    likesArticle(slug);

                }
                if(favorited === true) {
                    unLikesArticle(slug)
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
    isLoad: true,
    isLogin: false,
    isErrorOfDelete: false,
    page: 1,
    nickName: '',
    getSingleArticle: ()=>{},
    removeArticle: ()=>{},
    renewArticlesList: ()=>{},
    updateStatusOfDeleteError: ()=>{},
    likeArticle: ()=>{},
    unLikeArticle: ()=>{},
    isErrorOfLiked: false,
    isErrorOfUnLiked: false,
    likedArticle: {},
    updateIsErrorOfLiked: ()=>{},
    updateIsErrorOfUnLiked: ()=>{},
    isErrorOfGetSingleArticle: false,
    updateIsError: ()=>{},
    updateArticle: ()=>{},
    updateIsLoad: ()=>{}
}
SingleArticle.propTypes = {
    match: PropTypes.shape({params: PropTypes.shape({slug: PropTypes.string})}),
    article: PropTypes.shape({}),
    isLoad: PropTypes.bool,
    isLogin: PropTypes.bool,
    isErrorOfDelete: PropTypes.bool,
    page: PropTypes.number,
    nickName: PropTypes.string,
    getSingleArticle: PropTypes.func,
    removeArticle: PropTypes.func,
    renewArticlesList: PropTypes.func,
    updateStatusOfDeleteError: PropTypes.func,
    likesArticle: PropTypes.func,
    unLikesArticle: PropTypes.func,
    isErrorOfLiked: PropTypes.bool,
    isErrorOfUnLiked: PropTypes.bool,
    likedArticle: PropTypes.shape({}),
    updateIsErrorOfLiked: PropTypes.func,
    updateIsErrorOfUnLiked: PropTypes.func,
    isErrorOfGetSingleArticle: PropTypes.bool,
    updateIsError: PropTypes.func,
    updateArticle: PropTypes.func,
    updateIsLoad: PropTypes.func
    
}

const mapStateToProps = (state) => {
    const isLogin = getItem('isLogin');
    const user = getItem('user');
    const nickName = user === null? '' : user.username;
    return {
        article: state.singleArticleReducer.articleSuccess,
        isLoad: state.singleArticleReducer.articleRequest,
        isErrorOfDelete: state.deleteArticleReducer.deleteArticleFailed,
        page: state.articlesReducer.currentPage,
        isLogin,
        nickName,
        favoriteArticle: state.favoritesArticleReducer.favoriteArticleSuccess,
        isErrorOfLiked: state.favoritesArticleReducer.favoriteArticleFailed,
        isErrorOfUnLiked: state.favoritesArticleReducer.unFavoriteArticleFailed,
        isErrorOfGetSingleArticle: state.singleArticleReducer.articleFailed
    }


}
const mapDispatchToProps = (dispatch) => ({
    setSingle: (bool) => dispatch(isSingleArticle(bool)),
    getSingleArticle: (slug) => dispatch(getArticle(slug)),
    updateArticle: (article) => dispatch(getSingleArticleSuccess(article)),
    updateIsError: (isLoad) => dispatch(getSingleArticleFailed(isLoad)),
    updateIsLoad: (isLoad) => dispatch(getSingleArticleRequest(isLoad)),
    removeArticle: (slug) => dispatch(deleteArticle(slug)),
    renewArticlesList: (key, page)=> dispatch(updateArticlesList(key, page)),
    updateStatusOfDeleteError: (isError) => dispatch(deleteArticleFailed(isError)),
    likesArticle: (slug) => dispatch(favoriteArticle(slug)),
    unLikesArticle: (slug) => dispatch(unFavoriteArticle(slug)),
    updateIsErrorOfLiked: (isError) => dispatch(favoriteArticleFailed(isError)),
    updateIsErrorOfUnLiked: (isError) => dispatch(unFavoriteArticleFailed(isError))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);