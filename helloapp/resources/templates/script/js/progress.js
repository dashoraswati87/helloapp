$(document).ready(function()
{
	if(localStorage.getItem("ImageConvert") == "true")
	{
		$(".tabs li a").removeClass("active");
		$("#image").addClass("active");
		var imageName = localStorage.getItem("imageName");
		$("#thumbnailUrlSmall").attr("src",window.location.origin+"/static/downloads/"+imageName);
		$("#xcxcxcxcx").attr("href",window.location.origin+"/static/downloads/"+imageName);
		progressBarFunc(5);
	}
	else if(localStorage.getItem("fileConvert") == "true")
	{
		$("#imageDiv").addClass("hide");
		$(".tabs li a").removeClass("active");
		$("#document").addClass("active");
		var fileName = localStorage.getItem("fileName");
		$("#xcxcxcxcx").attr("href",window.location.origin+"/static/downloads/"+fileName);
		progressBarFunc(5);
	}
	else
	{
		if(localStorage.getItem("IsDownloaded"))
		{
			$("#thumbnailUrlSmall").attr("src",localStorage.getItem('thumbnailUrl'));
			var progressbar=$("#progressbar");
			addValue=progressbar.val("100");
			$(".progress_value").html("100%");
			$("#xcxcxcxcx").attr("href",localStorage.getItem("destinationUrl"));
			$("#xcxcxcxcx").removeClass("hide");
		}
		else
		{
			$("#thumbnailUrlSmall").attr("src",localStorage.getItem('thumbnailUrl'));
			$("#imageDiv").removeClass("hide");
			$(".tabs li a").removeClass("active");
			$("#video").addClass("active");
			saveVideo();
			progressBarFunc(25);
		}
	}
	$("#loaderDiv").addClass('hide');
});

function saveVideo()
{
	var data = "url="+localStorage.getItem('videoUrl')+"&type="+localStorage.getItem('mediaType')+"&name="+localStorage.getItem('title')+"."+localStorage.getItem("selectedMediaType");
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
					var destinationarr = "static/downloads";
					var downloadUrl = 'http://127.0.0.1:5000/'+destinationarr;
					var title = localStorage.getItem("title");
					var FileName = title.split(" ");
					FileName = FileName.join("_")
					var selectedMediaType = localStorage.getItem("selectedMediaType");
					localStorage.setItem("destinationUrl",downloadUrl+"/"+FileName+"."+selectedMediaType);
					$("#xcxcxcxcx").attr("href",downloadUrl+"/"+FileName+"."+selectedMediaType);
					$("#xcxcxcxcx").removeClass("hide");
					localStorage.setItem("IsDownloaded","true");
				}
				else
				{
					console.log(JSON.parse(data.responseText).response)
				}
			}
			
		}
	});
}

function progressBarFunc(val){
   var progressbar=$("#progressbar");
    max=progressbar.attr('max');
    value=progressbar.val();
    time=(1000/max)*val;

    var loading=function(){
      value+=1;
      addValue=progressbar.val(value);
      $(".progress_value").html(value+"%");
      if(value==max)
        clearInterval(animate);
		if(value == 100)
		{	
			if(localStorage.getItem("ImageConvert") == "true" || localStorage.getItem("fileConvert") == "true")
			{
				$("#xcxcxcxcx").removeClass("hide");
			}
		}
    }
    
    var animate=setInterval(function(){
      loading();
    },time);
}