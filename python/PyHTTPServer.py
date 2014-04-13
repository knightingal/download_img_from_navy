__author__ = 'knightingal'

from BaseHTTPServer import HTTPServer
from CGIHTTPServer import CGIHTTPRequestHandler
import json
import urllib2
import os
from threading import Thread

rootDirString = '/home/knightingal/Downloads/.mix/1000/'

class RequestHandler(CGIHTTPRequestHandler):

    def do_GET(self):
        self.wfile.write("hello world")

    def do_POST(self):
        content_lenght = self.headers.dict["content-length"]
        content = self.rfile.read(int(content_lenght))

        print content
        jsonObjTotal = json.loads(content)
        print jsonObjTotal
        for jsonObjStr in jsonObjTotal:
            jsonObj = json.loads(jsonObjStr)
            title = jsonObj["title"]
            print title
            try:
                os.mkdir(rootDirString + jsonObj["title"])
            except OSError:
                print rootDirString + jsonObj["title"] + "exists"
            for url in jsonObj["list"]:
                #download_img(url, jsonObj["href"], jsonObj["title"])
                thread = MyThread(url, jsonObj["href"], jsonObj["title"])
                thread.start()
            #print "download succ"
        self.wfile.write("ok")

class MyThread(Thread):
    def __init__(self, img_url, web_age_url, title_str):
        Thread.__init__(self)
        self.img_url = img_url
        self.web_age_url = web_age_url
        self.title_str = title_str

    def run(self):
        download_img(self.img_url, self.web_age_url, self.title_str)

def download_img(img_url, web_age_url, title_str):
    print "downloading " + img_url
    try:
        request = urllib2.Request(img_url)
        request.add_header("Referer", web_age_url)
        request.add_header("User-Agent",
                                   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.31 "
                                   "(KHTML, like Gecko) Chrome/26.0.1410.63 Safari/537.31")
        request.add_header("Connection", "keep-alive")
        request.add_header("Accept", "*/*")
        request.add_header("Accept-Encoding", "gzip,deflate,sdch")
        request.add_header("Accept-Language", "zh-CN,zh;q=0.8")
        request.add_header("Accept-Charset", "GBK,utf-8;q=0.7,*;q=0.3")
        picfd = urllib2.urlopen(request)
        picstring = picfd.read()
        picfd.close()
        picfd = open(rootDirString + title_str + '/' + img_url.split('/')[-1], 'wb')
        picfd.write(picstring)
        picfd.close()
    except Exception, e:
        print e
    print img_url + " download succ"

serveraddr = ('', 8081)
sevr = HTTPServer(serveraddr, RequestHandler)
sevr.serve_forever()
