angular.module('myApp',['reverseDirective','storyService','storyCtrl','mainCtrl','authService','appRoutes','userCtrl','user'])
.config(function($httpProvider)
{
	$httpProvider.interceptors.push('AuthTokenInterceptor');
})