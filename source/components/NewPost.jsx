var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/NewPost.styl');

var NewPost = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired,
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
        </div>
      </div>
    );
  }
});

module.exports = NewPost;
