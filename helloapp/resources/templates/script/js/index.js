$(document).ready(function()
{
	localStorage.clear();
	CleanDownloadDirectory();
	hideLoader();
	//window.open("C:/myFolder/Test/test.mp4", 'Download');
});

function savevideoUrl()
{
	 if($("#inputUrl").val() == "" || $("#inputUrl").val() == undefined)
	 {
		 $("#invalidClick").removeClass('hide');
	 }
	 else
	 {
		 $("#invalidClick").addClass('hide');
		 var videoUrl = $("#inputUrl").val();
		 localStorage.setItem('videoUrl',videoUrl);
		 window.location.href="youtubeAPI/detailPageView";
	 }
}
