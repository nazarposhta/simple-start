import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import noImage from '../../../../images/no_image.jpg';
import './ArticlePreview.scss';

function ArticlePreview(props) {
  const {
    image, title, date, preamble,
  } = props;
  return (
    <div className="article-preview">
      <div className="row">
        <div className="col-4">
          <img src={image || noImage} className="img-fluid img-thumbnail" alt={title} />
        </div>
        <div className="col-8">
          <div className="text-preview">
            <div className="preview-head">
              <h4 className="ellipsis preview-title">
                {title}
              </h4>
              <small className="preview-date">{ moment(date).format('DD. MMM YYYY') }</small>
            </div>
            <p className="clamp preview-preamble">{preamble}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
ArticlePreview.defaultProps = {
  image: '',
};
ArticlePreview.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  preamble: PropTypes.string.isRequired,
}
export default ArticlePreview;
