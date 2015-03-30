var React = require('react');

var NewPost = React.createClass({
  render: function() {
      return (
        <div className="NewPost card">
          <form className="container" role="form">
            <textarea className=""></textarea>
            <button className="">Comment</button>
          </form>
        </div>
      );
  }
});

module.exports = NewPost;
