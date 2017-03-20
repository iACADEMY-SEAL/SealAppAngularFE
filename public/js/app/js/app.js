'use strict';

angular.module('seal-app', [
  'ngAnimate',
  'ui.router',

  'home-controllers',
  'home-directives',

  'user-controllers',
  'user-directives'
])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider,
                $httpProvider) {

            var templatesPath = 'js/app/partials/';
            console.log('test');
            $locationProvider.html5Mode(true);

            $stateProvider
            .state('home', {
                url: '/',
                templateUrl: templatesPath + 'home.html' /* js/app/partials/home.html */
            })
            .state('login', {
                url: '/login',
                templateUrl: templatesPath + 'user/login.html' /* js/app/partials/home.html */
            })
            ;


            var errorInterceptor = ['$q', '$injector', function($q, $injector) {
                return {
                    'responseError': function(rejection) {
                        if(rejection.status == 500) {
                            $injector.get('$state').transitionTo('error.servererror');
                        }

                        return $q.reject(rejection);
                    }
                };
            }];

}]);
