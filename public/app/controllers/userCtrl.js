angular.module('userCtrl',['user'])
.controller('UserController',function(User)
{
	var vm=this;
	User.all().then(function(response)
	{
		var data=response.data;
	     vm.users=data;
	})


})
.controller('UserCreateController',function(User,$location,$window)
{
	var vm=this;
	vm.signupUser = function()
	{
		vm.message='';
		User.create(vm.userData).then
		(function(response){

			vm.userData={};
			vm.message=response.data.message;
			$window.localStorage.setItem('token',response.data.token);
			$location.path('/');
		})
	}
});