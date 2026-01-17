document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        once: true, // Animasi hanya terjadi sekali saat scroll ke bawah
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // 2. Set Tahun Otomatis
    document.getElementById('year').textContent = new Date().getFullYear();

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
            navbar.classList.replace('bg-opacity-0', 'bg-opacity-80'); // Adjust transparency if needed via utility class
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

});

// 4. SweetAlert2 Logic untuk Tombol Info
function showInfo(type) {
    let title, text, iconColor;

    if (type === 'v1') {
        title = 'MUS Web Ver 1.0';
        text = 'Versi ini dirancang untuk sampling cepat pada satu populasi akun. Input data total populasi, materialitas, dan confidence level untuk mendapatkan sample size dan interval.';
        iconColor = '#00447b';
    } else if (type === 'v2') {
        title = 'MUS Web Ver 2.0 (Template)';
        text = 'Versi Lanjutan! Anda dapat mendownload template Excel yang disediakan, mengisi data beberapa akun sekaligus, lalu menguploadnya kembali. Sistem akan menghitung sampling untuk semua akun secara otomatis.';
        iconColor = '#fbb03b';
    } else if (type === 'cleaner') {
        title = 'Data Cleaner Accurate';
        text = 'Tools ini membersihkan format data dari export Excel Accurate yang seringkali berantakan (merged cells, header ganda). Outputnya adalah data bersih yang siap untuk Pivot Table atau sampling.';
        iconColor = '#c1272d';
    } else if (type === 'myob') {
        // --- INI BAGIAN BARU UNTUK MYOB ---
        title = 'General Ledger Cleaner MYOB';
        text = 'Solusi untuk merapikan data export GL dari MYOB yang sering memiliki baris kosong atau format teks berantakan. Aplikasi ini akan menstruktur ulang data menjadi tabel flat yang rapi.';
        iconColor = '#9333ea'; // Warna Ungu
    }

    Swal.fire({
        title: title,
        text: text,
        icon: 'info',
        confirmButtonText: 'Mengerti',
        confirmButtonColor: iconColor,
        background: '#fff',
        color: '#333',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            title: 'font-serif font-bold',
            popup: 'rounded-2xl'
        }
    });
}