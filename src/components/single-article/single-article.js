import React, {useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {useHistory, Link} from 'react-router-dom';
import {uniqueId} from 'lodash';
import ReactMarkdown from "react-markdown";
import {Avatar, Tag, Popconfirm} from "antd";
import Loader from "react-loader-spinner";
import {getArticle, isSingleArticle,} from "../../redux/actions/single-article";
import styles from './single-article.module.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import convertDate from "../../utilts/convertDate";
import {getIsLogin, getUser} from "../../services/local-storage";
import {deleteArticle} from "../../redux/actions/delete-article";
import {updateArticlesList} from "../../redux/actions/articles";


const SingleArticle = ({match, article, isLoad, getSingleArticle, isLogin, jToken, isDelete, removeArticle, renewArticlesList, page, nickName}) => {

    



    const {singleArticleWrapper, articleDesc, articleInfo,articleTitle, articleText, userInfo, nameAndDate, userName, articleBody, loader, articleDate, userActions,
        buttonEdit, buttonDelete} = styles;

        const history = useHistory();

    const initHistory = useCallback(() => {
        if(isDelete === false) {
            renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
            history.push('/');
        }
    }, [history, isDelete, page, renewArticlesList]);

    useEffect( () => {
        // eslint-disable-next-line react/prop-types
        getSingleArticle(match.params.slug)
        initHistory()
    },[initHistory])// eslint-disable-line react-hooks/exhaustive-deps

    const confirm = () => {
        removeArticle(match.params.slug, jToken);
    }

    const renderArticle = (singleArticle) => {

        if(isLoad === true) return <Loader type="Rings" color='#2196f3' height={80} width={80} className={loader}/>;
        // eslint-disable-next-line no-shadow
        const {article} = singleArticle;
            const {title, description, author, createdAt, body, tagList, slug} = article;
            const {username, image} = author;
            const tags = tagList.map((tag) => <Tag key={uniqueId('id')}>{tag}</Tag>)
            const dt = convertDate(createdAt);
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
    isDelete: false,
    jToken: '',
    page: 1,
    nickName: '',
    getSingleArticle: ()=>{},
    removeArticle: ()=>{},
    renewArticlesList: ()=>{}
}
SingleArticle.propTypes = {
    match: PropTypes.shape({}),
    article: PropTypes.shape({}),
    isLoad: PropTypes.bool,
    isLogin: PropTypes.bool,
    isDelete: PropTypes.bool,
    jToken: PropTypes.string,
    page: PropTypes.number,
    nickName: PropTypes.string,
    getSingleArticle: PropTypes.func,
    removeArticle: PropTypes.func,
    renewArticlesList: PropTypes.func
}

const mapStateToProps = (state) => {
    const isLogin = getIsLogin();
    const user = getUser();
    const jToken = user === null? '' : user.token;
    const nickName = user === null? '' : user.username;
    return {
        article: state.singleArticleReducer.articleSuccess,
        isLoad: state.singleArticleReducer.articleRequest,
        isDelete: state.deleteArticleReducer.deleteArticleFailed,
        page: state.articlesReducer.currentPage,
        isLogin,
        jToken,
        nickName
    }


}
const mapDispatchToProps = (dispatch) => ({
    setSingle: (bool) => dispatch(isSingleArticle(bool)),
    getSingleArticle: (slug) => dispatch(getArticle(slug)),
    removeArticle: (slug, token) => dispatch(deleteArticle(slug, token)),
    renewArticlesList: (key, page)=> dispatch(updateArticlesList(key, page)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);