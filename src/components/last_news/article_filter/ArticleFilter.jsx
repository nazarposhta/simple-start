import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  actionConcatingData, actionShowError, actionFilteringData,
} from '../../../store/actions';
import { executeUrl } from '../../../helpers';
import './ArticleFilter.scss';

const sourceList = [
  {
    title: 'fashion',
    url: '/articles/fashion',
  },
  {
    title: 'sport',
    url: '/articles/sports',
  },
];
class ArticleFilter extends Component {
  async updateSources(e, url, title) {
    const { filteringData, showError, concatingData } = this.props;
    if (e.target.checked) {
      try {
        const result = await executeUrl(url);
        concatingData({
          data: result,
          category: url,
        });
      } catch (error) {
        showError('Unexpected error');
      }
    } else {
      filteringData({
        title, url,
      });
    }
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
                onChange={(e) => { this.updateSources(e, source.url, source.title); }}
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
  filteringData: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  concatingData: PropTypes.func.isRequired,
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(
  (state) => ({
    sources: state.sources,
  }),
  (dispatch) => ({
    showError: bindActionCreators(actionShowError, dispatch),
    filteringData: bindActionCreators(actionFilteringData, dispatch),
    concatingData: bindActionCreators(actionConcatingData, dispatch),
  }),
)(ArticleFilter);
