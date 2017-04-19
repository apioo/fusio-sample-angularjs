'use strict';

angular.module('todo.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'TodoLoginCtrl'
    })
    .when('/logout', {
      templateUrl: 'app/auth/logout.html',
      controller: 'TodoLogoutCtrl'
    })
    .when('/register', {
      templateUrl: 'app/auth/register.html',
      controller: 'TodoRegisterCtrl'
    })
}])

.controller('TodoLoginCtrl', ['$scope', '$rootScope', '$location', '$auth', function($scope, $rootScope, $location, $auth) {

  $scope.user = {
    username: '',
    password: ''
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

  $scope.login = function(user) {
    $auth.login(JSON.stringify(user))
      .then(function() {
        $rootScope.isAuthenticated = $auth.isAuthenticated();
        $rootScope.userName = null;
        var payload = $auth.getPayload();
        if (payload && payload.name) {
          $rootScope.userName = payload.name;
        }

        $location.path('/');
      })
      .catch(function(response) {
        $scope.user.password = '';
        $scope.response = response.data;
      });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

}])

.controller('TodoLogoutCtrl', ['$scope', '$location', '$auth', '$rootScope', function($scope, $location, $auth, $rootScope) {

  $scope.logout = function() {
    if ($auth.isAuthenticated()) {
      $auth.logout().then(function(){
        $rootScope.isAuthenticated = $auth.isAuthenticated();
        $rootScope.userName = null;

        $location.path('/');
      });
    } else {
      $location.path('/');
    }
  };

  $scope.logout();

}])

.controller('TodoRegisterCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.user = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    captcha: ''
  };

  $scope.register = function(user) {
    var data = angular.copy(user);
    delete data.passwordRepeat;

    $http.post(fusio_url + 'consumer/register', data)
      .then(function(response) {
        $scope.response = response.data;
      })
      .catch(function(response) {
        $scope.user.password = '';
        $scope.user.passwordRepeat = '';
        $scope.response = response.data;
      });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

}]);
