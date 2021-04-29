import React, {useEffect, useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import {editArticleFailed, updateArticle} from "../../redux/actions/edit-article";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import FormCreateEditArticle from "../form-component/form-edit-create-article/form-edit-create-article";

const EditArticle = ({article, editArticle, isError, page, renewArticlesList,updateIsError, isLoad}) => {

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
        if(isError === false){
            renewArticlesList(5, page);
            history.push(path.home);
            updateIsError(null)
        }
    },[history, isError, page, renewArticlesList, updateIsError])

    useEffect(() => {
        initHistory()
    },[initHistory])


    return (
        <FormCreateEditArticle value={defaultValues} handlerSubmit={handlerSubmit} body={body} title={title} isLoad={isLoad} description={description} titleForm='Edit Article'/>
    )

}
EditArticle.defaultProps = {
    article: {},
    isError: false,
    page: 1,
    isLoad: false,
    editArticle: ()=>{},
    renewArticlesList: ()=>{},
    updateIsError: ()=>{}

}
EditArticle.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        body: PropTypes.string,
        tagList: PropTypes.arrayOf(PropTypes.string),
        slug: PropTypes.string
    }),
    isError: PropTypes.bool,
    page: PropTypes.number,
    editArticle: PropTypes.func,
    renewArticlesList: PropTypes.func,
    updateIsError: PropTypes.func,
    isLoad: PropTypes.bool
}
const mapStateToProps = (state) => ({
    article: state.singleArticleReducer.articleSuccess.article,
    isError: state.editArticleReducer.editArticleFailed,
    page: state.articlesReducer.currentPage,
    isLoad: state.editArticleReducer.editArticleRequest
})
const mapDispatchToProps = (dispatch) => ({
    editArticle: (data, slug) => dispatch(updateArticle(slug, data)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
    updateIsError: (isError) => dispatch(editArticleFailed(isError))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);