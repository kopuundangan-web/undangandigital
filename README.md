# undangandigital

## Menambahkan template

Loading screen bersama ada di `shared/loading-screen.js`. Untuk memakainya pada template baru di dalam `template/<nama-template>/`, tambahkan script berikut tepat setelah tag pembuka `<body>` dan sebelum elemen aplikasi seperti `<div id="root">`:

```html
<script src="../../shared/loading-screen.js"></script>
```

Gunakan tag yang sama untuk halaman undangan baru di dalam `undangan/<nama-undangan>/`. Script bersama memecah teks “Ko pu / Undangan” per karakter dengan GSAP SplitText, lalu menganimasikan setiap karakter secara berurutan dan berulang selama aset dimuat. Setelah kedua teks tampil, animasi menahannya sejenak, memudarkannya di tempat, lalu mengatur ulang posisinya ke bawah sebelum siklus berikutnya. Loader hanya menunggu gambar yang terlihat di viewport dan tidak menjalankan unduhan duplikat atau mengubah class/style React/GSAP. Interaksi scroll ditahan selama loader agar tidak memajukan ScrollTrigger atau animasi opening di belakangnya. Gambar di luar viewport dan audio/video mengikuti pemuatan native browser di latar belakang agar tidak menahan halaman atau animasi. Garis progres menampilkan penyelesaian gambar yang diamati; jumlah MB memakai Resource Timing browser jika tersedia. Setelah loader benar-benar ditutup, scroll kembali ke awal dan event scroll/resize memberi ScrollTrigger kesempatan menghitung ulang posisi konten. Loader menggunakan font Great Vibes dan warna dari CSS variable atau `meta[name="theme-color"]`. Animasi CSS menjadi fallback jika CDN GSAP atau SplitText gagal dimuat. Tidak perlu menyalin CSS atau JavaScript loader ke halaman baru.

Simpan aset gambar, video, dan lagu di dalam folder template/undangan seperti biasa. Loader tidak mengubah pengaturan lazy/eager gambar, tidak memuat ulang gambar latar, dan tidak memaksa audio/video diunduh lebih cepat. Aset di luar viewport tetap dimuat sesuai perilaku browser. Aset gambar yang gagal dicatat di console, tetapi tidak mengunci halaman selamanya.