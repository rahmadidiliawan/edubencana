// Tombol MULAI di index.html
const mulaiButton = document.getElementById("mulaiButton");

if (mulaiButton) {

    mulaiButton.addEventListener("click", function () {

        const nama = document.getElementById("nama").value;
        const instansi = document.getElementById("instansi").value;

        // Validasi sederhana
        if (nama === "" || instansi === "") {
            alert("Silakan isi Nama dan Sekolah/Instansi terlebih dahulu.");
            return;
        }

        // Simpan ke Local Storage
        localStorage.setItem("nama", nama);
        localStorage.setItem("instansi", instansi);

        // Pindah ke halaman aturan
        window.location.href = "aturan.html";
    });

}

// Tombol SIAP BERMAIN di aturan.html
const gameButton = document.getElementById("gameButton");

if (gameButton) {

    gameButton.addEventListener("click", function () {

        window.location.href = "pilihan-lagu.html";

    });

}