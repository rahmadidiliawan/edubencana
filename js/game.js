// ======================================
// EDUBENCANA INTERACTIVE
// game.js
// ======================================

// ----------------------------
// Ambil lagu yang dipilih
// ----------------------------

const idLagu = localStorage.getItem("laguDipilih");

const lagu = daftarLagu[idLagu];

if (!lagu) {

    alert("Lagu tidak ditemukan.");

    window.location.href = "pilihan-lagu.html";

}



// ----------------------------
// Judul Lagu
// ----------------------------

document.getElementById("judulGame").textContent =
lagu.judul;



// ----------------------------
// Audio
// ----------------------------

const audioPlayer =
document.getElementById("audioPlayer");

audioPlayer.src = lagu.audio;
console.log("audioPlayer:", audioPlayer);



// ----------------------------
// Tombol Play
// ----------------------------

const playButton =
document.getElementById("playButton");

playButton.addEventListener("click", function () {

    audioPlayer.currentTime = 0;

    audioPlayer.play();

});



// ----------------------------
// Tampilkan Lirik
// ----------------------------

const lirikContainer =
document.getElementById("lirikContainer");

lirikContainer.innerHTML = "";

let nomorJawaban = 1;

lagu.lirik.forEach(function(baris){

    const p = document.createElement("p");

    if(baris.jawaban){

        p.innerHTML =
        baris.teks.replace(
            "____",
            `<input
                type="text"
                id="jawaban${nomorJawaban}"
                class="jawaban">`
        );

        nomorJawaban++;

    }

    else{

        p.textContent = baris.teks;

    }

    lirikContainer.appendChild(p);

});



// ----------------------------
// Timer
// ----------------------------

let waktu = 300;

const timer =
document.getElementById("timer");

const hitungMundur =
setInterval(function(){

    let menit =
    Math.floor(waktu/60);

    let detik =
    waktu%60;

    if(detik<10){

        detik="0"+detik;

    }

    timer.textContent =
    menit+":"+detik;

    waktu--;

    if(waktu<0){

        clearInterval(hitungMundur);

        selesaiGame();

    }

},1000);



// ----------------------------
// Cek Jawaban
// ----------------------------

function cekJawaban(){

    let skor = 0;

    let nomor = 1;

    lagu.lirik.forEach(function(baris){

        if(baris.jawaban){

            const input =
            document.getElementById("jawaban"+nomor);

            const jawabanUser =
            input.value
            .trim()
            .toUpperCase();

            if(jawabanUser===baris.jawaban){

                skor += 10;

                input.style.background="#c8f7c5";

                input.style.border="2px solid green";

            }

            else{

                input.style.background="#ffd6d6";

                input.style.border="2px solid red";

            }

            nomor++;

        }

    });

    document.getElementById("score").textContent =
    skor;

    localStorage.setItem("score", skor);

    setTimeout(function(){

        window.location.href="hasil.html";

    },1500);

}



// ----------------------------
// Tombol Periksa
// ----------------------------

document
.getElementById("checkButton")
.addEventListener("click",cekJawaban);



// ----------------------------
// Waktu Habis
// ----------------------------

function selesaiGame(){

    cekJawaban();

}