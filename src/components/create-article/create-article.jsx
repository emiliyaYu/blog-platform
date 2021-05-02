import React, {useCallback, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {createArticleStatus, createNewArticle} from "../../redux/actions/create-article";
import openNotification from "../../services/notification/notification";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import FormCreateEditArticle from "../form-component/form-edit-create-article/form-edit-create-article";
import {successStatus, errorStatus} from "../../constants/status";

const CreateArticle = ({createArticle, statusOfCreate, renewArticlesList, page, updateStatus}) => {


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
        if(statusOfCreate === successStatus) {
            renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
            history.push(path.home);
            updateStatus(null);
        }
        if(statusOfCreate === errorStatus) {
            openNotification('error', 'Error', 'Invalid');
            updateStatus(null);
        }
    }, [history, statusOfCreate, page, renewArticlesList, updateStatus]);


    useEffect(() => {
        initHistory();
    },[initHistory])


    return (
       <FormCreateEditArticle value={defaultValue} handlerSubmit={handlerSubmit} isLoad={statusOfCreate} title='' body='' description='' titleForm='Create new article'/>
    )
}
CreateArticle.defaultProps = {
    createArticle: ()=>{},
    updateStatus: () =>{},
    renewArticlesList: ()=>{},
    page: 1,
    statusOfCreate: 'loading',
}
CreateArticle.propTypes = {
    createArticle: PropTypes.func,
    updateStatus: PropTypes.func,
    renewArticlesList: PropTypes.func,
    page: PropTypes.number,
    statusOfCreate: PropTypes.string,
}
const mapStateToProps = (state) => {
    const statusOfCreate = state.createArticleReducer.createArticleStatus;
    const page = state.articlesReducer.currentPage;
    return {statusOfCreate, page};
}
const mapDispatchToProps = (dispatch) => ({
    createArticle: (data) => dispatch(createNewArticle(data)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
    updateStatus: (status) => dispatch(createArticleStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);