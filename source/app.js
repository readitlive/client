/** @jsx React.DOM */

var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

var WriteApp = require('./components/WriteApp');

var routes = (
  <Routes location='hash'>
    <Route name='app' path='/' handler={WriteApp}>
    </Route>
  </Routes>
);

      // <DefaultRoute name='qandA' handler={QandA}></DefaultRoute>
      // <DefaultRoute handler={Start}></DefaultRoute>
React.renderComponent(routes, document.body);
