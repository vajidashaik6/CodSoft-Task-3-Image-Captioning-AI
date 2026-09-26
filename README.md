# VisionCaption AI

VisionCaption AI is an AI-powered image captioning web application that automatically understands an uploaded image and generates a meaningful textual description.

## Features

- Upload JPG, JPEG, and PNG images
- Image preview before processing
- Drag and drop image upload
- AI-generated image captions
- Loading animation during AI processing
- Generate another image option
- Responsive and modern user interface
- Error handling for invalid image formats

## Technologies Used

- Python
- Flask
- Hugging Face Transformers
- BLIP Image Captioning Model
- PyTorch
- Pillow
- HTML
- CSS
- JavaScript

## AI Model

The project uses the BLIP image captioning model:

Salesforce/blip-image-captioning-base

The model analyzes the visual content of an image and generates a natural-language caption.

## Project Structure

```text
Image_captioning/
│
├── app.py
├── requirements.txt
├── README.md
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── uploads/
│
└── venv/