import os
from flask import Flask, jsonify, request
from flask_cors import CORS

# application modules
import optimizer
import antivirus_check
import network_diagnostics

# Static directory (Frontend folder at repo root)
static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "Frontend"))

app = Flask(__name__, static_folder=static_dir, static_url_path="")
CORS(app)  # restrict origins in production if desired

@app.route("/")
def index():
    # Serve Frontend/index.html
    return app.send_static_file("index.html")

@app.route("/system")
def system_info():
    return jsonify(optimizer.get_system_info())

@app.route("/optimize", methods=["POST"])
def optimize():
    # Optional token protection
    token_required = os.environ.get("OPTIMIZE_TOKEN")
    if token_required:
        token = request.headers.get("Authorization", "")
        if token.startswith("Bearer "):
            token = token.split(" ", 1)[1]
        if token != token_required:
            return jsonify({"error": "unauthorized"}), 401

    return jsonify(optimizer.clean_temp_files())

@app.route("/antivirus")
def antivirus():
    return jsonify(antivirus_check.check_antivirus())

@app.route("/network")
def network():
    return jsonify(network_diagnostics.check_network())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
