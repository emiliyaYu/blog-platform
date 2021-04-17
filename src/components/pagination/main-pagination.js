import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Pagination } from 'antd';
import styles from './main-pagination.module.scss'
import {setCurrentPage} from "../../redux/actions/articles";

const MainPagination = ({setPage, isLoading, currentPage}) => {

    const changePage = (page) => {
        setPage(page)
    }
    if(isLoading === true) {
        return null
    }
    return(
        <Pagination size="small" total={100} className={styles.pagination} pageSize={5} onChange={changePage}
        current={currentPage}
        style={{marginTop: '30px', marginBottom: '20px'}}/>
    )
}
MainPagination.defaultProps = {
    setPage: ()=>{},
    isLoading: true,
    currentPage: 1
}
MainPagination.propTypes = {
    setPage: PropTypes.func,
    isLoading: PropTypes.bool,
    currentPage: PropTypes.number
}
const mapStateToProps = (state) => ({
    isLoading: state.getArticleRequestReducer,
    currentPage: state.currentPageReducer
})
const mapDispatchToProps = (dispatch) => ({
    setPage : (page) => dispatch(setCurrentPage(page))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPagination);