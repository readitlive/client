var React = require('react');

var LoginStore = require('../stores/LoginStore');

var LoginActions = require('../actions/LoginActions');

require('./__styles__/UserBox.styl');

var UserBox = React.createClass({
  render() {
    return !this.props.user ? <Login /> : <User user={this.props.user}/>;
  }
});

var Login = React.createClass({
  getInitialState() {
    return {
      expanded: false,
      signup: false,
      username: '',
      password: '',
      confirmPassword: ''
    };
  },

  expandToggle() {
    this.setState({
      expanded: !this.state.expanded,
      signup: false
    });
  },

  goSignup() {
    this.setState({
      signup: true
    })
  },

  goLogin() {
    this.setState({
      signup: false
    })
  },

  handleLogin() {
    var username = this.refs.username.getDOMNode().value;
    var password =  this.refs.password.getDOMNode().value;
    LoginActions.loginUser(username, password);
  },

  handleSignup() {
    var username = this.refs.username.getDOMNode().value;
    var password =  this.refs.password.getDOMNode().value;
    LoginActions.signupUser(username, password);
  },

  render() {
    var dropdown;
    if (this.state.expanded) {

      dropdown = (
        <div className="login-dropdown card">
          <div className="header-container">
            <h5 className="margin-0">Login</h5>
            <button
              className="button button-primary"
              onClick={this.goSignup}>
               Signup
            </button>
          </div>
          <span>Username:</span>
          <input
            type="email"
            ref="username" />

          <span>Password:</span>
          <input
            ref="password"
            type="password"/>
          <button
            className="button button-primary"
            onClick={this.handleLogin}>
              Submit
          </button>
          <button
            className="button"
            onClick={this.expandToggle}>
              Cancel
          </button>
        </div>
      );
    }
    if (this.state.signup && this.state.expanded) {
      dropdown = (
        <div className="login-dropdown card">
        <div className="header-container">
          <h5 className="margin-0">Signup</h5>
          <button
            className="button button-primary"
            onClick={this.goLogin}>
             Login
          </button>
        </div>

          <div>
            <span>Username:</span>
            <input
              type="email"
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
              className="button button-promary"
              onClick={this.handleSignup}>
                Signup
            </button>
            <button
              className="button"
              onClick={this.expandToggle}>
                Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="LoginBox">
        <span onClick={this.expandToggle} className="login-text">Sign in/up</span>
        {dropdown}
      </div>
    );

  }

});

var User = React.createClass({
  getInitialState() {
    return {
      expanded: false,
      avatarAdd: false
    };
  },

  expandToggle() {
    this.setState({
      expanded: !this.state.expanded,
      avatarAdd: false
    });
  },

  handleLogout() {
    LoginActions.logoutUser();
  },

  _onAddAvatarClick() {
    this.setState({
      avatarAdd: true
    });
  },

  render() {
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
  }
});

module.exports = UserBox;
