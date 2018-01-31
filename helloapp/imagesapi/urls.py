# imageapi/urls.py
from django.conf.urls import url
from imagesapi import views

urlpatterns = [
    url(r'convertSomeToSomeView', views.convertSomeToSomeView.as_view()),
    url(r'uploadFile', views.uploadFile),
]
