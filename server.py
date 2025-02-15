from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

# A simple flag to indicate if there's an active fire alarm
is_fire = False

# 1) Serve static files from the "public" folder
#    e.g. GET / -> public/index.html, GET /js/main.js -> public/js/main.js, etc.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    if path == "" or path is None:
        path = 'index.html'  # Default file
    return send_from_directory('public', path)

@app.route('/alarm', methods=['POST'])
def alarm():
    global is_fire
    data = request.get_json(silent=True) or {}

    # Check if "fire" is present in the JSON at all
    if "fire" in data:
        # Convert to boolean just in case
        is_fire = bool(data["fire"])
        if is_fire:
            print("🔥 Fire alarm triggered by Raspberry Pi!")
        else:
            print("🟢 Fire alarm stopped by Raspberry Pi!")

    return jsonify({"message": "Alarm state updated", "fire": is_fire}), 200


# 3) GET /alarm-status - front-end polls here to see if the alarm is active
@app.route('/alarm-status', methods=['GET'])
def alarm_status():
    global is_fire
    return jsonify({"fire": is_fire})

# 4) (Optional) POST /alarm/reset - clear/reset the alarm
@app.route('/alarm/reset', methods=['POST'])
def alarm_reset():
    global is_fire
    is_fire = False
    print("Alarm reset to false.")
    return jsonify({"message": "Alarm reset", "fire": is_fire}), 200

if __name__ == '__main__':
    # Use 0.0.0.0 to accept connections from your LAN if needed
    app.run(host='0.0.0.0', port=5000, debug=True)
