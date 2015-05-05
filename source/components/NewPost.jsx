var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/NewPost.styl');

var NewPost = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired
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

  render() {
    return (
      <div className="NewPost flex-box">
        <form className="body-text text-area" role="form">
          <textarea className="card" onKeyDown={this.checkSubmit} ref="text"></textarea>
        </form>
        <div className="hyperbutton" onClick={this.handleSubmit}>Comment</div>
      </div>
    );
  }
});

module.exports = NewPost;
