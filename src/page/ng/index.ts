import * as angular from "angular";
import { sortedUniq } from "lodash";


angular.module("app", [])
    .provider("taskRunner", function() {
        let name = "default";
        this.setName = function (value: string) {
            name = value;
        }
        this.$get = function() {
            return new TaskRunner(name);
        }
        return this;
    })

    .config(function (taskRunnerProvider: any) {
        taskRunnerProvider.setName("hello");
    })
    .controller("testController", function($scope: angular.IScope) {
        let ctrl = this;
        ctrl.model = {
            name: "tangkikodo"
        }
    })
    .controller("appController", function ($scope: angular.IScope, unicornLauncher, taskRunner) {
        $scope.name = "tangkikodo";
        $scope.launch = () => {
            taskRunner.run();
            unicornLauncher.launch();
            console.log(unicornLauncher.count);
        }
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

    .factory("blurbHelper", function ($http: angular.IHttpService) {
        return function (scope: angular.IScope, elementString: string) {
            let matches = elementString.match(/\$\$blurb\[(\d+)\]/g);
            if (matches) {
                let blurbs = matches.map((item) => { return item.replace(/\$\$blurb\[/, "").replace("]", ""); })
                let uniqBlurbs = sortedUniq(blurbs);

                $http.get('/src/page/ng/resource/translate.json', {
                        params: {
                            b: blurbs
                        },
                        cache: true
                    })
                    .then((response)=> { 
                        scope.$$blurb = response.data;  
                    });

            }
        }   
    })

    .directive("myTemplate", function ($compile: angular.ICompileService, $http: angular.IHttpService, blurbHelper) {
        let templateString = `<div>
                <div ng-repeat="i in [1,2,3]">
                    <div>hello {{ $$blurb[111] }} </div>
                    <div>hello {{ $$blurb[112] }} </div> 
                    <div>hello {{ $$blurb[113] }} </div> 
                </div>
            </div> `;
        return {
            restrict: 'E',
            scope: {
            },
            template: templateString,
            compile: function (template) {
                return {
                    pre: function preLink(scope, element, attrs) {
                        blurbHelper(scope, templateString);
                    },
                    post: function postLink(scope, element, attrs) {
                        console.log(element[0]);
                        // put your regular request here
                    }
                }
            }
        }
    })
    .directive("mySecondTemplate", function ($compile: angular.ICompileService, $http: angular.IHttpService, blurbHelper) {
        let templateString = `<div>
                <div ng-repeat="i in [1,2,3]">
                    <div>hello {{ $$blurb[111] }} </div>
                    <div>hello {{ $$blurb[112] }} </div> 
                    <div>hello {{ $$blurb[114] }} </div> 
                </div>
            </div> `;
        return {
            restrict: 'E',
            scope: {
            },
            template: templateString,
            compile: function (template) {
                return {
                    pre: function preLink(scope, element, attrs) {
                        blurbHelper(scope, templateString);
                    },
                    post: function postLink(scope, element, attrs) {
                        console.log(element[0]);
                        // put your regular request here
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

    .filter("default", function (blurbService: (arg: string) => string) {
        return function (input: string, defaultValue: string) {
            return input ? input : defaultValue;
        }
    })

    .service("unicornLauncher", UnicornLauncher)

    function UnicornLauncher() {
        this.count = 0;
        this.launch = function() {
            console.log("launched");
            this.count++;
        }
    }

    class TaskRunner {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        run() {
            console.log(`${this.name} is running`);
        }

    }
