var React = require('react');
window.React = React;
var ReactRouter = require('react-router');
var {DefaultRoute, Route, RouteHandler} = ReactRouter;
var LoginStore = require('./stores/LoginStore');

var WriteApp = require('./components/WriteApp');
var EventsList = require('./components/EventsList');

var stub = React.createClass({
  render() {
    return <RouteHandler />;
  }
});

var routes = (
  <Route name='app' path='/' handler={stub}>
    <Route name='write' path='write/?:eventId?' handler={WriteApp} />
    <DefaultRoute name='events' handler={EventsList} />
  </Route>
);

// Init
LoginStore.init();

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
