import React, { Component } from 'react';
import moment from 'moment';
import no_image from '../../../../images/no_image.jpg';
import './ArticlePreview.scss';

class ArticlePreview extends Component {
    constructor(props){
        super();
        this.state = {};
    }
    render(){
        return(
            <div className="article-preview">
                <div className="row">
                    <div className="col-4">
                        <img src={this.props.image || no_image} className="img-fluid img-thumbnail" alt={this.props.title}/>
                    </div>
                    <div className="col-8">
                        <div className="text-preview">
                            <div className="preview-head">
                                <h4 className="ellipsis preview-title">
                                    {this.props.title}
                                </h4>
                                <small className="preview-date">{ moment(this.props.date).format('DD. MMM YYYY') }</small>
                            </div>
                            <p className="clamp preview-preamble">{this.props.preamble}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ArticlePreview;