from flask import Flask, render_template, request, jsonify
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

print("Loading AI model...")

processor = BlipProcessor.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

print("AI model loaded successfully!")


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

    image_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(image_path)

    image = Image.open(image_path).convert("RGB")

    inputs = processor(
        images=image,
        return_tensors="pt"
    )

    output = model.generate(
        **inputs,
        max_new_tokens=50
    )

    caption_text = processor.decode(
        output[0],
        skip_special_tokens=True
    )

    return jsonify({
        "caption": caption_text
    })

if __name__ == "__main__":
    app.run(debug=True)