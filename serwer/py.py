import random
import json
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


address = input("Wpisz adres ip (np 192.168.111.111:5000): ")

app = Flask(__name__)
visits = 0

limiter = Limiter(
    app=app,
    key_func=get_remote_address,  # Rate limit by IP address
    default_limits=["1 per minute"],
)

CORS(app)

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({
        "error": "Rate limit exceeded",
        "message": "Spróbuj jeszcze raz za minutę"
    }), 429

randomnum = random.random()

with open('data.json', 'r') as file:
    data = json.loads(file.read().strip())
    visits = int(data["visits"])

def updatefile(text, file): # stolen from other project
    with open(file, "w") as output:
        output.seek(0)  # Move to the start of the file
        output.write(text)
        output.truncate()
        output.flush()

@app.route("/")
def serve_html():
    return send_from_directory(".", "index.html")

@app.route("/addvisit", methods=["GET"])
def add_and_return_visits():
    global visits
    print("Adding visit")
    visits += 1
    array = {}
    array["visits"] = visits
    updatefile(json.dumps(array), "data.json")
    print(f"Visit number {visits}")
    return f"{visits}", 200


@app.route("/getrandom", methods=["GET"])
def save_parameters():
    print("Giving randomnum", str(randomnum))
    return str(randomnum), 200

addressarray = address.split(":")
if __name__ == "__main__":
    app.run(host=addressarray[0], port=int(addressarray[1]))
