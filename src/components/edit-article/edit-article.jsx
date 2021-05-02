import React, {useEffect, useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import {editArticleStatus, updateArticle} from "../../redux/actions/edit-article";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import FormCreateEditArticle from "../form-component/form-edit-create-article/form-edit-create-article";
import {successStatus} from '../../constants/status'

const EditArticle = ({article, editArticle, page, renewArticlesList, updateStatus, statusOfEdit}) => {

    const {title, description, body, tagList, slug} = article;


    const tagsObject = tagList === undefined ? [{name: ''}] : tagList.map((tag) => Object.fromEntries([['name', tag]])); // для корректного представления в useForm

        const defaultValues = {
            tagList: tagsObject
        }

    const handlerSubmit = (data) => {
        // eslint-disable-next-line no-shadow
        const {tagList, body, title, description} = data;
        // eslint-disable-next-line no-shadow
        const newTags = tagList.map(el => Object.values(el)).flat(); // удобный для запроса тег-лист
        const newData = {tagList: newTags, body, title, description};
        editArticle(newData, slug);
    }

    const history = useHistory();
    
    const initHistory = useCallback(() => {
        if(statusOfEdit === successStatus){
            renewArticlesList(5, page);
            history.push(path.home);
            updateStatus(null)
        }
    },[history, statusOfEdit, page, renewArticlesList, updateStatus])

    useEffect(() => {
        initHistory()
    },[initHistory])


    return (
        <FormCreateEditArticle value={defaultValues} handlerSubmit={handlerSubmit} body={body} title={title} isLoad={statusOfEdit} description={description} titleForm='Edit Article'/>
    )

}
EditArticle.defaultProps = {
    article: {},
    page: 1,
    statusOfEdit: 'loading',
    editArticle: ()=>{},
    renewArticlesList: ()=>{},
    updateStatus: ()=>{}

}
EditArticle.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        body: PropTypes.string,
        tagList: PropTypes.arrayOf(PropTypes.string),
        slug: PropTypes.string
    }),
    page: PropTypes.number,
    editArticle: PropTypes.func,
    renewArticlesList: PropTypes.func,
    updateStatus: PropTypes.func,
    statusOfEdit: PropTypes.bool
}
const mapStateToProps = (state) => ({
    article: state.singleArticleReducer.articleEntities.article,
    statusOfEdit: state.editArticleReducer.editArticleStatus,
    page: state.articlesReducer.currentPage,
})
const mapDispatchToProps = (dispatch) => ({
    editArticle: (data, slug) => dispatch(updateArticle(slug, data)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
    updateStatus: (status) => dispatch(editArticleStatus(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);