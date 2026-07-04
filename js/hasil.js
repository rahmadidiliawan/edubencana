console.log("hasil.js berjalan");

const skor = localStorage.getItem("score");

console.log("Skor dari LocalStorage =", skor);

const scoreElement = document.getElementById("score");

console.log(scoreElement);

scoreElement.textContent = skor;