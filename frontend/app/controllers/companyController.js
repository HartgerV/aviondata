angular.module('AD.controller.company', ['ngRoute'])
    .controller('AD.controller.company', ['$scope', '$http', '$routeParams', 'API', function ($scope, $http, $routeParams, API) {
        $scope.companyId = $routeParams.companyId;
        $scope.company = {};
        $scope.error = "";
        $http.get(API.ENDPOINT + $scope.companyId)
            .then(function (response) {
                    $scope.company = response.data.results[0];
                    $scope.error = "";
                },
                function(error) {
                    $scope.error = error;
                    if(error.status == -1) {
                        $scope.error.statusText = "The server seems to be offline.";
                    }
                    if(error.status == 404) {
                        $scope.error.statusText = "No results found.";
                    }
                });
        $scope.goBack = function() {
            window.history.back();
        }
    }]);

