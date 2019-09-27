import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionRefetchData, actionToggleSort } from '../../../store/actions';
import { getData } from '../../../helpers';
import ArticlePreview from './article_previews/ArticlePreview';
import './ArticleList.scss';

class ArticleList extends Component {
  componentDidMount() {
    const { refetch, sources } = this.props;
    getData(sources)
      .then((art) => {
        refetch(art);
      })
      .catch((err) => {
        refetch(err);
      });
  }

  render() {
    const {
      toggleSort,
      articles,
      loading,
      sort,
    } = this.props;
    const result = articles.length;
    if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    if (result) {
      return (
        <div className="article-list">
          <div className="sort-row text-right">
            <button type="button" className="sort-btn" onClick={toggleSort}>
              <span>Sort by date</span>
              {
                  sort
                    ? <i className="fas fa-sort-down ml-3" />
                    : <i className="fas fa-sort-up ml-3" />
              }
            </button>
          </div>
          {
              articles.map((article) => (
                <ArticlePreview
                  key={article.id}
                  date={article.date}
                  image={article.image}
                  category={article.category}
                  title={article.title}
                  preamble={article.preamble}
                />
              ))
          }
        </div>
      );
    }
    return (
      <div className="article-list">
        <div className="no-result">
          <p>No results</p>
          <i className="fas fa-frown-open" />
        </div>
      </div>
    );
  }
}
ArticleList.propTypes = {
  toggleSort: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  sort: PropTypes.bool.isRequired,
  articles: PropTypes.shape([]).isRequired,
  sources: PropTypes.shape([]).isRequired,
}
export default connect(
  (state) => ({
    articles: state.articles,
    loading: state.loading,
    sort: state.sort,
    sources: state.sources,
  }),
  (dispatch) => ({
    refetch: bindActionCreators(actionRefetchData, dispatch),
    toggleSort: bindActionCreators(actionToggleSort, dispatch),
  }),
)(ArticleList);
