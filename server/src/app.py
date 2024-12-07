#!/usr/bin/env python3
import os
import logging
from os.path import join
import ssl 
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

class HTTPRequestHandler(SimpleHTTPRequestHandler):

    def many_headers(self):           
        #logging.warning('here...')
        self.send_header('Access-Control-Allow-Origin', '*')                
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT')
        #self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        #self.send_header('Access-Control-Allow-Headers', "Content-type")
        #self.send_header("Access-Control-Allow-Headers", "Authorization")
        self.send_header('Content-type', 'application/json')
        self.send_header('Content-Disposition', 'inline')
        self.protocol_version = "HTTP/1.0"
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
                users_list.append('"'+ x.split('/')[-1] + '"')
            self.many_headers() 
            self.send_header('Content-type', 'text/plain')
            self.protocol_version = "HTTP/1.0"
            self.send_response(200)
            self.end_headers()
            reply_body = '{"home": [' + ','.join(users_list) + "]}"
            json_data = json.dumps(reply_body)
            self.wfile.write(reply_body.encode('utf-8'))
            #self.wfile.write(json_data.encode())
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
            #logging.warning("here...")
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

def get_ssl_context(certfile, keyfile):
    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    context.load_cert_chain(certfile, keyfile)
    context.set_ciphers("@SECLEVEL=1:ALL")
    return context

if __name__ == '__main__':
    web_dir = os.path.join(os.path.dirname(__file__), '/')
    os.chdir(web_dir)
    #server.test(HandlerClass=HTTPRequestHandler)

    server_address = ('', 8008)
    httpd = HTTPServer(server_address, HTTPRequestHandler)
    
    context = get_ssl_context("/app/cert.pem", "/app/key.pem")
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)


    httpd.serve_forever()
