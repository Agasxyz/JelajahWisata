# Eco Journey: Sustainable Tourism Experience

Proyek ini adalah portal pariwisata berkelanjutan (**Eco Journey**) Nusantara yang dirancang sebagai **Multi-Page Application (MPA)** murni berbasis statis (HTML, CSS, dan Javascript dasar). Desain dan konten aplikasi ini berpusat pada edukasi pelestarian lingkungan hidup (SDG 15) dan pemberdayaan ekonomi masyarakat lokal (SDG 8).

Seluruh kartu objek wisata ditulis secara statis dalam HTML demi kegunaan SEO yang maksimal, dan status aplikasi (seperti tema gelap/terang serta daftar favorit) disinkronkan antar-navigasi halaman menggunakan **Query Parameters** di URL, tanpa membebani penyimpanan lokal browser (`LocalStorage`/`SessionStorage`) maupun database.

---

## 🚀 Cara Menjalankan Project

Aplikasi ini menggunakan **Pure HTML, CSS, dan Javascript (Vanilla MPA)** tanpa tahap kompilasi (build step) eksternal. Anda dapat menjalankannya dengan mudah melalui 2 metode:

### Metode 1: Buka Langsung di Browser (Rekomendasi Tercepat)
1. Buka folder project hasil ekstraksi.
2. Cari file `index.html` di root folder.
3. Klik kanan `index.html` -> Pilih **Open With** -> Pilih browser Anda (Chrome, Edge, Firefox, dll.).
4. Aplikasi siap dijalankan dan dijelajahi secara interaktif!

### Metode 2: Menggunakan Local Web Server
Untuk performa pemuatan aset yang paling optimal, Anda disarankan menggunakan local web server:
- **VS Code Live Server**: Klik kanan `index.html` dan pilih **Open with Live Server**.
- **NodeJS/npx**: Jalankan perintah `npx serve` pada terminal di direktori project ini.
- **Python**: Jalankan perintah `python -m http.server 8000` di terminal Anda.

---

## 🛠️ Tech Stack & Library

1. **HTML5**: Struktur semantik kerangka aplikasi, semua data katalog (9 kartu) didefinisikan secara statis untuk struktur dokumen yang kaya dan SEO-friendly.
2. **Vanilla CSS3**: Styling kustom menggunakan CSS Variables (untuk Light & Dark mode), Flexbox, CSS Grid, kustom scrollbar, serta keyframe micro-animations.
3. **Vanilla JavaScript (ES6)**: Pengendali navigasi antar-halaman (MPA), sinkronisasi status via query parameter, filter pencarian instan pada elemen DOM, kalkulator anggaran, galeri foto, dan input ulasan dinamis.
4. **Google Fonts (Outfit & Inter)**: Typography premium modern.
5. **FontAwesome Icons (v6.4 CDN)**: Ikon visual untuk navigasi, tombol, dan form.

---

## ✨ Fitur-Fitur Utama Aplikasi

### 1. Multi-Page Navigation & State Sync
Navigasi antar berkas HTML (`index.html`, `explore.html`, `favorites.html`, `detail.html`) berjalan secara mandiri dengan meneruskan status tema gelap (`theme=dark/light`) dan daftar favorit (`fav=1,3,9`) melalui parameter URL query string, menjaga pengalaman pengguna tetap mulus tanpa menggunakan media penyimpanan lokal.

### 2. Mode Terang & Gelap (Light / Dark Mode)
Fitur toggle visual premium di navbar untuk mengubah tampilan website ke mode gelap/terang secara mulus dengan transisi CSS.

### 3. Destinasi Eco-Adventures Pilihan (Favorites)
Pengguna dapat menandai destinasi wisata favorit dengan mengeklik tombol hati di pojok kiri atas setiap kartu objek wisata. Daftar wisata yang disimpan akan disinkronkan ke dalam halaman **"Favorit Saya"** secara interaktif.

### 4. Galeri Foto Interaktif (Halaman Detail)
Halaman detail setiap wisata dilengkapi dengan galeri foto berupa row *thumbnails* di bawah foto utama. Pengguna dapat mengeklik *thumbnails* pendukung untuk mengubah foto utama secara dinamis dengan efek transisi transparan (*fade effect*).

### 5. Tab Informasi & Panduan Rencana (Itinerary)
Halaman detail wisata menggunakan sistem tab interaktif:
- **Deskripsi Lengkap**: Menampilkan informasi rinci cagar budaya atau cagar alam destinasi.
- **Panduan Rencana (Itinerary)**: Menampilkan rekomendasi agenda perjalanan 3 Hari 2 Malam (Day 1 - Day 3) secara visual.

### 6. Estimator Anggaran Wisata (Budget Calculator)
Widget kalkulator interaktif di halaman detail bagi pengunjung untuk merencanakan anggaran liburan secara dinamis. Pilihan yang tersedia meliputi:
- Gaya perjalanan (Backpacker, Standard, Luxury).
- Durasi menginap (Hari).
- Moda transportasi utama (Kereta Api, Mobil Sewa, Pesawat Terbang, lokal).
Sistem akan menghitung secara real-time pengeluaran akomodasi, biaya harian, dan tiket transportasi untuk memunculkan **Total Estimasi Anggaran**.

### 7. Ulasan Pengunjung (Comments & Ratings)
Halaman Detail Wisata menampilkan form ulasan interaktif dengan rating bintang, nama, email, dan pesan ulasan. Ulasan baru akan terbit secara dinamis serta memperbarui nilai rata-rata rating bintang destinasi secara real-time.
