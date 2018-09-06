angular.module('storyCtrl',['storyService'])
.controller('StoryController',function(Story){
    var vm =this;
	Story.allStory().then(function(response)
	{
	       var data= response.data;
           vm.stories=data;
	})
	vm.createStory=function()
	{
	Story.createStory(vm.storyData).success(function(data)
	{
	//var data = response.data
	//clear up the form
	vm.stories='';
	vm.message=data.message;
	vm.stories.push(data);

	});
	};
})