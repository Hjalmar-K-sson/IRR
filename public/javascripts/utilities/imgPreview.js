const fileInput = document.getElementById("images");
const fileCount = document.getElementById("fileCount");
const getFilesNumber = () => {
  fileCount.textContent = `${fileInput.files.length} files chosen`;
  fileCount.style.background = "rgb(0, 209, 182)";
  fileCount.style.color = "rgb(255, 255, 255)";
  fileCount.style.border = "none";
};
