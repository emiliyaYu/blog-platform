import React, {useCallback, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {createArticleFailed, createNewArticle} from "../../redux/actions/create-article";
import openNotification from "../../services/notification";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import FormCreateEditArticle from "../form-component/form-edit-create-article/form-edit-create-article";

const CreateArticle = ({createArticle, isError, renewArticlesList, page, updateError, isLoad}) => {


    const defaultValue = {
        tagList: [{name: ''}]
    }

    const handlerSubmit = (data) => {
        const {tagList, body, title, description} = data;
        // eslint-disable-next-line no-shadow
        const newTags = tagList.map(el => Object.values(el)).flat();
        const newData = {tagList: newTags, body, title, description};
        createArticle(newData)
    };

    const history = useHistory();


    // eslint-disable-next-line consistent-return
    const initHistory = useCallback(() => {
        if(isError === false) {
            renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
            history.push(path.home);
            updateError(null);
        }
        if(isError === true) {
            openNotification('error', 'Error', 'Invalid');
            updateError(null);
        }
    }, [history, isError, page, renewArticlesList, updateError]);


    useEffect(() => {
        initHistory();
    },[initHistory])




    return (
       <FormCreateEditArticle value={defaultValue} handlerSubmit={handlerSubmit} isLoad={isLoad} title='' body='' description='' titleForm='Create new article'/>
    )
}
CreateArticle.defaultProps = {
    createArticle: ()=>{},
    updateError: () =>{},
    renewArticlesList: ()=>{},
    page: 1,
    isError: false,
    isLoad: false,
}
CreateArticle.propTypes = {
    createArticle: PropTypes.func,
    updateError: PropTypes.func,
    renewArticlesList: PropTypes.func,
    page: PropTypes.number,
    isError: PropTypes.bool,
    isLoad: PropTypes.bool
}
const mapStateToProps = (state) => {
    const isError = state.createArticleReducer.createArticleFailed;
    const page = state.articlesReducer.currentPage;
    const isLoad = state.createArticleReducer.createArticleRequest
    return {isError, page, isLoad};
}
const mapDispatchToProps = (dispatch) => ({
    createArticle: (data) => dispatch(createNewArticle(data)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
    updateError: (isError) => dispatch(createArticleFailed(isError))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);