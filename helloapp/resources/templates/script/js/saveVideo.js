$(document).ready(function()
{
	showLoader();
	var author = localStorage.getItem('author');
	var thumbnailUrl = localStorage.getItem('thumbnailUrl');
	$("#author").html(author);
	$("#thumbnailUrl").attr("src",thumbnailUrl);
	hideLoader();
});		

function getmediaTypeData()
{	
	 showLoader();
	 var data = "url="+localStorage.getItem('videoUrl');
	 $.ajax({
	 type: "GET",		 
     url: window.location.origin+'/api/mediaType',                                                          
	 data: data,
     dataType: 'application/json',  
     success: function(data)          
     {   
        console.log("success");
        console.log(data);
     },
    complete: function (data) {
		if(data.responseText)
		{
			var value = JSON.parse(data.responseText);
			var videoDetails = value.mediaTypes;
			videoDetails.forEach(function(videoDetail,i)
			{
				var mediaTypes = videoDetail.meadiType.replace("<","");
				mediaTypes = mediaTypes.replace(">","");
				var radioVal = i+1;
				var meadiaTypesDiv = "<div class='col-md-12 radioRow'><div class='col-md-1'><input type='radio' name='mediaRadio' value='"+radioVal+"' id='radioVal_"+radioVal+"'></div> <div class='col-md-10'><label for='radioVal_"+radioVal+"'>"+mediaTypes+"</label></div></div>";
				if(radioVal == localStorage.getItem("mediaType"))
				{
					$("#meadiaTypesDiv").append(meadiaTypesDiv);
					var meadiaArr = mediaTypes.split("(.");
					meadiaArr = meadiaArr[1].split(") -");
					var name = localStorage.getItem('title');
					$("#title").html(name+"."+meadiaArr[0]);
				}
			});
			hideLoader();
		}
     }
    });

}
getmediaTypeData();

function saveVideo()
{
	var data = "url="+localStorage.getItem('videoUrl')+"&type="+localStorage.getItem('mediaType')+"&name="+localStorage.getItem('title')+".mp4";
	$.ajax({
		type: "GET",		 
		url: window.location.origin+'/api/saveVideo', 
		data: data,
		dataType: 'application/json',  
		success: function(data)          
		{   
			console.log("success");
			console.log(data);
		},
		complete: function (data) 
		{
			if(data)
			{
				if(JSON.parse(data.responseText).response == "COMPLETE")
				{
					console.log("COMPLETE")
				}
				else
				{
					console.log(JSON.parse(data.responseText).response)
				}
			}
			
		}
	});
}


