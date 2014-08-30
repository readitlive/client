var LoginStore = require('../stores/LoginStore');

var LoginActions = require('../actions/LoginActions');

var UserBox = React.createClass({

  //if the user is not logged in, show sign in/up
  //

  // componentDidMount: function() {
  //   LoginStore.addChangeListener(this._onLoginChange);
  // },

  // componentWillUnmount: function() {
  //   LoginStore.removeChangeListener(this._onLoginChange);
  // },

  render: function() {

    if (!this.props.user) {
      return (
        <Login />
      );
    } else {
      var avatar = this.props.user.avatarUrl || 'http://higoodbye.com/assets/img/default-avatar.jpg';
      return (
        <li>
          <img className="img-responsive nava-ava" src={avatar} />
          <div className="navbar-text navbar-user">
            <a className="login-text">{this.props.user.username}</a>
          </div>
        </li>
      );
    }
  },



  // _onLoginChange: function () {
  //   //
  // }
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
              type="password"/>

            <span>Confirm password:</span>
            <input
              ref="password"
              type="password"/>
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
      <li className="navbar-text">
        <a className="login-text" onClick={this.expandToggle}>Sign in/up</a>
        {dropdown}
      </li>
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


module.exports = UserBox;







  // _onSubmit: function() {
  //   var username = this.refs.username.getDOMNode().value;
  //   var password =  this.refs.password.getDOMNode().value;
  //   LoginActionsCreators.loginUser(username, password);

  // },
