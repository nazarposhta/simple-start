import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actionChangeSource, actionRefetchData } from '../../../store/actions';
import { getData } from '../../../helpers';
import './ArticleFilter.scss';

const sourceList = [
  {
    title: 'fashion',
    url: '/articles/fashion',
  },
  {
    title: 'sports',
    url: '/articles/sports',
  },
];
class ArticleFilter extends Component {
  updateSources(url) {
    const { sources, changeSource, refetch } = this.props;
    let newSources = sources;
    if (sources.indexOf(url) === -1) {
      newSources = [...newSources, url];
    } else {
      newSources = sources.filter((elem) => elem !== url);
    }
    getData(newSources)
      .then((art) => {
        if (!art.message) {
          changeSource(url);
        }
        refetch(art);
      })
      .catch((err) => {
        refetch(err);
      });
  }

  render() {
    const { sources } = this.props;
    return (
      <div className="article-filter">
        <p>Data sources</p>
        {
          sourceList.map((source) => (
            <div key={source.url} data-id={source.title} className="form-group form-check">
              <input
                checked={sources.indexOf(source.url) >= 0}
                id={source.title}
                type="checkbox"
                className="form-check-input align-middle"
                onChange={() => { this.updateSources(source.url); }}
              />
              <label htmlFor={source.title} className="form-check-label align-middle ml-1 text-capitalize">
                {source.title}
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}
ArticleFilter.propTypes = {
  refetch: PropTypes.func.isRequired,
  changeSource: PropTypes.func.isRequired,
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default connect(
  (state) => ({
    sources: state.sources,
  }),
  (dispatch) => ({
    refetch: bindActionCreators(actionRefetchData, dispatch),
    changeSource: bindActionCreators(actionChangeSource, dispatch),
  }),
)(ArticleFilter);
