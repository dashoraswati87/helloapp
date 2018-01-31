$(document).ready(function()
{
	localStorage.clear();
	CleanDownloadDirectory();
	hideLoader();
	$('#uploadFile').change(function() 
	{
		var file = $(this)[0].files[0];
		var fileName = file.name;
		var fileExt = fileName.split('.').pop();
		localStorage.setItem('fileName',fileName);
		localStorage.setItem("fileExt", fileExt);
		if(fileExt.toUpperCase() == "PDF")
		{
			$("#ErrorMsg").addClass("hide");
			var ConvOp = "<option value='txt'>Text File</option><option value='docx'>Document File</option>";
			$("#fileFormats").html(ConvOp);
		}
		else if(fileExt.toUpperCase() == "DOCX")
		{
			$("#ErrorMsg").addClass("hide");
			var ConvOp = "<option value='txt'>Text File</option><option value='pdf'>PDF</option>";
			$("#fileFormats").html(ConvOp);
		}
		else if(fileExt.toUpperCase() == "TXT")
		{
			$("#ErrorMsg").addClass("hide");
			var ConvOp = "<option value='docx'>Document File</option><option value='pdf'>PDF</option>";
			$("#fileFormats").html(ConvOp);
		}
		else
		{
			$("#ErrorMsg").removeClass("hide");
		}
	});
});
function convertFile()
{
	localStorage.setItem("fileConvert","true");
	window.location.href="/youtubeAPI/progressPageView";
}

function convertFileFormate()
{
	var uploadedExt = localStorage.getItem("fileExt");
	var convertExt = $("#fileFormats").val();
	if(uploadedExt.toUpperCase() == "PDF" && convertExt.toUpperCase() == "TXT")
	{
		getConvertPDF(100);
	}
	else if(uploadedExt.toUpperCase() == "PDF" && convertExt.toUpperCase() == "DOCX")
	{
		getConvertPDF(200);
	}
	else if(uploadedExt.toUpperCase() == "DOCX" && convertExt.toUpperCase() == "TXT")
	{
		getConvertDOCX(300);
	}
	else if(uploadedExt.toUpperCase() == "DOCX" && convertExt.toUpperCase() == "PDF")
	{
		getConvertDOCX(400);
	}
	else if(uploadedExt.toUpperCase() == "TXT" && convertExt.toUpperCase() == "DOCX")
	{
		getConvertTXT(600);
	}
	else if(uploadedExt.toUpperCase() == "TXT" && convertExt.toUpperCase() == "PDF")
	{
		getConvertTXT(500);
	}
	else
	{
		
	}
}

function getConvertPDF(formate)
{	
	showLoader();
	var dt = new Date();
	var time = dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();
	localStorage.setItem("fileName","file_"+time+"."+$('#fileFormats').val());
	var data = "formate="+formate+"&fileName=file_"+time;
	$.ajax({
	type: "GET",		 
    url: window.location.origin+'/filesapi/ConvertPDF',                                                          
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
			convertFile();
			hideLoader();
		}
    }
    });
}

function getConvertDOCX(formate)
{	
	showLoader();
	var dt = new Date();
	var time = dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();
	localStorage.setItem("fileName","file_"+time+"."+$('#fileFormats').val());
	var data = "formate="+formate+"&fileName=file_"+time;
	$.ajax({
	type: "GET",		 
    url: window.location.origin+'/filesapi/ConvertDOCX',                                                          
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
			convertFile();
			hideLoader();
		}
    }
    });
}

function getConvertTXT(formate)
{	
	showLoader();
	var dt = new Date();
	var time = dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();
	localStorage.setItem("fileName","file_"+time+"."+$('#fileFormats').val());
	var data = "formate="+formate+"&fileName=file_"+time+"&host="+window.location.origin;
	$.ajax({
	type: "GET",		 
    url: window.location.origin+'/filesapi/ConvertTXT',                                                          
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
			convertFile();
			hideLoader();
		}
    }
    });
}