angular.module('uploadFactory', ['ngImgur'])

.factory('Upload', ['imgur', function (imgur){
  var uploadFactory={};

  uploadFactory.putFile = function(file, filename, callback){
  	imgur.setAPIKey('Client-ID 83d05ca770c0014');
  	imgur.upload(file).then(function(data){
  		callback(data.link);
  	});
  };

  return uploadFactory;
}]);