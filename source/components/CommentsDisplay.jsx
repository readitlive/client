var React = require('react');
var R = require('ramda');

var CommentsStore = require('../stores/CommentsStore');
var CommentsActions = require('../actions/CommentsActions');

var constants = require('../constants/constants');

require('./__styles__/CommentsDisplay.styl');

var CommentEntry = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired
  },

  handleDelete(e) {
    e.stopPropagation();
    CommentsActions.delete(this.props.comment);
  },

  handlePost(e) {
    e.stopPropagation();
    CommentsActions.post(this.props.comment);
  },

  render() {
    var avatar = this.props.comment.avatarUrl || constants.Default_Avatar;

    return (
      <div className="card">
        <div className="flex-start">
          <img src={avatar} height="40" width="40" />
          <div className="comment-text">{this.props.comment.postText}</div>
        </div>
        <span onClick={this.handleDelete} className="delete-x">X</span>
        <div className="flex-box">
          <span>By: {this.props.comment.author}</span>
          <span onClick={this.handlePost} className="post-button">Post</span>
        </div>
      </div>
    );
  }

});


var CommentsDisplay = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      comments: CommentsStore.getComments()
    };
  },

  componentDidMount() {
    CommentsStore.addChangeListener(this.onStoreChange);
    CommentsStore.init(this.context.router.getCurrentParams().eventId)
  },

  componentWillUnmount() {
    CommentsStore.removeChangeListener(this.onStoreChange);
  },

  onStoreChange() {
    this.setState({comments: CommentsStore.getComments()});
  },

  renderComment(comment, i) {
    return (
      <CommentEntry comment={comment} isAdmin={this.props.isAdmin} key={i}/>
    )
  },

  render() {
    return (
      <div className="CommentsDisplay">
        {this.state.comments && R.map(this.renderComment, this.state.comments)}
      </div>
    );
  }
});

module.exports = CommentsDisplay;
