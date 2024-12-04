#!/usr/bin/env python3
import http.server
import os
import logging

try:
    import http.server as server
except ImportError:
    # Handle Python 2.x
    import SimpleHTTPServer as server

class HTTPRequestHandler(server.SimpleHTTPRequestHandler):

    def do_GET(self):

        if self.path.endswith('users'):
            root_dir = '/home/'
            users = os.listdir(root_dir)
            users_list = []
            for x in users:
                users_list.append(x.split('/')[-1])
            self.send_response(200)
            self.end_headers()
            reply_body = ','.join(users_list)
            self.wfile.write(reply_body.encode('utf-8'))
            return

        elif  self.path.endswith('.env') :
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

        server.SimpleHTTPRequestHandler.do_GET(self)
        logging.warning(self.headers)
 
    def do_PUT(self):
        """Save a file following a HTTP PUT request"""
        filename = self.path 

        # Don't overwrite arbitrary files
        if os.path.exists(filename) and not filename.endswith('.llm.env'):
            self.send_response(409, 'Conflict')
            self.end_headers()
            reply_body = '"%s" already exists\n' % filename
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
    server.test(HandlerClass=HTTPRequestHandler)
