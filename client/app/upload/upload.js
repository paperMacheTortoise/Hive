angular.module('app.upload',['bizGramFactories'])
.controller('UploadController',function (Upload, Users, $rootScope){
	this.file = null;
	this.change= function(evt){
		this.file = evt.target.files[0];
		console.log(this.file);
		Upload.putFile(this.file,this.file.name,function(imgUrl){
			var users = Users.getUsers();
			var key = $rootScope.logInfo.$id;
			var i = users.$indexFor(key);
			users[i].pictureUrl=imgUrl;
			users.$save(i).then(function(){
				console.log('saved');
			});
		});
		// var reader = new FileReader();
		// reader.onloadend = function () {
		// console.log(reader.result);
		// };
		// reader.readAsBinaryString(this.file);
	};
	document.getElementById('file').addEventListener('change',this.change,false);
});