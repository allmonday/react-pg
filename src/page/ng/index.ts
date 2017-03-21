import * as angular from "angular";


angular.module("app", [])
    .controller("testController", function($scope: angular.IScope) {
        let ctrl = this;
        ctrl.model = {
            name: "tangkikodo"
        }
    })
    .controller("appController", function ($scope: angular.IScope) {
        $scope.name = "tangkikodo";
        let ctrl = this;
    })
    .service("appService", function ($http:angular.IHttpService) {
        $http.get("/api/hello").then((response) => {
            return "well done"
        })
    })
    .directive('testCase', function() {
        let config: angular.IDirective = {
            restrict: "AE",
            scope: {
                inputValue: '@'
            },
            link: function(scope, element, attr) {
            },
            template: `<h5>hello {{ inputValue }}</h5>`
        };
        return config;
    })
    .directive("testWrap", function () {
        let config: angular.IDirective = {
            transclude: true,
            restrict: 'E',
            scope: {},
            template: `<div>wrapper <div ng-transclude></div></div>` 
        }
        return config;
    })
    .directive("draggableElement", function ($document: angular.IDocumentService) {
        let config: angular.IDirective = {
            link: function(scope, element, attr) {
                let startX = 0, startY = 0, x = 0, y = 0;
                element.css({
                    position: 'relative',
                    border: '1px solid red',
                    padding: '10px',
                    display: 'inline-block',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer'
                });

                element.on("mousedown", function(event: Event) {
                    event.preventDefault();
                    startX = (<MouseEvent>event).pageX - x;
                    startY = (<MouseEvent>event).pageY - y;
                    $document.on('mousemove', mousemove)
                    $document.on('mouseup', mouseup)
                });

                function mousemove(event: Event) {
                    y = (<DragEvent>event).pageY - startY;
                    x = (<DragEvent>event).pageX - startX;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mousemoup', mouseup);
                }

            }
        }
        return config;
    })

    .directive("parentNode", function () {
        function ParentNodeController($scope: angular.IScope): void {
            let ctrl = this;
            $scope.count = 0;
            ctrl.foo = function (arg: string) {
                console.log(arg);
                $scope.count += 1;
            } 
        }
        let config:angular.IDirective = {
            restrict: 'E',
            transclude: true,
            scope: {},
            template: `<div>parent node count: {{ count }} <div ng-transclude></div></div>`,
            controller: ParentNodeController 
        }
        return config;
    })

    .directive("childNode", function () {
        let config:angular.IDirective = {
            restrict: 'E',
            require: "^^parentNode",
            scope: {},
            template: `<button ng-click="click()">click me</button>`,
            link: function (scope, element, attrs, ctrls) {
                scope.click = function () {
                    (<any>ctrls).foo("hello");
                }
            }
        }
        return config;
    })


    .directive("myNgBind", function($compile: angular.ICompileService) {
        return {
            restrict: 'AC',
            compile: function (template) {
                console.log(template);  
                return function (scope, element, attr) {
                    let domElement = element[0];
                    scope.$watch(attr.myNgBind, function (value) {
                        domElement.textContent = JSON.stringify(value);
                    })
                }
            }
        }
    })

    .directive("myTemplate", function ($compile: angular.ICompileService) {
        return {
            restrict: 'E',
            scope: {
                content: "@"
            },
            template: `<div>hello {{ content }} </div>`,
            compile: function (template) {
                // console.log(template[0]);
                let dom = template[0];
                console.log(dom.innerHTML);
                
                return {
                    pre: function preLink(scope, element, attrs) {
                        console.log('prelink');
                        element.append("<p>hel</p>");
                        console.log(element[0].innerHTML);
                    },
                    post: function postLink(scope, element, attrs) {
                        console.log('postlink');
                        console.log(element[0].innerHTML);
                    }
                }
            }
        }
    })


    .factory("blurbService", function () {
        let cache: {[key: string]: string} = {}; 
        return function(blurb: string) {
            if (blurb in cache) {
                return cache[blurb];
            } else {
                cache[blurb] = `hello ${blurb}`;
                return cache[blurb];
            }
        }
    })

    .filter("blurb", function (blurbService: (arg: string) => string) {
        return function (input: string) {
            return blurbService(input);
        }
    })