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

// --- Function untuk Accordion Menu ---
function toggleSection(contentId, iconId) {
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);

    if (content.style.maxHeight) {
        // Jika sedang terbuka, tutup
        content.style.maxHeight = null;
        icon.style.transform = "rotate(0deg)";
    } else {
        // Jika tertutup, buka (set tinggi otomatis sesuai isi)
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS
    AOS.init({
        once: true,
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
            // Menghapus transparansi penuh agar konten tidak bertumpuk jelek saat scroll
            navbar.classList.remove('bg-opacity-0'); 
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // 4. --- DARK MODE LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Cek preferensi user saat pertama kali load
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Event Listener Tombol Switch
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            // Efek putar icon
            themeIcon.style.transform = "rotate(360deg)";
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeIcon.style.transform = "rotate(0deg)";
        }
    });
});

// 5. Accordion Logic
function toggleSection(contentId, iconId) {
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
    }
}

// 6. SweetAlert Info (Updated for Dark Mode)
function showInfo(type) {
    let title, text, iconColor;

    // Cek apakah dark mode aktif untuk style SweetAlert
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#1e293b' : '#fff'; // Slate-800 vs White
    const textColor = isDark ? '#e2e8f0' : '#333'; // Slate-200 vs Dark Gray

    if (type === 'v1') {
        title = 'MUS Web Ver 1.0';
        text = 'Versi ini dirancang untuk sampling cepat pada satu populasi akun. Input data total populasi, materialitas, dan confidence level.';
        iconColor = '#00447b';
    } else if (type === 'v2') {
        title = 'MUS Web Ver 2.0 (Template)';
        text = 'Versi Lanjutan! Download template Excel, isi data beberapa akun sekaligus, lalu upload kembali.';
        iconColor = '#fbb03b';
    } else if (type === 'cleaner') {
        title = 'Data Cleaner Accurate';
        text = 'Membersihkan format data dari export Excel Accurate yang seringkali berantakan (merged cells, header ganda).';
        iconColor = '#c1272d';
    } else if (type === 'myob') {
        title = 'General Ledger Cleaner MYOB';
        text = 'Solusi untuk merapikan data export GL dari MYOB menjadi tabel flat yang rapi.';
        iconColor = '#9333ea';
    }

    Swal.fire({
        title: title,
        text: text,
        icon: 'info',
        confirmButtonText: 'Mengerti',
        confirmButtonColor: iconColor,
        background: bgColor, // Dynamic Background
        color: textColor,    // Dynamic Text
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