console.log("hasil.js berjalan");

// ======================================
// Ambil data dari Local Storage
// ======================================

const nama = localStorage.getItem("nama");
const instansi = localStorage.getItem("instansi");
const skor = localStorage.getItem("score");
const waktu = localStorage.getItem("waktu");           // untuk ditampilkan
const waktuDetik = Number(localStorage.getItem("waktuDetik")); // untuk leaderboard
const lagu = localStorage.getItem("laguDipilih");

// ======================================
// Tampilkan ke halaman hasil
// ======================================

document.getElementById("nama").textContent = nama;
document.getElementById("instansi").textContent = instansi;
document.getElementById("score").textContent = skor;

// Jika nanti ada elemen id="waktu"
const waktuElement = document.getElementById("waktu");

if (waktuElement) {
    waktuElement.textContent = waktu;
}

// ======================================
// Kirim ke Google Spreadsheet
// ======================================

const data = {

    nama: nama,

    instansi: instansi,

    lagu: lagu,

    skor: Number(skor),

    waktu: Number(localStorage.getItem("waktuDetik"))

};

console.log(data);

fetch("https://script.google.com/macros/s/AKfycbzJMiLUSL5Nnnoua_pxsl2utdajeo8zqAHU7xqrpVYn4Xd2Sx5YLVoM_U1BvO7DeeJo/exec", {

    method: "POST",

   
    body: JSON.stringify(data)

})
.then(response => response.text())
.then(result => {

    console.log("Spreadsheet:", result);

})
.catch(error => {

    console.error(error);

});