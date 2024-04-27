from flask import Flask, render_template, redirect
import werkzeug
import flask

app = Flask(__name__)

@app.route("/<path>")
@app.route("/<path>/")
def path_handler(path):
    return path