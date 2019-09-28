import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from './article_list/ArticleList';
import ArticleFilter from './article_filter/ArticleFilter';
import './LastNews.scss';

function LastNews(props) {
  const {
    error,
  } = props;
  return (
    <div className="last-news">
      {
        error
          ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )
          : null
      }
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <ArticleFilter />
          </div>
          <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  );
}
LastNews.defaultProps = {
  error: '',
};
LastNews.propTypes = {
  error: PropTypes.string,
};
export default connect(
  (state) => ({
    error: state.error,
  }),
)(LastNews);
