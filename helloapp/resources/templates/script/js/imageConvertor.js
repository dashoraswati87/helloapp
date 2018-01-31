$(document).ready(function()
{
	localStorage.clear();
	CleanDownloadDirectory();
	hideLoader();
	$('#uploadImg').change(function() 
	{
		var file = $(this)[0].files[0];
		var fileName = file.name;
		var fileExt = fileName.split('.').pop();
		localStorage.setItem('fileName',fileName);
		console.log($(this)[0].value);
		if(fileExt.toUpperCase() == "PNG" || fileExt.toUpperCase() == "TIFF" || fileExt.toUpperCase() == "PPM" || fileExt.toUpperCase() == "JPG" || fileExt.toUpperCase() ==  "BMP" || fileExt.toUpperCase() == "TGA" || fileExt.toUpperCase() == "WEBP" || fileExt.toUpperCase() == "PBM")
		{
			$("#ErrorMsg").addClass("hide");
		}
		else
		{
			$("#ErrorMsg").removeClass("hide");
		}
	});
});
function convertImg()
{
	localStorage.setItem("ImageConvert","true");
	window.location.href="/youtubeAPI/progressPageView";
}

function upload(event) {
event.preventDefault();
var datar = new FormData($('form').get(0));

$.ajax({
    url: window.location.origin+'/imagesapi/uploadFile',
    type: $(this).attr('method'),
    data: datar,
    cache: false,
    processData: false,
    success: function(data) {
        
    }, complete: function (data) {
		console.log(data);
		// if(data.responseText)
		// {
			// convertImg();
			// hideLoader();
		// }
     }
});
return false;
}
$(function() {
    $('form').submit(upload);
});

function getConvertImg()
{	
	showLoader();
	 var dt = new Date();
	 var time = dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();
	 localStorage.setItem("imageName","image_"+time+"."+$("#imgFormats").val());
	 var data = "formate="+$("#imgFormats").val()+"&imgName=image_"+time;
	 $.ajax({
	 type: "GET",		 
     url: window.location.origin+'/imagesapi/convertSomeToSomeView',                                                          
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
			convertImg();
			hideLoader();
		}
     }
    });
}

