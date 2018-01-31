# api/views.py
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
from django.contrib.staticfiles.templatetags.staticfiles import static
import glob


# Create your views here.
class getYoutubeMediaView(TemplateView):
    def get(self, request, **kwargs):
        link = request.GET['url']
        try:
          yt = pytube.YouTube(link)
          videos = yt.get_videos()
          s = 1
          varVal = []
          for v in videos:
              varVal.append({"meadiType":str(s) + '. ' + str(v)})
              s += 1

          return JsonResponse({"status":HttpResponse().status_code,'mediaTypes':varVal})
        except:
          return JsonResponse({"status":HttpResponse().status_code,"response":"UNABLE_TO_FIND_START_PATTERN"})
		
class SaveYoutubeVideoView(TemplateView):
    def get(self, request, **kwargs):
        link = request.GET['url']
        yt = pytube.YouTube(link)
        newFileName = ""
        videos = yt.get_videos()
        n = int(request.GET['type'])
        vid = videos[n - 1]
        destination = os.path.expanduser(os.path.abspath('resources/static/downloads'))
        if os.path.exists(destination+'\\'+request.GET['name'].replace(" ","_")):
             os.remove(destination+'\\'+request.GET['name'].replace(" ","_"))
        vid.download(destination)
        f = destination+'\\'+request.GET['name']
        new_filename = f.replace(" ","_")
        new_filename = new_filename
        os.rename(f,new_filename)
				
        return JsonResponse({"status":HttpResponse().status_code,"response":"COMPLETE"})
		
class getYoutubeVideoDetailsView(TemplateView):
    def get(self, request, **kwargs):
        link = request.GET['url']
        try:
          yt = pytube.YouTube(link)
          videos = yt.get_videos()
          videosData = yt.get_video_data()
          s1 = json.dumps(videosData)
          json_data = json.loads(s1)
          author = json_data['args']['author']
          title = json_data['args']['title'] 
          pattern = r'(?:https?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtube|youtu|youtube-nocookie)\.(?:com|be)\/(?:watch\?v=|watch\?.+&v=|embed\/|v\/|.+\?v=)?([^&=\n%\?]{11})'
          videoId = re.findall(pattern, link, re.MULTILINE | re.IGNORECASE)
          thumbnailUrl = '//img.youtube.com/vi/' + videoId[0] + '/0.jpg'
          videoDetails = []
          videoDetails.append({"title":title, "thumbnailUrl":thumbnailUrl, "author":author})
          return JsonResponse({"status":HttpResponse().status_code,"videoDetail":videoDetails})
        except:
          return JsonResponse({"status":HttpResponse().status_code,"response":"UNABLE_TO_FIND_START_PATTERN"})
		  
class CleanDownloadDirectory(TemplateView):
    def get(self, request, **kwargs):
        dir = os.path.abspath('resources/static/downloads')
        list = os.listdir(dir)
        number_files = len(list)
        if number_files > 10:
            destination = os.path.expanduser(dir)
            for v in list:
                os.remove(destination+"\\"+v)
        return JsonResponse({"status":HttpResponse().status_code,"response":"COMPLETE"})