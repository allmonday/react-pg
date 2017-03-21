import * as angular from "angular";
import "angular-jwt";
import "angular-animate";
import "angular-aria";
import "angular-material"

angular.module("app", [ 'angular-jwt', 'ngMaterial'])
    .config(function ($httpProvider: angular.IHttpProvider, jwtOptionsProvider: any) {
        jwtOptionsProvider.config({
            tokenGetter: function () {
                let jwt = localStorage.getItem('jwt');
                return jwt;
            },
            whiteListedDomains: ['localhost'],
        });

        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .controller("appController", function (
        $scope: angular.IScope, 
        $http: angular.IHttpService, 
        jwtHelper) {
            let vm = this;
            vm.model = {
                name: "",
                email: "kimiaj@126.com",
                password: "123456",
                posts: [],
                payload: "",

                login: () => {
                    $http.post("//localhost:3000/authenticate", {
                        email: vm.model.email,
                        password: vm.model.password
                    }).then(function (response) {
                        console.log(response);
                        let jwt = (<any>response.data).auth_token;
                        localStorage.setItem('jwt', jwt);
                        let expToken = jwtHelper.decodeToken(jwt);
                        vm.model.payload = expToken;
                    }, function (error) {
                        console.error(error); 
                    })
                },
                register: () => {
                    $http.post("//localhost:3000/users", {
                        email: vm.model.email,
                        password: vm.model.password
                    }).then(function (response) {
                    }, function (error) {
                        console.error(error); 
                    })
                },
                refresh: () => {
                    $http({
                        method: 'get',
                        url: "//localhost:3000/posts"
                    }).then(function(response) {
                        vm.model.posts = response.data;
                    }, function () {})
                },
                title: "",
                body: "",
                addPost: () => {
                    $http({
                        method: "post",
                        url: "//localhost:3000/posts",
                        data: {
                            title: vm.model.title, 
                            body: vm.model.body
                        }
                    }).then(function (response) {
                        vm.model.refresh();
                    })
                }
            }
    })
