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
// 1. Pengambilan Data Asynchronous & Kontrol State Loading (App.jsx)
useEffect(() => {
  async function loadUsers() {
    try {
      setLoading(true) // Memicu komponen Skeleton untuk merender kartu tiruan
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const data = await response.json()

      // Delay buatan agar skeleton loading terlihat
      setTimeout(() => {
        setUsers(data)      // Menyimpan hasil fetch ke state
        setLoading(false)   // Menghentikan mode loading
      }, 1000)

    } catch (err) {
      setError('Gagal mengambil data user. Silakan coba lagi.')
      setLoading(false)
    }
  }

  loadUsers()
}, [])


// 2. Kondisional Rendering untuk Skeleton Loading di UI (App.jsx)
{loading ? (
  // Merender 6 kartu tiruan selama data masih di-fetch
  [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)
) : (
  filteredUsers.map((user, index) => (
    <UserCard key={user.id} user={user} index={index} />
  ))
)}


// 3. Logika Pencarian Real-time (Navbar.jsx)
const handleLiveSearch = (e) => {
  const value = e.target.value
  setSearchTerm(value) // Mengirim huruf yang diketik langsung ke global Context

  if (value.trim() !== '') {
    setShowAll(false) // Mematikan mode tampilkan semua agar filter pencarian berjalan
  } else {
    setShowAll(true)  // Jika input kosong, kembalikan ke mode tampilkan semua data
  }
}


// 4. Fitur Switcher Tema Gelap / Terang (UserProvider.jsx)
const toggleTheme = () => {
  setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
}

useEffect(() => {
  localStorage.setItem('theme', theme) // Simpan pilihan tema ke browser
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [theme])


// 5. Tombol Like & Follow dengan State Lokal (UserCard.jsx)
const [liked, setLiked] = useState(false)
const [followed, setFollowed] = useState(false)

<button onClick={() => setLiked((prev) => !prev)}>
  {liked ? '❤️ Liked' : '🤍 Like'}
</button>
<button onClick={() => setFollowed((prev) => !prev)}>
  {followed ? '✓ Following' : '+ Follow'}
</button>


// 6. Membuka Modal Pop-up saat Kartu Diklik (UserCard.jsx)
const [showModal, setShowModal] = useState(false)

<div className="user-card__clickable" onClick={() => setShowModal(true)}>
  ...
</div>

{showModal && <UserModal user={user} onClose={() => setShowModal(false)} />}


// 7. useRef untuk Auto-Focus Input Pencarian (Navbar.jsx)
const searchRef = useRef(null)

useEffect(() => {
  searchRef.current?.focus() // Otomatis fokus ke input saat halaman pertama dibuka
}, [])

<input type="text" ref={searchRef} placeholder="Search user..." />
```

sekian dari saya terimakasih
