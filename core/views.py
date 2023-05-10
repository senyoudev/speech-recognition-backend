from flask import render_template,jsonify
from core import app
from backend import myModel
from flask_cors import CORS
from flask import request
import os
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def index():
    greeting="Hello there, Ace"
    return render_template('index.html')

@app.route('/test', methods=['GET', 'POST'])
def ping_pong():
    filename2 = "./backend/test/mySound.wav"
    try:
        keyword = myModel.predict(filename2)
        os.remove(filename2) 
    except:
        keyword=""
        os.remove(filename2) 
    
    
    
    return jsonify(keyword)



