angular.module('myApp', [])
    .controller('MainController', ["$scope", "$http", function ($scope, $http) {
        let todoList = this;

        let onRepos = function (response) {
            todoList.userRepos = response.data;
            console.log(todoList.userRepos);
        }

        var onResponse = (resp) => {
            todoList.person = resp.data;

            var promise = $http.get(todoList.person.repos_url);
            promise.then(onRepos, onError);

            console.log(resp.data)
        };

        var onError = (reason) => {
            todoList.error = true;
            todoList.errorMessage = "An error has ocurred";

            console.log(todoList.errorMessage);
        };

        $scope.searchUser = function (userName) {
            var promise = $http.get("https://api.github.com/users/" + userName);
            promise.then(onResponse, onError);
        }



        todoList.message = "Hola";
    }]);