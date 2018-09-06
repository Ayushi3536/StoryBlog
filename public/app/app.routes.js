angular.module('appRoutes',['ngRoute'])
 .config(function($routeProvider,$locationProvider){

	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html',
		controller:'MainController',
		controllerAs:'main'
	})
	.when('/api/login',{
		templateUrl:'app/views/pages/login.html'
	})
	.when('/api/signup',{
		templateUrl:'app/views/pages/signup.html'
	})
	$locationProvider.html5Mode(true);
});