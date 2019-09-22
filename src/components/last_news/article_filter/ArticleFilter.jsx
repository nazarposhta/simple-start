import "./ArticleFilter.scss";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {actionChangeSource, actionRefetchData} from '../../../store/actions';
import {bindActionCreators} from "redux";
import { getData } from '../../../helpers';

// action which we run in current component
export const ACTION_CHANGE_SOURCE = 'ACTION_CHANGE_SOURCE';

const sourceList = [
    {
        title: 'fashion',
        url: '/articles/fashion'
    },
    {
        title: 'sports',
        url: '/articles/sports'
    }
]
class ArticleFilter extends Component {
    constructor(props){
        super();
    }
    updateSources(url){
        const { sources, changeSource, refetch } = this.props;
        let new_sources = sources;
        if(sources.indexOf(url) === -1){
            new_sources = [...new_sources, url];
        } else {
            new_sources = sources.filter(elem => elem !== url)
        }
        getData(new_sources)
            .then((art) => {
                if(!art.message){
                    changeSource(url);
                }
                refetch(art);
            })
            .catch((err) => {
                refetch(err);
            })
    }
    render(){
        const { sources } = this.props;
        return(
            <div className="article-filter">
                <p>Data sources</p>
                {
                    sourceList.map((source) => {
                        return(
                            <div key={source.url} data-id={source.title} className="form-group form-check">
                                <input
                                    checked={sources.indexOf(source.url) >= 0}
                                    id={source.title}
                                    type="checkbox"
                                    className="form-check-input align-middle"
                                    onChange={() => {this.updateSources(source.url)}}
                                />
                                <label htmlFor={source.title} className="form-check-label align-middle ml-1 text-capitalize">
                                    {source.title}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            sources: state.sources
        }
    },
    (dispatch) => {
        return {
            refetch: bindActionCreators(actionRefetchData, dispatch),
            changeSource: bindActionCreators(actionChangeSource, dispatch)
        }
    }
)(ArticleFilter);