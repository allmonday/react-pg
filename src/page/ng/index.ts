import * as angular from "angular";

angular.module("app", [])
    .controller("appController", function ($scope: angular.IScope) {
        $scope.name = "tangkikodo";
        let ctrl = this;
    })
    .service("appService", function ($http:angular.IHttpService) {
        $http.get("/api/hello").then((response) => {
            return "well done"
        })
    })
