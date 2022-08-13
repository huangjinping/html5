/**
 * Created by harrishuang on 2017/11/27.
 */
(function (angular) {
    var hApp = angular.module("hApp", ['ngRoute', 'movieApp', 'movie_detail']);
    hApp.controller("hController", ["$scope", function ($scope) {
        $scope.text = "分付君";
    }]);
    hApp.config(['$routeProvider', function ($routeProvider) {
        console.log($routeProvider);
        console.log($routeProvider.caseInsensitiveMatch);
        $routeProvider.when("/a", {
            controller: 'MovieController',
            templateUrl: 'movie/view.html',
        }).when("/b", {
            controller: "MovieDetailController",
            templateUrl: "movie_detail/view.html"
        }).otherwise({
            redirectTo: "/b"
        })
    }]);


})(angular);