// ======================================
// EDUBENCANA
// SUSUN RAMBU
// BAGIAN 1
// ======================================

// Canvas
const canvas = document.getElementById("canvasPuzzle");
const ctx = canvas.getContext("2d");

// Ukuran puzzle
const GRID = 2;

// Variabel permainan
let daftarMain = [];
let nomorRambu = 0;
let skor = 0;

let gambar = new Image();

// Potongan puzzle
let pieces = [];

// Posisi potongan yang sedang tampil
let posisi = [];

// Potongan yang sedang dipilih
let pilihan = -1;


// ======================================
// Acak Array
// ======================================

function shuffle(array){

    for(let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    return array;

}


// ======================================
// Mulai Permainan
// ======================================

function mulaiGame(){

    // Ambil semua rambu
    daftarMain = [...daftarRambu];

    // Acak urutan
    shuffle(daftarMain);

    // Ambil 10 rambu pertama
    daftarMain = daftarMain.slice(0,10);

    nomorRambu = 0;

    skor = 0;

    document.getElementById("score").textContent = skor;

    tampilkanRambu();
    console.log("Menampilkan:", daftarMain[nomorRambu].nama);

}


// ======================================
// Menampilkan Rambu
// ======================================

function tampilkanRambu(){

    // Reset pilihan
    pilihan = -1;

    // Aktifkan klik puzzle
    canvas.addEventListener("click", klikPuzzle);

    // Sembunyikan pertanyaan
    const pertanyaan = document.getElementById("pertanyaan");

    if(pertanyaan){

        pertanyaan.style.display = "none";

    }

    const rambu = daftarMain[nomorRambu];

    document.getElementById("progress").textContent =
        "Rambu " + (nomorRambu + 1) + " / 10";

    gambar.onload = function(){

        buatPuzzle();

    };

    gambar.src = rambu.gambar;

}


// ======================================
// Membuat Puzzle
// ======================================

function buatPuzzle(){

    pieces = [];

    posisi = [];

    const lebar = gambar.width / GRID;

    const tinggi = gambar.height / GRID;

    let id = 0;

    for(let y = 0; y < GRID; y++){

        for(let x = 0; x < GRID; x++){

            pieces.push({

                id : id,

                sx : x * lebar,

                sy : y * tinggi,

                sw : lebar,

                sh : tinggi

            });

            posisi.push(id);

            id++;

        }

    }

    // Acak sampai tidak sama dengan posisi asli
    do{

        shuffle(posisi);

    }

    while(posisi.join(",") === "0,1,2,3");

    gambarPuzzle();

}

// ======================================
// BAGIAN 2
// Menggambar Puzzle
// ======================================

function gambarPuzzle(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const dw = canvas.width / GRID;
    const dh = canvas.height / GRID;

    for(let i=0;i<pieces.length;i++){

        const piece = pieces[posisi[i]];

        const dx = (i % GRID) * dw;
        const dy = Math.floor(i / GRID) * dh;

        ctx.drawImage(

            gambar,

            piece.sx,
            piece.sy,
            piece.sw,
            piece.sh,

            dx,
            dy,
            dw,
            dh

        );

        // Garis pembatas
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.strokeRect(dx,dy,dw,dh);

        // Potongan yang sedang dipilih
        if(i === pilihan){

            ctx.strokeStyle = "#ff0000";
            ctx.lineWidth = 5;
            ctx.strokeRect(dx+2,dy+2,dw-4,dh-4);

        }

    }

}


// ======================================
// Klik Puzzle (Swap)
// ======================================

function klikPuzzle(e){

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const kolom = Math.floor(x / (canvas.width / GRID));
    const baris = Math.floor(y / (canvas.height / GRID));

    const index = baris * GRID + kolom;

    // Klik pertama
    if(pilihan === -1){

        pilihan = index;

        gambarPuzzle();

        return;

    }

    // Klik kotak yang sama
    if(index === pilihan){

        pilihan = -1;

        gambarPuzzle();

        return;

    }

    // Tukar posisi
    [posisi[pilihan], posisi[index]] =
    [posisi[index], posisi[pilihan]];

    pilihan = -1;

    gambarPuzzle();

    cekPuzzle();

}


// ======================================
// Cek Apakah Puzzle Sudah Benar
// ======================================

function cekPuzzle(){

    let selesai = true;

    for(let i=0;i<posisi.length;i++){

        if(posisi[i] !== i){

            selesai = false;
            break;

        }

    }

    if(!selesai){
        return;
    }

    // Hentikan klik sementara
    canvas.removeEventListener("click", klikPuzzle);

    // Tunggu sebentar
    setTimeout(function(){

        tampilkanPertanyaan();

    },500);

}
// ======================================
// BAGIAN 3
// Pertanyaan & Skor
// ======================================

function tampilkanPertanyaan(){

    const rambu = daftarMain[nomorRambu];

    document.getElementById("pertanyaan").style.display = "block";

    const pilihanDiv = document.getElementById("pilihanJawaban");

    pilihanDiv.innerHTML = "";

    rambu.pilihan.forEach(function(item){

        const btn = document.createElement("button");

        btn.textContent = item;

        btn.className = "btn-pilihan";

        btn.style.display = "block";
        btn.style.width = "100%";
        btn.style.margin = "10px 0";
        btn.style.padding = "12px";
        btn.style.fontSize = "18px";
        btn.style.cursor = "pointer";

        btn.onclick = function(){

            cekJawaban(item);

        };

        pilihanDiv.appendChild(btn);

    });

}


// ======================================
// Cek Jawaban
// ======================================

function cekJawaban(jawabanUser){
    const rambu = daftarMain[nomorRambu];

    if(jawabanUser === rambu.jawaban){

        skor += 10;

        alert("✅ Jawaban Benar!");

    }else{

        alert(
            "❌ Jawaban Salah\n\nJawaban yang benar:\n" +
            rambu.jawaban
        );

    }

    document.getElementById("score").textContent = skor;

    document.getElementById("pertanyaan").style.display = "none";

    nomorRambu++;

console.log("Nomor rambu sesudah:", nomorRambu);

    // ============================
    // Masih ada rambu
    // ============================

    if(nomorRambu < daftarMain.length){

        tampilkanRambu();

        return;

    }

    // ============================
    // Semua rambu selesai
    // ============================

    localStorage.setItem("score", skor);

    localStorage.setItem("jenisPermainan","Susun Rambu");

    window.location.href = "hasil.html";

}


// ======================================
// Mulai Permainan
// ======================================

canvas.addEventListener("click", klikPuzzle);

mulaiGame();