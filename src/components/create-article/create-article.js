import React from 'react';
import { Input } from 'antd';
import styles from './create-article.module.scss'

const CreateArticle = () => {
    const {TextArea} = Input;
    const {createArticleWrapper,createArticleTitle, createField, createItem, createTitle, createInput, createTagWrapper, tagsField,
         deleteButton, addButton, createSubmit, submitButton} = styles;
    return (
        <div className={createArticleWrapper}>
            <span className={createArticleTitle}>Create new article</span>
            <div className={createField}>
                <label className={createItem}>
                    <span className={createTitle}>Title</span>
                    <input className={createInput} type='text' placeholder='Title'/>
                </label>
                <label className={createItem}>
                    <span className={createTitle}>Short description</span>
                    <input className={createInput} type='text' placeholder='Description'/>
                </label>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className={createItem}>
                    <span className={createTitle}>Text</span>
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                </label>
            </div>
            <div className={createTagWrapper}>
                <span className={createTitle}>Tags</span>
                <label className={tagsField}>
                    <input className={createInput} type='text' placeholder='Tag'/>
                    <button type='button' className={deleteButton}>Delete</button>
                    <button type='button' className={addButton}>Add tag</button>
                </label>
            </div>
            <div className={createSubmit}>
                <button type='button' className={submitButton}>Send</button>
            </div>
        </div>
    )
}

export default CreateArticle;