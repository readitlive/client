var React = require('react');
var PostsActions = require('../actions/PostsActions');

var S3Uploader = require('../libs/S3Uploader');

require('./__styles__/NewPost.styl');

var NewPost = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired,
    imageUpload: React.PropTypes.bool,
    handleCancel: React.PropTypes.func
  },

  handleSubmit(e) {
    e.preventDefault();
    var entryText = this.refs.text.getDOMNode().value;
    if (entryText) {
      this.props.submitAction(entryText);
      this.refs.text.getDOMNode().value = '';
    }
  },

  checkSubmit(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.handleSubmit(e);
    }
  },

  onCancel(e) {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  },

  renderCancel() {
    return (
      <div className="hyperbutton" onClick={this.onCancel}>Cancel</div>
    );
  },

  render() {
    return (
      <div className="NewPost">
        <form className="body-text text-area flex-right" role="form">
          <textarea className="card" onKeyDown={this.checkSubmit} ref="text"></textarea>
        </form>
        <div className="flex-right">
          {this.props.handleCancel && this.renderCancel()}
          <div className="hyperbutton" onClick={this.handleSubmit}>Comment</div>
          {this.props.imageUpload && <S3Uploader signingUrl="fake"/>}
        </div>
      </div>
    );
  }
});

module.exports = NewPost;
