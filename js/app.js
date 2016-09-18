'use strict';

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('TodoListCtrl', ['$scope', '$http', 'AccessToken', function($scope, $http, AccessToken) {

  $scope.todo = {
    title: ""
  };
  $scope.todos = [];

  $scope.getTodos = function() {
    $http.get(fusio_url + 'todo').success(function(data){
      $scope.todos = data.entry.map(function(entry){
        entry.insertDate = new Date(entry.insertDate).toLocaleString();
        return entry;
      });
    });
  };

  $scope.insertTodo = function() {
    var accessToken = AccessToken.get();
    var config = {};
    if (accessToken != null) {
      config.headers = {};
      config.headers['Authorization'] = 'Bearer ' + accessToken.access_token;
    }

    $http.post(fusio_url + 'todo', $scope.todo, config).success(function(data){
      $scope.response = data;
      $scope.todo = {
        title: ""
      };
      $scope.getTodos();
    }).error(function(data){
      $scope.response = data;
    });
  };

  $scope.removeTodo = function(todo) {
    var accessToken = AccessToken.get();
    var config = {};
    if (accessToken != null) {
      config.headers = {};
      config.headers['Authorization'] = 'Bearer ' + accessToken.access_token;
    }

    $http.delete(fusio_url + 'todo/' + todo.id, config).success(function(data){
      $scope.response = data;

      $scope.getTodos();
    }).error(function(data){
      $scope.response = data;
    });
  };

  $scope.getTodos();

}]);

var todoApp = angular.module('todoApp', [
  'ngRoute',
  'oauth',
  'todoControllers'
]);

todoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/list.html',
      controller: 'TodoListCtrl'
    }).
    when('/access_token=:accessToken', {
      template: '',
      controller: function ($location, AccessToken) {
        var hash = $location.path().substr(1);
        AccessToken.setTokenFromString(hash);
        $location.path('/');
        $location.replace();
      }
    }).
    otherwise({
      redirectTo: '/'
    });
}]);


