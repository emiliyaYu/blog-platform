import React, {useEffect, useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import {useForm, useFieldArray, useController} from "react-hook-form";
import {Input} from 'antd';
import styles from './edit-article.module.scss';
import {updateArticle} from "../../redux/actions/edit-article";
import {getIsLogin, getUser} from "../../services/local-storage";
import {updateArticlesList} from "../../redux/actions/articles";

const EditArticle = ({article, jToken, editArticle, isError, page, renewArticlesList, isLogin}) => {
    const {TextArea} = Input;
    const {editArticleWrapper, editArticleTitle, editField, editItem, editTitle, editInput, editTagWrapper, tagsFieldWrapper, editSubmit, submitButton, tagsField, addButton, deleteButton} = styles;
    const {title, description, body, tagList, slug} = article;

    const tagsObject = tagList.map((tag) => Object.fromEntries([['name', tag]])); // для корректного представления в useForm

    const {register, control, handleSubmit} = useForm({
        defaultValues: {
            tags: tagsObject
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'tags',
        shouldUnregister: true
    });

    const { field } = useController({name: 'body', control, defaultValue: body});

    const handlerSubmit = (data) => {
        // eslint-disable-next-line no-shadow
        const {tags, body, title, description} = data;
        // eslint-disable-next-line no-shadow
        const newTags = tags.map(el => Object.values(el)).flat(); // удобный для запроса тег-лист
        const newData = {tagList: newTags, body, title, description};
        editArticle(newData, slug, jToken);
    }

    const history = useHistory();
    
    const initHistory = useCallback(() => {
        if(isLogin === false) history.push('/');
        if(isError === false){
            renewArticlesList(5, page);
            history.push('/article/:slug');
        }
    },[history, isError, isLogin, page, renewArticlesList])

    useEffect(() => {
        initHistory()
    },[initHistory])
    
    const newTagList = fields.map((tag,index) => {
        const lastTag = fields.indexOf(fields[fields.length - 1]);
        return (
            <div className={tagsField} key={tag.id}>
                <input className={editInput} type='text' placeholder='Tag'  defaultValue={tag.name}  {...register(`tags[${index}].name`)}/>
                <button type='button' className={deleteButton} onClick={()=>remove(index)}>Delete</button>
                {lastTag === index? <button type='button' className={addButton} onClick={() => append({name: ''})}>Add tag</button> : ''}
            </div>
        )
    })

    return (
        <div className={editArticleWrapper}>
            <span className={editArticleTitle}>Edit article</span>
            <div className={editField}>
                <label className={editItem}>
                    <span className={editTitle}>Title</span>
                    <input className={editInput} type='text' placeholder='Title' defaultValue={title} {...register('title')}/>
                </label>
                <label className={editItem}>
                    <span className={editTitle}>Short description</span>
                    <input className={editInput} type='text' placeholder='Description' defaultValue={description} {...register('description')}/>
                </label>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className={editItem}>
                    <span className={editTitle}>Text</span>
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }} defaultValue={body} {...field}/>
                </label>
            </div>
            <div className={editTagWrapper}>
                <span className={editTitle}>Tags</span>
                <div className={tagsFieldWrapper}>
                    {newTagList}
                </div>
            </div>
            <div className={editSubmit}>
                <button type='button' className={submitButton} onClick={handleSubmit(handlerSubmit)}>Send</button>
            </div>
        </div>
    )

}
EditArticle.defaultProps = {
    article: {},
    jToken: '',
    isError: false,
    page: 1,
    editArticle: ()=>{},
    renewArticlesList: ()=>{},
    isLogin: false,

}
EditArticle.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        body: PropTypes.string,
        tagList: PropTypes.arrayOf(PropTypes.string),
        slug: PropTypes.string
    }),
    jToken: PropTypes.string,
    isError: PropTypes.bool,
    page: PropTypes.number,
    editArticle: PropTypes.func,
    renewArticlesList: PropTypes.func,
    isLogin: PropTypes.func
}
const mapStateToProps = (state) => ({
    article: state.singleArticleReducer.articleSuccess.article,
    jToken: getUser() === null? '' : getUser().token,
    isError: state.editArticleReducer.editArticleFailed,
    page: state.articlesReducer.currentPage,
    isLogin: getIsLogin()
})
const mapDispatchToProps = (dispatch) => ({
    editArticle: (data,slug,token) => dispatch(updateArticle(slug, token, data)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);