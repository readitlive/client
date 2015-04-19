var React = require('react');

var LoginStore = require('../stores/LoginStore');

var LoginActions = require('../actions/LoginActions');

require('./__styles__/UserBox.styl');

var UserBox = React.createClass({

  //if the user is not logged in, show sign in/up
  // componentDidMount: function() {
  //   LoginStore.addChangeListener(this._onLoginChange);
  // },
  // componentWillUnmount: function() {
  //   LoginStore.removeChangeListener(this._onLoginChange);
  // },
  // _onLoginChange: function () {
  //   //
  // }

  render: function() {
    if (!this.props.user) {
      return (
        <Login />
      );
    } else {
      return (
        <User user={this.props.user}/>
      );
    }
  }
});

var Login = React.createClass({
  getInitialState: function () {
    return {
      expanded: false,
      signup: false,
      username: '',
      password: '',
      confirmPassword: ''
    };
  },

  render: function() {
    var dropdown;
    if (this.state.expanded) {

      dropdown = (
        <div className="login-dropdown">
          <span>
            <h3 className="margin-0">Login
              <button
                className="btn btn-default btn-sm margin-10 "
                onClick={this.goSignup}>
                 Signup
              </button>
            </h3>
          </span>

          <div>
            <span>Username:</span>
            <input
              ref="username" />

            <span>Password:</span>
            <input
              ref="password"
              type="password"/>
            <button
              className="btn btn-primary btn-sm margin-10"
              onClick={this._onSubmit}>
                Submit
            </button>
            <button
              className="btn btn-default btn-sm"
              onClick={this.expandToggle}>
                Cancel
            </button>
          </div>
        </div>
      );
    }
    if (this.state.signup && this.state.expanded) {
      dropdown = (
        <div className="login-dropdown">
          <h3 className="margin-0">Signup</h3>

          <div>
            <span>Username:</span>
            <input
              ref="username" />

            <span>Password:</span>
            <input
              ref="password"
              type="password" />

            <span>Confirm password:</span>
            <input
              ref="password"
              type="password" />
            <button
              className="btn btn-primary btn-sm margin-10"
              onClick={this._onSignup}>
                Signup
            </button>
            <button
              className="btn btn-default btn-sm"
              onClick={this.expandToggle}>
                Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <a className="login-text" onClick={this.expandToggle}>
        Sign in/up
        {dropdown}
      </a>
    );

  },

  expandToggle: function () {
    this.setState({
      expanded: !this.state.expanded,
      signup: false
    });
  },

  goSignup: function() {
    this.setState({
      signup: true
    })
  },

  handleLogin: function() {
    var username = this.refs.username.getDOMNode().value;
    var password =  this.refs.password.getDOMNode().value;
    LoginActions.loginUser(username, password);
  },

  handleSignup: function() {
    var username = this.refs.username.getDOMNode().value;
    var password =  this.refs.password.getDOMNode().value;
    LoginActions.signupUser(username, password);
  },

});


var User = React.createClass({
  getInitialState: function() {
    return {
      expanded: false,
      avatarAdd: false
    };
  },
  render: function () {
    var avatar = this.props.user.avatarUrl || 'http://higoodbye.com/assets/img/default-avatar.jpg';
    var dropdown;

    if (this.state.expanded) {

      dropdown = (
        <div className="login-dropdown card">
          <div>
            <button
              className="btn btn-primary btn-sm margin-10"
              onClick={this.handleLogout}>
                Logout
            </button>
            <button
              className="btn btn-default btn-sm"
              onClick={this.expandToggle}>
                Cancel
            </button>
            <button
              className="btn btn-primary btn-sm margin-10"
              onClick={this._onAddAvatarClick}>
                Add/Change Avatar
            </button>
          </div>
        </div>
      );
    }

    if (this.state.avatarAdd && this.state.expanded) {
      dropdown = (
        <div className="login-dropdown card">
          <h4 className="margin-0">Upload new avatar:</h4>
          <input type="file" className="btn" id="avatar-upload-file" />
          <button
            className="btn btn-default btn-sm"
            onClick={this.expandToggle}>
              Cancel
          </button>

        </div>
      );
    }


    return (
      <div onClick={this.expandToggle} className="UserBox">
        <img className="img-responsive nava-ava" src={avatar} />
        <div className="navbar-text navbar-user">
          <div className="username">
            {this.props.user.username}
          </div>
        </div>
        {dropdown}
      </div>
    );
  },

  expandToggle: function () {
    this.setState({
      expanded: !this.state.expanded,
      avatarAdd: false
    });
  },

  handleLogout: function() {
    LoginActions.logoutUser();
  },

  _onAddAvatarClick: function () {
    this.setState({
      avatarAdd: true
    });
  }

});



module.exports = UserBox;







  // _onSubmit: function() {
  //   var username = this.refs.username.getDOMNode().value;
  //   var password =  this.refs.password.getDOMNode().value;
  //   LoginActionsCreators.loginUser(username, password);

  // },
