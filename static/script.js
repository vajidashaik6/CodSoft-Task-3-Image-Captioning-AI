const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const previewSection = document.getElementById("previewSection");

const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const captionText = document.getElementById("captionText");


/* Image Preview */

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {

        alert("Please select a JPG, JPEG, or PNG image.");

        imageInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        previewImage.src = event.target.result;

        previewImage.style.display = "block";

        previewSection.style.display = "block";

        document.getElementById("result").style.display = "none";

        captionText.textContent = "";
    };

    reader.readAsDataURL(file);
});

/* Generate AI Caption */

generateBtn.addEventListener("click", async function () {

    const file = imageInput.files[0];

    if (!file) {

        alert("Please choose an image first.");

        return;
    }


    const formData = new FormData();

    formData.append("image", file);


    generateBtn.disabled = true;

    loading.style.display = "block";

    captionText.textContent = "Generating AI caption...";


    try {
        console.log("Sending image to Flask...");

        const response = await fetch("/caption", {
            method: "POST",
            body: formData
        });


        if (!response.ok) {

            throw new Error("Server error");
        }


       const data = await response.json();

if (data.caption) {

    captionText.textContent = data.caption;

    document.getElementById("result").style.display = "block";

} else {

    captionText.textContent =
        data.error || "Caption could not be generated.";

    document.getElementById("result").style.display = "block";
}
    } catch (error) {

        console.error(error);

        captionText.textContent =
            "Something went wrong. Please try again.";
    }


    loading.style.display = "none";

    generateBtn.disabled = false;

});
function resetApp() {

    imageInput.value = "";

    previewImage.src = "";

    previewSection.style.display = "none";

    document.getElementById("result").style.display = "none";

    captionText.textContent = "";

    loading.style.display = "none";
}
const uploadArea = document.getElementById("uploadArea");

uploadArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadArea.classList.add("drag-over");

});

uploadArea.addEventListener("dragleave", function () {

    uploadArea.classList.remove("drag-over");

});

uploadArea.addEventListener("drop", function (event) {

    event.preventDefault();

    uploadArea.classList.remove("drag-over");

    const files = event.dataTransfer.files;

    if (files.length > 0) {

        imageInput.files = files;

        imageInput.dispatchEvent(new Event("change"));

    }

});

            
            
