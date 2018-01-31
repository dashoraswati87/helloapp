# resources/views.py
from __future__ import unicode_literals
from django.http import HttpResponse
from django.template.defaultfilters import slugify
import youtube_dl
import os
import sys
import pytube
import youtube_dl
import re
import json
from django.http import HttpRequest
from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import TemplateView


# Create your views here.
class indexPageView(TemplateView):
    template_name = "index.html"
	
class detailPageView(TemplateView):
    template_name = "videoDetails.html"

class imageConvPageView(TemplateView):
    template_name = "imageConvertor.html"

class saveVideoView(TemplateView):
    template_name = "saveVideo.html"
	
class progressPageView(TemplateView):
    template_name = "progressPage.html"
	
class fileConvertorPageView(TemplateView):
    template_name = "fileConvertor.html"
	
class videoDetailsPagejsView(TemplateView):
    template_name = "script\js\\videoDetails.js"

class imageConvPagejsView(TemplateView):
    template_name = "script\js\\imageConvertor.js"

class saveVideojsView(TemplateView):
    template_name = "script\js\\saveVideo.js"

class indexPagejsView(TemplateView):
    template_name = "script\js\\index.js"	

class commonjsView(TemplateView):
    template_name = "script\js\\common.js"	
	
class progressPagejsView(TemplateView):
    template_name = "script\js\\progress.js"
	
class fileConvertorjsView(TemplateView):
    template_name = "script\js\\fileConvertor.js"	

class pageBootstrapJsView(TemplateView):
    template_name = "script\js\\bootstrap.js"
	
class pageBootstrapMinJsView(TemplateView):
    template_name = "script\js\\bootstrap.min.js"

class pageJqueryJsView(TemplateView):
    template_name = "script\js\\jquery.min.js"