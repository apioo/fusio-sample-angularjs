'use strict';

angular.module('todo.todo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'app/todo/list.html',
      controller: 'TodoListCtrl'
    })
}])

.controller('TodoListCtrl', ['$scope', '$http', '$auth', function($scope, $http, $auth) {

  $scope.todo = {
    title: ""
  };
  $scope.todos = [];

  $scope.getTodos = function() {
    $http.get(fusio_url + 'todo')
      .then(function(response){
        $scope.todos = response.data.entry.map(function(entry){
          entry.insertDate = new Date(entry.insertDate).toLocaleString();
          return entry;
        });
      })
      .catch(function(response){
        $scope.response = response.data;
      });
  };

  $scope.insertTodo = function() {
    var config = {};
    if ($auth.isAuthenticated()) {
      config.headers = {};
      config.headers['Authorization'] = 'Bearer ' + $auth.getPayload().sub;
    }

    $http.post(fusio_url + 'todo', $scope.todo, config)
      .then(function(response){
        $scope.response = response.data;
        $scope.todo = {
          title: ""
        };
        $scope.getTodos();
      })
      .catch(function(response){
        $scope.response = response.data;
      });
  };

  $scope.removeTodo = function(todo) {
    var config = {};
    if ($auth.isAuthenticated()) {
      config.headers = {};
      config.headers['Authorization'] = 'Bearer ' + $auth.getPayload().sub;
    }

    $http.delete(fusio_url + 'todo/' + todo.id, config)
      .then(function(response){
        $scope.response = response.data;

        $scope.getTodos();
      })
      .catch(function(response){
        $scope.response = response.data;
      });
  };

  $scope.getTodos();

}]);
