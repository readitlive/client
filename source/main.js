var React = require('react');
var ReactRouter = require('react-router');
var {DefaultRoute, Route} = ReactRouter;
var LoginStore = require('./stores/LoginStore');
var PostsStore = require('./stores/PostsStore');

var WriteApp = require('./components/WriteApp');

var stub = React.createClass({
  render() {
    return <div />;
  }
});

var routes = (
  <Route name='app' path='/' handler={WriteApp}>
  </Route>
);
      // <DefaultRoute name='qandA' handler={QandA}></DefaultRoute>
      // <DefaultRoute handler={Start}></DefaultRoute>

// Init
LoginStore.init();
PostsStore.init();

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
