# imageapi/urls.py
from django.conf.urls import url
from filesapi import views

urlpatterns = [
    url(r'ConvertPDF', views.ConvertPDF.as_view()),
    url(r'ConvertTXT', views.ConvertTXT.as_view()),
    url(r'ConvertDOCX', views.ConvertDOCX.as_view()),
]