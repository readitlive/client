var React = require('react');
var PostsActions = require('../actions/PostsActions');

var S3Uploader = require('../libs/S3Uploader');

require('./__styles__/NewPost.styl');

var NewPost = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired,
    imageUpload: React.PropTypes.bool,
    handleCancel: React.PropTypes.func,
    customAction: React.PropTypes.object
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

  handleImageUpload(signingData) {
    this.refs.text.getDOMNode().value = this.refs.text.getDOMNode().value +
      '<img src="https://liveblogphotos2.s3-us-west-2.amazonaws.com/' +
      signingData.filename + '" class="post-image"></img>';
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

  handleCustom(e) {
    e.preventDefault();
    var entryText = this.refs.text.getDOMNode().value;
    if (entryText) {
      this.props.customAction.action(entryText);
      this.refs.text.getDOMNode().value = '';
    }
  },

  renderCustom() {
    return (
      <div onClick={this.handleCustom}
        className="hyperbutton">
        {this.props.customAction.label}
      </div>
    );
  },

  render() {
    return (
      <div className="NewPost">
        <form className="body-text text-area flex-right" role="form">
          <textarea className="card" onKeyDown={this.checkSubmit} ref="text"></textarea>
        </form>
        <div className="flex-right">
          {this.props.imageUpload && <S3Uploader onFinish={this.handleImageUpload}/>}
          {this.props.handleCancel && this.renderCancel()}
          {this.props.customAction && this.renderCustom()}
          <div className="hyperbutton" onClick={this.handleSubmit}>Comment</div>
        </div>
      </div>
    );
  }
});

module.exports = NewPost;
