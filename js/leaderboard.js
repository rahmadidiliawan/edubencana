const peserta = [

    {
        nama:"Rahmadi",
        lagu:"Erupsi",
        skor:20,
        waktu:"01:25"
    },

    {
        nama:"Andi",
        lagu:"Gempa",
        skor:20,
        waktu:"01:40"
    },

    {
        nama:"Budi",
        lagu:"Tsunami",
        skor:10,
        waktu:"02:15"
    }

];

const tbody = document.getElementById("leaderboardBody");

peserta.forEach(function(item,index){

    let ranking = index + 1;

    if(ranking==1) ranking="🥇";
    else if(ranking==2) ranking="🥈";
    else if(ranking==3) ranking="🥉";

    tbody.innerHTML += `

        <tr>

            <td>${ranking}</td>

            <td>${item.nama}</td>

            <td>${item.lagu}</td>

            <td>${item.skor}</td>

            <td>${item.waktu}</td>

        </tr>

    `;

});

document.getElementById("tanggal").textContent =
"Leaderboard Harian - " +
new Date().toLocaleDateString("id-ID");