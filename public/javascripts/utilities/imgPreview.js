const fileInput = document.getElementById("images");
const fileCount = document.getElementById("fileCount");
const addedImages = document.getElementById("addedImages");
const getFilesNumber = () => {
  addedImages.innerHTML = "";
  if (fileInput.files.length > 1) {
    fileCount.textContent = `${fileInput.files.length} files chosen`;
    fileCount.style.background = "rgb(0, 209, 182)";
    fileCount.style.color = "rgb(255, 255, 255)";
    fileCount.style.border = "none";
  } else {
    fileCount.textContent = `${fileInput.files.length} file chosen`;
    fileCount.style.background = "rgb(0, 209, 182)";
    fileCount.style.color = "rgb(255, 255, 255)";
    fileCount.style.border = "none";
  }
  for (i of fileInput.files) {
    let reader = new FileReader();
    let img = document.createElement("img");
    reader.onload = () => {
      img.setAttribute("src", reader.result);
    };
    addedImages.appendChild(img);
    reader.readAsDataURL(i);
  }
};
