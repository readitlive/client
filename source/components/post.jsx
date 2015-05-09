var React = require('react');
var PostsActions = require('../actions/PostsActions');
var constants = require('../constants/constants');

var NewPost = require('./NewPost');

require('./__styles__/Post.styl');

var PostMeta = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    var avatar = this.props.post.avatarUrl || constants.Default_Avatar;
    return (
      <div style={{}}>
        <img className="img-responsive avatar-pic" height="80" width="80" src={avatar} />
        <p className="meta meta-time">{this.props.post.timeEU}</p>
      </div>
    );
  }
});

var PostText = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="body-text card" style={{flex: 1, 'margin-left': '24px'}}>
        <div className="author-name">{this.props.post.author}:</div>
        <div dangerouslySetInnerHTML={{__html: this.props.post.postText || this.props.post.replyText}}/>
      </div>
    );
  }
});

var AdminArea = React.createClass({
  propTypes: {
    editing: React.PropTypes.bool,
    handleReply: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
    handleEdit: React.PropTypes.func,
    handleEditCancel: React.PropTypes.func,
    handleEditSubmit: React.PropTypes.func
  },


  render() {
    if (this.props.editing) {
      return (
        <div className="flex-right">
          {this.props.handleEditCancel && <div className="hyperbutton" onClick={this.props.handleEditCancel}>Cancel</div>}
          {this.props.handleEditSubmit && <div className="hyperbutton" onClick={this.props.handleEditSubmit}>Save</div>}
        </div>
      );
    } else {
      return (
        <div className="flex-right">
          {this.props.handleReply && <div className="hyperbutton" onClick={this.props.handleReply}>Reply</div>}
          {this.props.handleDelete && <div className="hyperbutton" onClick={this.props.handleDelete}>Delete</div>}
          {this.props.handleEdit && <div className="hyperbutton" onClick={this.props.handleEdit}>Edit</div>}
        </div>
      );
    }
  }
});

var Editor = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      text: this.props.post.postText
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    var entryText = this.refs.text.getDOMNode().value;
    if (entryText) {
      this.props.handleSubmit(entryText);
    }
  },

  handleChange(e) {
    this.setState({text: e.target.value});
  },

  checkSubmit(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.handleSubmit(e);
    }
  },

  render() {
    return (
      <div className="body-text">
        <form className="body-text text-area" role="form">
          <textarea
            value={this.state.text}
            onKeyDown={this.checkSubmit}
            onChange={this.handleChange}
            ref="text" />
        </form>
      </div>
    );
  }
});

var Reply = React.createClass({
  propTypes: {
    reply: React.PropTypes.object.isRequired,
    post: React.PropTypes.object.isRequired,
    isAdmin: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleDelete() {
    PostsActions.deleteReply(this.props.post, this.props.index);
  },

  handleEditSubmit() {
    var replyText = this.refs.editor.refs.text.getDOMNode().value;
    this.props.reply.postText = replyText; //HACK
    PostsActions.editReply(this.props.post, this.props.reply, this.props.index);
    this.setState({editing: false})
  },

  renderEditor() {
    return (
      <div className="post-admin flex-box">
        <Editor
          post={this.props.reply}
          handleCancel={() => this.setState({editing: false}) }
          handleSubmit={this.handleEditSubmit}
          ref="editor"/>
      </div>
    );
  },

  render() {
    var adminArea = (
      <AdminArea
        handleEdit={() => this.setState({editing: true})}
        handleEditSubmit={this.handleEditSubmit}
        handleEditCancel={() => this.setState({editing: false})}
        handleDelete={this.handleDelete}
        editing={this.state.editing} />
    );

    var reply = (
      <PostText post={this.props.reply}/>
    );
    return (
      <div style={{marginTop: '20px'}}>
        {this.props.isAdmin && adminArea}
        <div className="flex-box">
          <PostMeta post={this.props.reply}/>
          {!this.state.editing ? reply : this.renderEditor()}
        </div>
      </div>
    );
  }
});

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    isAdmin: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    return {
      editing: false,
      replying: false
    };
  },

  renderReplies() {
    var replyEntry = (reply, i) => {
      return (
        <Reply reply={reply}
          post={this.props.post}
          key={i}
          index={i}
          isAdmin={this.props.isAdmin} />
      );
    };

    return (
      <div style={{marginLeft: '100px'}}>
        {this.props.post.replies.map(replyEntry)}
      </div>
    );
  },

  handleDelete() {
    PostsActions.delete(this.props.post)
  },

  handleEditSubmit() {
    var entry = this.refs.editor.refs.text.getDOMNode().value;
    PostsActions.update(this.props.post._id, entry, () => this.setState({editing: false}))
  },

  renderEditor() {
    return (
      <div className="post-admin flex-box">
        <Editor
          post={this.props.post}
          handleCancel={() => this.setState({editing: false}) }
          handleSubmit={this.handleEditSubmit}
          ref="editor"/>
      </div>
    );
  },

  submitReply(replyText) {
    PostsActions.reply(this.props.post, replyText);
  },

  renderReplyEditor() {
    return (
      <div style={{marginRight: '8%'}}>
        <NewPost submitAction={this.submitReply}
          handleCancel={() => this.setState({replying: false})}/>
      </div>
    );
  },

  render() {
    var post = (<PostText post={this.props.post}/>);

    var adminArea = (
      <AdminArea
        handleEdit={() => this.setState({editing: true})}
        handleEditSubmit={this.handleEditSubmit}
        handleEditCancel={() => this.setState({editing: false})}
        handleReply={() => this.setState({replying: true})}
        handleDelete={this.handleDelete}
        editing={this.state.editing} />
    );

    return (
      <div className="post">
        {this.props.isAdmin && adminArea}
        <div className="flex-box">
          <PostMeta post={this.props.post}/>
          {!this.state.editing ? post : this.renderEditor()}
        </div>
        {this.props.post.replies && this.renderReplies()}
        {this.state.replying && this.renderReplyEditor()}
      </div>
    );
  }
});

module.exports = Post;
