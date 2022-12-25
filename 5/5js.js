const pageInput = document.querySelector('.page');
const limitInput = document.querySelector('.limit');
const ok = document.querySelector('.ok');
const resultNode = document.getElementById('result');
function validateValue(value, valuesRange) {
  return typeof value === "number" && !isNaN(value) && value >= valuesRange[0] && value <= valuesRange[1];      
}
function sendRequest(page, limit) {
let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
const xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.onload = function () {
  let response = JSON.parse(xhr.response);
  let images = ``;
  localStorage.clear();
  for (let img of response) {
    images += `
    <img src="${img.download_url}" width="300px" style="margin: 10px;">
      `;
  }
    localStorage.setItem("images", images);
    resultNode.innerHTML = images;
}
  xhr.send();
}
ok.addEventListener("click", () => {
    let page = +pageInput.value;
    let limit = +limitInput.value;
    let valuesRange = [1, 10];
    if (validateValue(page, valuesRange) && validateValue(limit, valuesRange)) {
        sendRequest(page, limit);
    } else if (validateValue(page, valuesRange)) {
        resultNode.innerText = "Лимит вне диапазона от 1 до 10";
    } else if (validateValue(limit, valuesRange)) {
        resultNode.innerText = "Номер страницы вне диапазона от 1 до 10";
    } else {
         resultNode.innerText = "Номер страницы и лимит вне диапазона от 1 до 10";
    }
});
document.addEventListener("DOMContentLoaded", () => {
  let imagesHtml = localStorage.getItem("images");
  if (imagesHtml) {
    resultNode.innerHTML = imagesHtml;
  }
});