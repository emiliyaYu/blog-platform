import React from 'react';
import {useDispatch, connect} from "react-redux";
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import styles from './main-pagination.module.scss'
import {setCurrentPage, updateArticlesList} from "../../redux/actions/articles";
import {loadStatus} from "../../constants/status";

const MainPagination = ({setPage, isLoading, currentPage}) => {

    const dispatch = useDispatch();

    const changePage = (page) => {
        setPage(page)
        dispatch(updateArticlesList(5, page))
    }
    if(isLoading === loadStatus) {
        return null
    }
    return(
        <Pagination size="small" total={100} className={styles.pagination} pageSize={5} onChange={changePage}
        current={currentPage}
        style={{marginTop: '30px'}}/>
    )
}
MainPagination.defaultProps = {
    setPage: ()=>{},
    isLoading: 'loading',
    currentPage: 1
}
MainPagination.propTypes = {
    setPage: PropTypes.func,
    isLoading: PropTypes.string,
    currentPage: PropTypes.number
}
const mapStateToProps = (state) => ({
    isLoading: state.articlesReducer.articlesStatus,
    currentPage: state.articlesReducer.currentPage
})
const mapDispatchToProps = (dispatch) => ({
    setPage : (page) => dispatch(setCurrentPage(page))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPagination);