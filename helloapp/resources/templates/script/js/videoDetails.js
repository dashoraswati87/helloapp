function getvideoDetails()
{	 showLoader();
	 var data = "url="+localStorage.getItem('videoUrl');
	 $.ajax({
	 type: "GET",		 
     url: window.location.origin+'/api/videoDetail',                                                          
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
			if(JSON.parse(data.responseText).response == "UNABLE_TO_FIND_START_PATTERN")
			{
				hideLoader();
				$("#title").html("Not Found");
				$("#author").html("Not Found");
				$("#thumbnailUrl").attr("src",window.location.origin+"/static/css/download.jpg");
			}
			else
			{
				var value = JSON.parse(data.responseText);
				var videoDetails = value.videoDetail[0];
				var title = videoDetails.title;
				var author = videoDetails.author;
				var thumbnailUrl = videoDetails.thumbnailUrl;
				$("#title").html(title);
				$("#author").html(author);
				$("#thumbnailUrl").attr("src",thumbnailUrl);
				var name = title.split("|");
				name = name.join("");
				localStorage.setItem("title",name);
				localStorage.setItem("author",author);
				localStorage.setItem("thumbnailUrl",thumbnailUrl);
				hideLoader();
			}
		}
     }
    });

}
getvideoDetails();

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
			if(JSON.parse(data.responseText).response == "UNABLE_TO_FIND_START_PATTERN")
			{
				hideLoader();
			}
			else
			{
				var value = JSON.parse(data.responseText);
				var videoDetails = value.mediaTypes;
				localStorage.setItem("videoDetails",JSON.stringify(videoDetails));
				videoDetails.forEach(function(videoDetail,i)
				{
					var mediaTypes = videoDetail.meadiType.replace("<","");
					mediaTypes = mediaTypes.replace(">","");
					var radioVal = i+1;
					var meadiaTypesDiv = "<div class='col-md-12 radioRow'><div class='col-md-1'><input type='radio' name='mediaRadio' value='"+radioVal+"' id='radioVal_"+radioVal+"'></div> <div class='col-md-10'><label for='radioVal_"+radioVal+"'>"+mediaTypes+"</label></div></div>";
					$("#meadiaTypesDiv").append(meadiaTypesDiv);
				});
				hideLoader();
			}
		}
     }
    });

}
getmediaTypeData();

function saveVideo()
{
	if($("input[name='mediaRadio']:checked").val() == undefined || $("input[name='mediaRadio']:checked").val() == "")
	{
		$("#invalidClick").removeClass('hide');
	}
	else
	{
		$("#invalidClick").addClass('hide');
		localStorage.setItem('mediaType',$("input[name='mediaRadio']:checked").val());
		var videoDetails = JSON.parse(localStorage.getItem("videoDetails"));
		videoDetails.forEach(function(videoDetail,i)
		{
			var mediaTypes = videoDetail.meadiType.replace("<","");
			mediaTypes = mediaTypes.replace(">","");
			var radioVal = i+1;
			if(radioVal == $("input[name='mediaRadio']:checked").val())
			{
				var meadiaArr = mediaTypes.split("(.");
				meadiaArr = meadiaArr[1].split(") -");
				var name = localStorage.getItem('title');
				localStorage.setItem("selectedMediaType", meadiaArr[0]);
			}
		});
		window.location.href="/youtubeAPI/progressPageView";
	}
}


