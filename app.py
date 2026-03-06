from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "SIM800 server running", 200

@app.route("/data", methods=["POST"])
def data():
    payload = request.get_json(silent=True)
    print("Received JSON:", payload)
    return jsonify({"status": "ok"}), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080)