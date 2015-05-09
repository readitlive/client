var React = require('react');
var R = require('ramda');

// var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');
var Post = require('./Post');

var Feed = React.createClass({

  propTypes: {
    isAdmin: React.PropTypes.bool.isRequired,
    postsData: React.PropTypes.array.isRequired
  },

  render() {
    var postNodes;
    if (this.props.postsData) {
      postNodes = R.map((post, i) => {
        return (
          <Post post={post} isAdmin={this.props.isAdmin} key={i}/>
        );
      }, this.props.postsData);
    }

    return (
      <div className="ril-container" style={{flex: 1}}>
        {postNodes}
      </div>
    );
  }
});

module.exports = Feed;
