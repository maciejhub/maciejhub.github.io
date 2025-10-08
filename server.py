import http.server
import socketserver
import os

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Check if the requested path is a directory
        if self.path.endswith('/'):
            self.path += 'index.html'  # Serve index.html for directories
            
        # Check for missing file extensions and add .html
        if not os.path.splitext(self.path)[1]:  # if there's no extension
            self.path += '.html'

        # Call the superclass method to handle the request
        try:
            # Try to serve the requested file
            super().do_GET()
        except FileNotFoundError:
            self.send_error(404)

    def send_error(self, code, message=None):
        self.send_response(code)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        # Serve the custom 404 page
        if code == 404:
            try:
                with open('404.html', 'rb') as f:
                    self.wfile.write(f.read())
                return
            except FileNotFoundError:
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b'404 Not Found: Custom error page not found.')

# Set the directory and start the server
PORT = 8000

Handler = CustomHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
