var React = require('react');
var PostsActions = require('../actions/PostsActions');
var constants = require('../constants/constants');

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
        <div className="author-name">{this.props.post.author}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.post.postText}}/>
      </div>
    );
  }
});

var AdminArea = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    editing: React.PropTypes.bool.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired
  },

  handleDelete() {
    PostsActions.delete(this.props.post)
  },

  handleSubmit() {
    var entry = this.refs.editor.refs.text.getDOMNode().value;
    this.props.handleSubmit(entry);
  },

  render() {
    if (this.props.editing) {
      return (
        <div className="post-admin flex-box">
          <Editor
            post={this.props.post}
            handleCancel={() => this.setState({editing: false}) }
            handleSubmit={this.handleSubmit}
            ref="editor"/>
          <div>
            <div className="hyperbutton" onClick={this.handleSubmit}>Save</div>
            <div className="hyperbutton" onClick={this.props.handleCancel}>Cancel</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-right">
          <div className="hyperbutton" onClick={this.handleDelete}>Delete</div>
          <div className="hyperbutton" onClick={this.props.handleEdit}>Edit</div>
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

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    isAdmin: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleSubmit(entry) {
    PostsActions.update(this.props.post._id, entry, () => this.setState({editing: false}))
  },

  render() {
    var post = (<PostText post={this.props.post}/>);

    var adminArea = (
      <AdminArea
        handleEdit={() => this.setState({editing: true})}
        handleCancel={() => this.setState({editing: false})}
        handleSubmit={this.handleSubmit}
        editing={this.state.editing}
        post={this.props.post} />
    );
    return (
      <div className="post">
        {this.props.isAdmin && adminArea}
        <div className="flex-box">
          <PostMeta post={this.props.post}/>
          {!this.state.editing && post}
        </div>
      </div>
    );
  }
});

module.exports = Post;
