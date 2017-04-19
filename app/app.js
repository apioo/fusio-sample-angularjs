'use strict';

var todoApp = angular.module('todoApp', [
  'ngRoute',
  'ui.bootstrap',
  'satellizer',
  'noCAPTCHA',
  'todo.todo',
  'todo.auth'
]);

todoApp.value('version', 'v0.3');

todoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    otherwise({
      redirectTo: '/'
    });
}]);

todoApp.run(function($rootScope, $window, $location, $http, $auth, version) {
  // set version
  $rootScope.isAuthenticated = $auth.isAuthenticated();
  $rootScope.userName = null;
  var payload = $auth.getPayload();
  if (payload && payload.name) {
    $rootScope.userName = payload.name;
  }
  $rootScope.version = version;
});

