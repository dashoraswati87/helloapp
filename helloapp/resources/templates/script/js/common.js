function showLoader()
{
	$("#loaderDiv").removeClass('hide');
}
function hideLoader()
{
	$("#loaderDiv").addClass('hide');
}
function CleanDownloadDirectory()
{	
	showLoader();
	var data;
	 $.ajax({
	 type: "GET",		 
     url: window.location.origin+'/api/CleanDownloadDirectory',                                                          
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
			hideLoader();
		}
     }
    });
}