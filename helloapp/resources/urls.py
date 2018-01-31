# resources/urls.py
from django.conf.urls import url
from resources import views

urlpatterns = [
    url(r'indexPageView', views.indexPageView.as_view()),
    url(r'indexPagejsView', views.indexPagejsView.as_view()),
    url(r'imageConvPageView', views.imageConvPageView.as_view()),
    url(r'progressPageView', views.progressPageView.as_view()),
    url(r'commonjsView', views.commonjsView.as_view()),
    url(r'saveVideojsView', views.saveVideojsView.as_view()),
    url(r'fileConvertorjsView', views.fileConvertorjsView.as_view()),
    url(r'fileConvertorPageView', views.fileConvertorPageView.as_view()),
    url(r'imageConvPagejsView', views.imageConvPagejsView.as_view()),
    url(r'saveVideoView', views.saveVideoView.as_view()),
    url(r'videoDetailsPagejsView', views.videoDetailsPagejsView.as_view()),
    url(r'progressPagejsView', views.progressPagejsView.as_view()),
    url(r'pageBootstrapJsView', views.pageBootstrapJsView.as_view()),
    url(r'pageBootstrapMinJsView', views.pageBootstrapMinJsView.as_view()),
    url(r'pageJqueryJsView', views.pageJqueryJsView.as_view()),
    url(r'detailPageView', views.detailPageView.as_view()),
]