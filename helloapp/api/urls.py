# resources/urls.py
from django.conf.urls import url
from api import views

urlpatterns = [
    url(r'mediaType', views.getYoutubeMediaView.as_view()),
    url(r'saveVideo', views.SaveYoutubeVideoView.as_view()),
    url(r'videoDetail', views.getYoutubeVideoDetailsView.as_view()),
    url(r'CleanDownloadDirectory', views.CleanDownloadDirectory.as_view()),
]