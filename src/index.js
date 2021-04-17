import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import BlogApp from "./components/blog-app/blog-app";
import './index.scss'

ReactDOM.render(<Provider store={store}>
    <BlogApp/>
</Provider>, document.getElementById('root'))