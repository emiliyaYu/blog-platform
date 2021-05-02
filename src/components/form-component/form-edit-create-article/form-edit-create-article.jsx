import React from 'react';
import PropTypes from 'prop-types';
import {useForm, useFieldArray, useController} from "react-hook-form";
import {Input} from "antd";
import validate from "../../create-article/validate";
import styles from "./form-edit-create-article.module.scss";
import checkboxDisabledStatus from "../../../utilts/checkboxDisabledStatus";


const FormCreateEditArticle = ({value, handlerSubmit, description, body, title, titleForm, isLoad}) => {


    const isDisabled = checkboxDisabledStatus(isLoad);

    const {createArticleWrapper,createArticleTitle, createField, createItem, createTitle, createInput, createTagWrapper, tagsField,
        deleteButton, addButton, createSubmit, submitButton, tagsFieldWrapper, errorMessage} = styles;

    const {register, handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: value
    });
    const { fields, append, remove } = useFieldArray({
            control,
            name: "tagList"
        }
    );
    const { field } = useController({name: 'body', control, rules:{...validate.validateBody}});

    const tagList = fields.map((tag, index)=> {
        const lastTag = fields.indexOf(fields[fields.length - 1]);
        const firstTag = fields.indexOf(fields[0]);
        return (
            <div className={tagsField} key={tag.id}>
                <input className={createInput} type='text' placeholder='Tag' {...register(`tagList[${index}].name` )} defaultValue='' disabled={isDisabled}/>
                {errors.index}
                {firstTag !== index || fields.length > 1 ? <button type='button' className={deleteButton} onClick={() => remove(index)}>Delete</button> : ''}
                {lastTag === index ? <button type='button' className={addButton} onClick={() => append({name: ''})}>Add tag</button> : ''}
            </div>
        )
    })
    const {TextArea} = Input;

    return (
        <div className={createArticleWrapper}>
            <span className={createArticleTitle}>{titleForm}</span>
            <div className={createField}>
                <label className={createItem}>
                    <span className={createTitle}>Title</span>
                    <input className={createInput} type='text' defaultValue={title} placeholder='Title' disabled={isDisabled} {...register('title', {...validate.validateTitle})}/>
                    {errors.title && <p className={errorMessage}>{errors.title.message}</p>}
                </label>
                <label className={createItem}>
                    <span className={createTitle}>Short description</span>
                    <input className={createInput} type='text' defaultValue={description} placeholder='Description' disabled={isDisabled} {...register('description',{...validate.validateDescription})}/>
                    {errors.description && <p>{errors.description.message}</p>}
                </label>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className={createItem}>
                    <span className={createTitle}>Text</span>
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }} {...field} defaultValue={body} disabled={isDisabled}/>
                    {errors.body && <p className={errorMessage}>{errors.body.message}</p>}
                </label>
            </div>
            <div className={createTagWrapper}>
                <span className={createTitle}>Tags</span>
                <div className={tagsFieldWrapper}>
                    {tagList}
                </div>
            </div>
            <div className={createSubmit}>
                <button type='button' className={submitButton} onClick={handleSubmit(handlerSubmit)} disabled={isLoad}>Send</button>
            </div>
        </div>
    )

}
FormCreateEditArticle.defaultProps = {
    value: {},
    handlerSubmit: ()=>{},
    title: '',
    body: '',
    description: '',
    titleForm: '',
    isLoad: '',
}
FormCreateEditArticle.propTypes = {
    value: PropTypes.shape({}),
    handlerSubmit: PropTypes.func,
    title: PropTypes.string,
    body: PropTypes.string,
    description: PropTypes.string,
    titleForm: PropTypes.string,
    isLoad: PropTypes.string
}
export default FormCreateEditArticle;