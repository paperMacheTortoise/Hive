angular.module('uploadFactory', [])

.factory('Upload', function (){
  var uploadFactory={};
	AWS.config.update({accessKeyId: 'AKIAIVEO6DBRV7OF7YDA', secretAccessKey: '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'});
	AWS.config.region = 'us-west-2';
	var s3 = new AWS.S3({params:{Bucket:'bizgram'}});
  uploadFactory.putFile = function(body, name, callback){
    s3.upload({
      Body: body,
      Key: 'images/'+name,
      ACL: "public-read-write"
    },function(err,data){
      if(err){
        console.log(err);
      }
      else{
        console.log(data);
        callback('https://drgvq3mghnaxi.cloudfront.net/images/'+name);
      }
    });
  };
  return uploadFactory;
});