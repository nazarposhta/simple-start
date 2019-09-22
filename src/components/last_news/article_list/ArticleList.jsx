import "./ArticleList.scss";
import React, { Component } from 'react';
import ArticlePreview from './article_previews/ArticlePreview.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionRefetchData, actionToggleSort } from '../../../store/actions';
import { getData } from '../../../helpers';

// action which we run in current component
export const ACTION_REFETCH_DATA = 'ACTION_REFETCH_DATA';
export const ACTION_TOGGLE_SORT = 'ACTION_TOGGLE_SORT';

class ArticleList extends Component {
    constructor(props){
        super();
    }
    componentDidMount() {
        const { refetch, sources } = this.props;
        getData(sources)
            .then((art) => {
                refetch(art);
            })
            .catch((err) => {
                refetch(err);
            })
    }
    render() {
        let { toggleSort } = this.props;
        let result = this.props.articles.length;
        if(this.props.loading){
            return(
                <div>
                    Loading...
                </div>
            )
        }
        if(result){
            return(
                <div className="article-list">
                    <div className="sort-row text-right">
                        <a className="sort-btn" onClick={toggleSort}>
                            <span>Sort by date</span>
                            {
                                this.props.sort ?
                                    <i className="fas fa-sort-down ml-3"></i>
                                    :
                                    <i className="fas fa-sort-up ml-3"></i>
                            }
                        </a>
                    </div>
                    {
                        this.props.articles.map((article) => {
                            return(
                                <ArticlePreview
                                    key={article.id}
                                    date={article.date}
                                    image={article.image}
                                    category={article.category}
                                    title={article.title}
                                    preamble={article.preamble}
                                />
                            )
                        })
                    }
                </div>
            )
        }
        return(
            <div className="article-list">
                <div className="no-result">
                    <p>No results</p>
                    <i className="fas fa-frown-open"></i>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            articles: state.articles,
            loading: state.loading,
            sort: state.sort,
            sources: state.sources
        }
    },
    (dispatch) => {
        return {
            refetch: bindActionCreators(actionRefetchData, dispatch),
            toggleSort: bindActionCreators(actionToggleSort, dispatch)
        }
    }
)(ArticleList);