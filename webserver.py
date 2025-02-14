#!/usr/bin/env python

from flask import Flask, redirect
from pathlib import Path

# TODO use http.server - directly hosts file

app = Flask(__name__,
            static_url_path='', 
            static_folder='./')

# index.html isn't a template, so just serve it as a static file
# TODO find better way to this
# flask shd be run with an actual http server like Apache
# https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask

# doesn't redirect / to index.html by default

@app.route('/')
def index():
    return redirect('/index.html')

if __name__ == '__main__':
   app.run()
