from flask import Flask, jsonify
from flask_cors import CORS 

import optimizer
import antivirus_check
import network_diagnostics

app = Flask(__name__)
CORS(app) 
@app.route("/")
def home():
    return jsonify({"message": "Pangoni Solution Running"})

@app.route("/system")
def system_info():
    return jsonify(optimizer.get_system_info())

@app.route("/optimize")
def optimize():
    return jsonify(optimizer.clean_temp_files())

@app.route("/antivirus")
def antivirus():
    return jsonify(antivirus_check.check_antivirus())

@app.route("/network")
def network():
    return jsonify(network_diagnostics.check_network())

if __name__ == "__main__":
    app.run(debug=True)