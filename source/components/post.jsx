var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/Post.styl');

var PostMeta = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    var avatar = this.props.post.avatarUrl || '/img/default-avatar.png';
    return (
      <div className="two columns">
        <img className="img-responsive avatar-pic" height="80" width="80" src={avatar} />
        <p className="meta">{this.props.post.author}</p>
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
      <div className="eight columns body-text"
        dangerouslySetInnerHTML={{__html: this.props.post.postText}}/>
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
        <div className="ten columns post-admin" style={{display: 'flex', 'justify-content': 'space-between'}}>
          <Editor
            post={this.props.post}
            handleCancel={() => this.setState({editing: false}) }
            handleSubmit={this.handleSubmit}
            ref="editor"/>
          <div>
            <button onClick={this.handleSubmit}>Save</button>
            <button onClick={this.props.handleCancel}>Cancel</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="two columns">
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.props.handleEdit}>Edit</button>
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
      <div className="eight columns body-text">
        <form className="ten columns body-text text-area" role="form">
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
      <div className="row card post">
        <PostMeta post={this.props.post}/>
        {!this.state.editing && post}
        {this.props.isAdmin && adminArea}
      </div>
    );
  }
});

module.exports = Post;
