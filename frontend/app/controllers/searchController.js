angular.module('AD.controller.search', ['ngRoute'])
    .controller('AD.controller.search', ['$scope', '$http', '$timeout', '$location', 'API', function ($scope, $http, $timeout, $location,API) {
        $scope.query = "";
        $scope.lastQuery = "";
        $scope.results = {};
        $scope.error = "";
        $scope.blocked = false; //used for blocking the search function, to reduce the amount of requests

        $scope.block = function() {
            $scope.blocked = true;
        };
        $scope.unblock = function() {
            $scope.blocked = false;
            if($scope.lastQuery !== $scope.query) { //if the query has changed since blocking, execute it again
                $scope.search();
            }
        };
        $scope.search = function() {
            if(!$scope.blocked) {
                $scope.lastQuery = $scope.query;
                $scope.block();
                $http.get(API.ENDPOINT + $scope.query)
                    .then(function (response) {
                        $scope.results = response.data.results;
                        $scope.error = "";
                    },
                    function(error) {
                        $scope.error = error;
                        $scope.results = {};
                        if(error.status == -1) {
                            $scope.error.statusText = "The server seems to be offline.";
                        }
                        if(error.status == 404) {
                            $scope.error.statusText = "No results found.";
                        }
                    });
                $timeout($scope.unblock, 1000);
            }
        };
        $scope.openCompany = function(companyId) {
            $location.path('/company/'+companyId);
        };
    }]);

