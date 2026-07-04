// Ambil semua tombol lagu
const tombolLagu = document.querySelectorAll(".lagu-btn");

// Tambahkan event klik pada setiap tombol
tombolLagu.forEach(function(button){

    button.addEventListener("click", function(){

        // Ambil nama lagu dari data-lagu
        const lagu = button.dataset.lagu;

        // Simpan pilihan lagu
        localStorage.setItem("laguDipilih", lagu);

        // Buka halaman game
        window.location.href = "game.html";

    });

});