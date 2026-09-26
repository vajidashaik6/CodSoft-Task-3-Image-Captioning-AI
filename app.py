from flask import Flask, render_template, request, jsonify
from huggingface_hub import InferenceClient
import os

app = Flask(__name__)

HF_TOKEN = os.environ.get("HF_TOKEN")

client = InferenceClient(
    api_key=HF_TOKEN,
    provider="auto"
)

MODEL = "Salesforce/blip-image-captioning-base"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/caption", methods=["POST"])
def caption():

    if "image" not in request.files:
        return jsonify({"error": "No image selected"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No image selected"}), 400

    try:
        image_bytes = file.read()

        result = client.image_to_text(
            image_bytes,
            model=MODEL
        )

        caption_text = result.generated_text

        return jsonify({
            "caption": caption_text
        })

    except Exception as e:
        print("Caption error:", e)

        return jsonify({
            "error": "Unable to generate caption. Please try again."
        }), 500


if __name__ == "__main__":
    app.run()
