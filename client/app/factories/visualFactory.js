angular.module('visualFactory', ['firebase'])

.factory('Visualization', ['$firebaseArray', function ($firebaseArray){
	
	var visualFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/visualizations');

	var visualId = '';
	visualFactory.setName = function(name){
		visualId = name;
	}

	visualFactory.getName = function(){
		return visualId;
	}

	visualFactory.getMessages = function(name){
		var messageRef = ref.child(name).child('messages');
		messages = $firebaseArray(messageRef);
		return messages;
	};

	visualFactory.addMessage = function(user, name, text){
		var messageRef = ref.child(name).child('messages');
		messages = $firebaseArray(messageRef);
		messages.$add({
			username: user,
			text: text,
			createdAt: Firebase.ServerValue.TIMESTAMP
		});
	};

	visualFactory.customTooltip = function(tooltipId, width) {
		
	  $("body").append("<div class='tooltip' id='"+tooltipId+"'></div>");
	  
	  if(width){
	    $("#"+tooltipId).css("width", width);
	  }
	  
	  
	  function showTooltip(content, event){
	    $("#"+tooltipId).html(content);
	    $("#"+tooltipId).show();
	    
	    updatePosition(event);
	  }
	  
	  function hideTooltip(){
	    $("#"+tooltipId).hide();
	  }
	  
	  hideTooltip();

	  function updatePosition(event){
	    var ttid = "#"+tooltipId;
	    var xOffset = 20;
	    var yOffset = 10;
	    
	     var ttw = $(ttid).width();
	     var tth = $(ttid).height();
	     var wscrY = $(window).scrollTop();
	     var wscrX = $(window).scrollLeft();
	     var curX = (document.all) ? event.clientX + wscrX : event.pageX;
	     var curY = (document.all) ? event.clientY + wscrY : event.pageY;
	     var ttleft = ((curX - wscrX + xOffset*2 + ttw) > $(window).width()) ? curX - ttw - xOffset*2 : curX + xOffset;
	     if (ttleft < wscrX + xOffset){
	      ttleft = wscrX + xOffset;
	     } 
	     var tttop = ((curY - wscrY + yOffset*2 + tth) > $(window).height()) ? curY - tth - yOffset*2 : curY + yOffset;
	     if (tttop < wscrY + yOffset){
	      tttop = curY + yOffset;
	     } 
	     $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
	  }
	  
	  return {
	    showTooltip: showTooltip,
	    hideTooltip: hideTooltip,
	    updatePosition: updatePosition
	  };
	};

	visualFactory.addCommas = function(nStr)
	{
	  nStr += '';
	  x = nStr.split('.');
	  x1 = x[0];
	  x2 = x.length > 1 ? '.' + x[1] : '';
	  var rgx = /(\d+)(\d{3})/;
	  while (rgx.test(x1)) {
	    x1 = x1.replace(rgx, '$1' + ',' + '$2');
	  }
	  return x1 + x2;
	};
	
	return visualFactory;
}]);