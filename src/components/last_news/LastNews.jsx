import React, { Component } from 'react';
import ArticleList from "./article_list/ArticleList.jsx";
import ArticleFilter from "./article_filter/ArticleFilter.jsx";

import "./LastNews.scss";
import {connect} from "react-redux";

class LastNews extends Component {
    constructor(props){
        super();
        this.state = {};
    }
    render(){
        return(
            <div className="last-news">
                {
                    this.props.error ?
                        <div className="alert alert-danger" role="alert">
                            {this.props.error}
                        </div>
                        :
                        null
                }
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <ArticleFilter/>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                            <ArticleList/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            error: state.error
        }
    }
)(LastNews);