# React User Dashboard (PAS-REACT)

Halo! Ini adalah aplikasi React User Dashboard yang saya bangun untuk memenuhi tugas Penilaian Akhir Semester (PAS). Proyek ini berfokus pada implementasi konsep dasar hingga menengah dalam React menggunakan teknologi modern.

Aplikasi ini berhasil saya deploy dan bisa dicoba langsung melalui tautan berikut:
👉 **[https://lannnar.github.io/PAS-REACT](https://lannnar.github.io/PAS-REACT)**

---

## 🚀 Teknologi & Materi yang Diterapkan

Dalam membangun proyek ini, saya menerapkan beberapa materi penting, di antaranya:
- **Vite (React + JSX):** Sebagai build tool yang jauh lebih cepat dan ringan dibandingkan Create React App.
- **Component-Driven Development:** Memisah UI menjadi komponen terisolasi agar mudah dikelola dan digunakan kembali (*reusable*).
- **React Hooks Esensial:** Memaksimalkan penggunaan `useState`, `useEffect`, `useContext`, dan `useRef`.
- **Fetch API & Asynchronous JavaScript:** Mengambil data eksternal secara real-time dari server pihak ketiga.

---

## 🛠️ Fitur-Fitur Utama & Dokumentasi Program

Aplikasi ini tidak hanya menampilkan data statis, melainkan sudah saya lengkapi dengan berbagai fitur interaktif:

### 1. Auto-Fetch & Skeleton Loading
Begitu aplikasi pertama kali dibuka, sistem akan otomatis mengambil data dari API `https://jsonplaceholder.typicode.com/users`. Sembari menunggu data selesai ditarik, saya menyediakan komponen *Skeleton Loading* berupa kartu tiruan abu-abu agar pengguna tahu bahwa data sedang dimuat.

### 2. Pencarian Real-time (*Live Search*)
Pengguna tidak perlu lagi menekan tombol enter atau klik "Search". Setiap kali pengguna mengetikkan huruf di kolom pencarian, aplikasi akan langsung memfilter nama, username, atau email user secara instan.

### 3. *Empty State* Interaktif dengan Animasi
Jika pengguna memasukkan kata kunci pencarian yang tidak terdaftar (tidak cocok dengan user mana pun), aplikasi akan memunculkan sebuah halaman khusus (*NotFound*) yang menampilkan ikon kaca pembesar dengan animasi melayang (*floating*) serta pesan ramah yang dinamis.

### 4. Modal Pop-up Detail Profil
Data dari API JSONPlaceholder sebenarnya sangat lengkap. Oleh karena itu, saya mendesain area kartu agar bisa diklik. Ketika diklik, layar latar belakang akan meredup (*blur*) dan memunculkan pop-up melayang (*Modal layout*) yang berisi data ekstra seperti nomor telepon, alamat lengkap, hingga informasi perusahaan tempat user bekerja.

### 5. Dual Theme (Dark & Light Mode)
Saya juga telah berhasil mengimplementasikan fitur perpindahan tema secara manual menggunakan tombol interaktif, sehingga pengguna bisa dengan nyaman melihat aplikasi dalam mode terang maupun mode gelap sesuai kenyamanan mata.

---

## 📂 Struktur Komponen dan Penjelasannya

Proyek ini saya bagi menjadi beberapa struktur file yang rapi:

- **`src/context/UserContext.jsx` & `UserProvider.jsx`**
  Berfungsi sebagai pusat manajemen state global (*Context API*). Saya menggunakannya untuk membagikan state pencarian (`searchTerm`), status tampilan (`showAll`), serta status tema aktif ke komponen mana saja tanpa perlu melakukan *prop drilling*.
- **`src/components/Navbar.jsx`**
  Berisi bar pencarian, tombol kontrol tampilan, serta tombol pemicu perpindahan tema gelap/terang. Memanfaatkan `useRef` untuk melakukan auto-focus pada input pencarian saat aplikasi pertama kali dimuat.
- **`src/components/UserCard.jsx`**
  Berfungsi merender kartu data user secara individu. Di dalamnya terdapat state lokal `liked` dan `followed` untuk interaksi tombol, serta mendeteksi klik pengguna untuk membuka modal.
- **`src/components/UserModal.jsx`**
  Komponen pop-up detail profil yang hanya muncul ketika salah satu kartu di-klik oleh pengguna.
- **`src/components/SkeletonCard.jsx`**
  Komponen tiruan kartu dengan efek animasi berkedip (*shimmering*) yang berfungsi sebagai visual penunggu selama data API belum siap ditampilkan.
- **`src/components/NotFound.jsx`**
  Komponen khusus untuk menangani tampilan saat pencarian data tidak membuahkan hasil.
- **`src/components/Footer.jsx`**
  Berisi informasi singkat mengenai teknologi React Hooks yang saya pakai di proyek ini.

---

## 💻 Penjelasan Singkat Kode Program

Berikut adalah gabungan potongan kode kunci yang menggerakkan seluruh logika utama di dalam program yang saya bangun:

```js
// 1. Pengambilan Data Asynchronous & Kontrol State Loading
useEffect(() => {
  async function loadUsers() {
    try {
      setLoading(true); // Memicu komponen Skeleton untuk merender kartu tiruan
      const response = await fetch('[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)');
      const data = await response.json();
      setUsers(data);   // Menyimpan hasil fetch data user ke state
    } catch (err) {
      setError('Gagal mengambil data user.');
    } finally {
      setLoading(false); // Menghentikan mode loading dan mengganti Skeleton dengan data asli
    }
  }
  loadUsers();
}, []);

// 2. Kondisional Rendering untuk Skeleton Loading di UI
if (loading) {
  // Merender komponen kartu tiruan berulang kali selama data masih di-fetch
  return <div className="user-grid">{[...Array(6)].map((_, i) => <SkeletonCard key="{i}"/>)}</div>;
}

// 3. Logika Pencarian Real-time di Navbar.jsx
const handleLiveSearch = (e) => {
  const value = e.target.value;
  setSearchTerm(value); // Mengirim huruf yang diketik langsung ke global Context
  
  if (value.trim() !== '') {
    setShowAll(false); // Mematikan mode tampilkan semua agar filter pencarian berjalan
  } else {
    setShowAll(true);  // Jika input kosong, kembalikan ke mode nampilin semua data
  }
};

// 4. Fitur Switcher Tema Gelap / Terang (Dark & Light Mode)
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme); // Mengubah atribut root HTML/CSS
};

// 5. Pemicu (Trigger) Jendela Modal Pop-up di UserCard.jsx
<div className="user-card__clickable" onClick={() => setSelectedUser(user)}>
  <div className="user-card__profile">
    <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`} alt={user.name} />
    <h3>{user.name}</h3>
    <p>@{user.username}</p>
  </div>
</div>

sekian dari saya terimakasih