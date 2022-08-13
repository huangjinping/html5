/**
 * Created by harrishuang on 2017/11/27.
 */
(function (angular) {
    var movieApp = angular.module("movieApp", []);
    movieApp.controller("MovieController", ["$scope", function ($scope) {
        console.log($scope);
        $scope.name="么说啥";

    }]);
})(angular);