# undangandigital

## Menambahkan template

Loading screen bersama ada di `shared/loading-screen.js`. Loader adalah lapisan visual di atas halaman: pemanggilan entry React dan stylesheet tetap sama seperti HTML hasil build. Tambahkan hanya script loader setelah `#root`, lalu buat `loading-assets.json` tersendiri di folder setiap template/undangan:

```html
<script type="module" crossorigin src="./assets/index-HASH.js"></script>
<link rel="stylesheet" crossorigin href="./assets/index-CSSHASH.css">
</head>
<body>
<div id="root"></div>
<script src="../../shared/loading-screen.js"></script>
</body>
```

Setiap halaman wajib memiliki manifest sendiri; jangan membuat satu manifest gabungan. Loader menyelesaikan path `./loading-assets.json` relatif terhadap URL halaman yang sedang dibuka, jadi manifest yang dipakai hanya milik template/undangan tersebut. Manifest berisi array aset relatif ke folder halaman:

```json
[
  { "type": "image", "src": "./assets/cover.webp" },
  { "type": "video", "src": "./assets/opening.mp4" },
  { "type": "audio", "src": "./assets/music.mp3" }
]
```

Loader memuat gambar kritis sampai `load`, video sampai frame awal tersedia (`loadeddata`), dan audio sampai metadata tersedia (`loadedmetadata`) tanpa menunggu seluruh lagu diunduh. Aset yang gagal dicatat di Console dan tidak menahan tampilan selamanya. Setelah preload selesai dan transisi loader berakhir, lapisan loader dihapus; lifecycle React dan animasi template tidak dikendalikan loader. Aset yang tidak ada di manifest tetap dimuat oleh template seperti biasa.

Saat menambahkan template baru di `template/<nama-template>/` atau undangan baru di `undangan/<nama-undangan>/`, buat `loading-assets.json` baru di folder tersebut. Isi hanya dengan cover, ornament, frame/video awal, atau audio yang diperlukan di layar pembuka—jangan gabungkan aset dari halaman lain atau memasukkan seluruh galeri/media besar non-awal.

Loader menampilkan teks “Ko pu / Undangan” dengan GSAP SplitText dan Great Vibes. CSS tetap menjadi fallback bila CDN animasi loader gagal dimuat. Loader tidak mengubah kode, timeline, class, style, scroll, atau lifecycle React template.

Simpan aset gambar, video, dan lagu di dalam folder template/undangan seperti biasa. Biarkan tag entry dan stylesheet hasil build tetap pada posisi dan atribut aslinya; loader tidak boleh memindahkan atau memanggil ulang entry React.