import * as angular from "angular";


angular.module("app", [])
    .controller("appController", function ($scope: angular.IScope, $http: angular.IHttpService) {
        // $http.get("//localhost:3000/users").then(function (data) {
        //     console.log(data);
        // }, function (error) {
        //     console.error(error);
        // })
        $http.post("//localhost:3000/authenticate", {
            email: "kimiaj@126.com",
            password: "123456"
        }).then(function (data) {
            console.log(data); 
        }, function (error) {
            console.error(error); 
        })

    })
