angular.module('myApp',['storyService','storyCtrl','mainCtrl','authService','appRoutes','userCtrl','user'])
.config(function($httpProvider)
{
	$httpProvider.interceptors.push('AuthTokenInterceptor');
})