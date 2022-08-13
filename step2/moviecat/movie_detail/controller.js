/**
 * Created by harrishuang on 2017/11/27.
 */
(function (angular) {
    var  moudle=angular.module('movie_detail',[]);
    moudle.controller("MovieDetailController",["$scope",function ($scope) {
        $scope.movie_detail_name="face++";
    }]);
})(angular);