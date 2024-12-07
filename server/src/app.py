#!/usr/bin/env python3
import os
import logging

#try:
#import http.server as server
#except ImportError:
    # Handle Python 2.x
    #import SimpleHTTPServer as server
from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler

class HTTPRequestHandler(SimpleHTTPRequestHandler):

    def many_headers(self):           
        #logging.warning('here...')
        self.send_header('Access-Control-Allow-Origin', 'http://localhost')                
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        #self.send_header('Access-Control-Allow-Headers', "Content-type")
        #self.send_header("Access-Control-Allow-Headers", "Authorization")
        #self.send_header('Content-type', 'text/html')
        return

    def do_OPTIONS(self):
        #logging.warning("options ... ")
        self.many_headers()
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        
        #self.protocol_version = "HTTP/0.9"

        if self.path.endswith('users'):
            root_dir = '/home/'
            users = os.listdir(root_dir)
            users_list = []
            for x in users:
                users_list.append(x.split('/')[-1])
            
            self.send_header('Content-type', 'text/plain')

            self.send_response(200)
            self.end_headers()
            reply_body = ','.join(users_list)
            self.wfile.write(reply_body.encode('utf-8'))
            return

        elif  self.path.endswith('.llm.env') :
            filename = str(self.path) #.basename(self.path)
            with open(filename, 'r') as f:
                content = f.read()

            self.send_response(200)
            #self.send_header('Content-Disposition', 'inline; filename=' + filename)
            self.send_header('Content-type', 'text/plain')
            #self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
            return
        
        #self.send_header('Content-type', 'text/html')

        else:
             
            SimpleHTTPRequestHandler.do_GET(self)
            logging.warning("here...")
            logging.warning(self.headers)

    def do_PUT(self):
        """Save a file following a HTTP PUT request"""
        filename = self.path 
        path_part = '/' + '/'.join(self.path.split('/')[:-1])
        print(path_part)

        # Don't overwrite arbitrary files
        if (os.path.exists(filename) and not filename.endswith('.llm.env')) or not os.path.exists(path_part):
            self.send_response(409, 'Conflict')
            self.end_headers()
            reply_body = '"%s" already exists or bad path\n' % filename
            self.wfile.write(reply_body.encode('utf-8'))
            return

        file_length = int(self.headers['Content-Length'])
        with open(filename, 'wb') as output_file:
            output_file.write(self.rfile.read(file_length))
        self.send_response(201, 'Created')
        self.end_headers()
        reply_body = 'Saved "%s"\n' % filename
        self.wfile.write(reply_body.encode('utf-8'))
 

if __name__ == '__main__':
    web_dir = os.path.join(os.path.dirname(__file__), '/')
    os.chdir(web_dir)
    #server.test(HandlerClass=HTTPRequestHandler)

    server_address = ('', 8008)
    httpd = HTTPServer(server_address, HTTPRequestHandler)
    httpd.serve_forever()
