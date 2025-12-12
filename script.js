// script.js - Logika untuk aplikasi quiz wayang kulit

// Data quiz (contoh pertanyaan tentang wayang kulit)
const dataQuiz = [
    {
        pertanyaan: "Siapa tokoh utama dalam Ramayana versi wayang kulit?",
        opsi: ["A. Rama", "B. Hanuman", "C. Ravana", "D. Sita"],
        jawabanBenar: "A"
    },
    {
        pertanyaan: "Apa bahan utama untuk membuat wayang kulit?",
        opsi: ["A. Kayu", "B. Kulit sapi", "C. Plastik", "D. Kertas"],
        jawabanBenar: "B"
    },
    {
        pertanyaan: "Siapa dalang terkenal dari wayang kulit Jawa?",
        opsi: ["A. Ki Nartosabdo", "B. Ki Anom Suroto", "C. Ki Manteb Sudarsono", "D. Semua benar"],
        jawabanBenar: "D"
    },
    {
        pertanyaan: "Apa fungsi utama wayang kulit dalam budaya Jawa?",
        opsi: ["A. Hiburan saja", "B. Pendidikan dan hiburan", "C. Ritual keagamaan", "D. Semua benar"],
        jawabanBenar: "D"
    },
    {
        pertanyaan: "Berapa jumlah wanda (bagian tubuh) wayang kulit standar?",
        opsi: ["A. 5", "B. 7", "C. 9", "D. 11"],
        jawabanBenar: "C"
    }
];

let skor = 0;
let pertanyaanSaatIni = 0;
const totalPertanyaan = dataQuiz.length;

// Fungsi mulai quiz
function mulaiQuiz() {
    skor = 0;
    pertanyaanSaatIni = 0;
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    tampilkanPertanyaan();
}

// Fungsi tampilkan pertanyaan
function tampilkanPertanyaan() {
    if (pertanyaanSaatIni < totalPertanyaan) {
        const pertanyaan = dataQuiz[pertanyaanSaatIni];
        document.getElementById('question').innerHTML = `<h3>${pertanyaan.pertanyaan}</h3>`;
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';
        pertanyaan.opsi.forEach(op => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = op;
            btn.onclick = () => periksaJawaban(op.charAt(0));
            optionsDiv.appendChild(btn);
        });
        document.getElementById('feedback').textContent = '';
    } else {
        tampilkanHasil();
    }
}

// Fungsi periksa jawaban
function periksaJawaban(jawabanPengguna) {
    const benar = dataQuiz[pertanyaanSaatIni].jawabanBenar;
    const container = document.getElementById('quiz-container');
    const optionsDiv = document.getElementById('options');
    // Disable semua opsi
    const buttons = optionsDiv.querySelectorAll('.option');
    buttons.forEach(btn => btn.disabled = true);
    
    if (jawabanPengguna === benar) {
        skor++;
        document.getElementById('feedback').textContent = 'Jawaban benar!';
        // Efek confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        document.getElementById('feedback').textContent = `Jawaban salah. Jawaban benar: ${benar}`;
        // Efek shake
        container.classList.add('shake');
        setTimeout(() => {
            container.classList.remove('shake');
        }, 500);
    }
    
    // Tambahkan tombol lanjut
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Lanjut';
    nextBtn.className = 'btn';
    nextBtn.onclick = () => {
        pertanyaanSaatIni++;
        nextBtn.remove();
        tampilkanPertanyaan();
    };
    document.getElementById('feedback').appendChild(nextBtn);
}

// Fungsi tampilkan hasil
function tampilkanHasil() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const persentase = (skor / totalPertanyaan) * 100;
    document.getElementById('score').textContent = `Skor Anda: ${skor}/${totalPertanyaan} (${persentase.toFixed(0)}%)`;
    let message = '';
    if (persentase >= 80) {
        message = 'Luar biasa! Anda ahli wayang kulit.';
    } else {
        message = 'Belajar lagi yuk!';
    }
    document.getElementById('message').textContent = message;
}