# imageapi/views.py
from django.http import HttpResponse
from django.template.defaultfilters import slugify
import os
import re
import sys
import time
from PIL import Image
from PIL import ImageChops
import glob
import imageio
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import re
import json
from django.http import HttpRequest
from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
import mimetypes
from django.conf import settings
from django.core.files.storage import FileSystemStorage

# Create your views here.
# class uploadView(TemplateView):
@api_view(['POST'])
def uploadFile(request):
    if request.method == 'POST':
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()
        print(myfile)
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
    return JsonResponse({"status":HttpResponse().status_code,"response":"COMPLETE"})

class convertSomeToSomeView(TemplateView):
     def get(self, request, **kwargs):
        print ('<b>This is a test Python Script</b><br>')
        print ('The Python version is: ' + str(sys.version_info[0]) + '.' + str(sys.version_info[1]) + '.' + str(sys.version_info[2]) + '<br>')
        print ('Loaded modules: <br>')
        for i in sys.modules.keys():
          print (i + '<br>')
        return JsonResponse({"status":HttpResponse().status_code,"response":"COMPLETE"})