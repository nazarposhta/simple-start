import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionRefetchData, actionToggleSort, actionShowError } from '../../../store/actions';
import { executeUrl } from '../../../helpers';
import ArticlePreview from './article_previews/ArticlePreview';
import './ArticleList.scss';

class ArticleList extends Component {
  async componentDidMount() {
    const { refetch, sources, showError } = this.props;
    try {
      const result = await executeUrl(sources[0]);
      refetch(result);
    } catch (e) {
      showError('Unexpected error');
    }
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
          <p className="h1">No results</p>
          <i className="fas fa-frown-open display-1 text-black-50" />
        </div>
      </div>
    );
  }
}
ArticleList.propTypes = {
  showError: PropTypes.func.isRequired,
  toggleSort: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  sort: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
};
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
    showError: bindActionCreators(actionShowError, dispatch),
  }),
)(ArticleList);
