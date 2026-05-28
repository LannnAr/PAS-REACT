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

### 6. 🤖 Smart Bot Chat Interaktif
Setiap user card dilengkapi dengan tombol "Chat" yang memungkinkan pengguna untuk berkomunikasi langsung dengan profil user tersebut menggunakan AI Bot yang cerdas. Bot ini tidak hanya memberikan jawaban generik, tetapi juga:

- **Memahami 23+ Kategori Pertanyaan** yang mencakup:
  - Sapaan dan pertanyaan umum (Halo, Apa kabar?)
  - Pertanyaan identitas (Siapa nama kamu? Umur berapa?)
  - Pertanyaan profesional (Kerja di mana? Apa pekerjaan kamu?)
  - Pertanyaan personal (Hobi apa? Suka musik apa?)
  - Pertanyaan gaya hidup (Udah makan? Olahraga apa? Traveling?)
  - Pertanyaan kesehatan mental (Stress? Capek?)
  - Ucapan spesial (Selamat ulang tahun, Congratulations!)
  - Dan masih banyak lagi...

- **Personalisasi Maksimal:** Setiap respons bot disesuaikan dengan data profil user (nama, kota, perusahaan, motto perusahaan) sehingga percakapan terasa lebih natural dan meaningful.

- **Respons yang Variatif:** Untuk pertanyaan yang sama, bot bisa memberikan jawaban berbeda-beda menggunakan array respons random, sehingga tidak terasa repetitif.

- **Chat History Tersimpan:** Setiap percakapan dengan user disimpan ke `localStorage`, sehingga ketika pengguna membuka chat dengan user yang sama lagi, history chat akan tetap terjaga.

- **Delay Realistis:** Bot memberikan delay natural (800-2000ms) sebelum merespons pesan, memberikan kesan seolah-olah user benar-benar sedang mengetik.

- **Default Respons Cerdas:** Jika pertanyaan tidak cocok dengan kategori yang terdaftar, bot memiliki 12+ respons generic yang tetap terasa personal dan engaging.

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
- **`src/components/ChatModal.jsx`**
  Komponen khusus untuk menampilkan chat interaktif dengan bot AI. Komponen ini menangani:
  - Rendering pesan (user dan bot)
  - Input dan pengiriman pesan ke bot
  - Logika bot (`getBotResponse`) yang cerdas dan responsif
  - Penyimpanan history chat ke localStorage
  - Animasi typing status dan scroll otomatis ke pesan terbaru

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


// 8. Smart Bot AI Response Engine (ChatModal.jsx)
function getBotResponse(user, message) {
  const msg = message.toLowerCase().trim()

  // Contoh: Kategori pertanyaan tentang makan
  if (/\b(makan|makan belum|udah makan|makanan|lapar|perut|lunch|breakfast|dinner)\b/.test(msg)) {
    const eatResponses = [
      `Belum! Lagi nunggu jam istirahat kantor. Kamu udah? Apa yang dimakan? 🍽️`,
      `Sudah, tadi pagi makan nasi goreng enak! Sekarang lagi ngopi. Kamu udah makan? ☕`,
      `Habis makan bersama kolega di kantin kantor. Lezat banget! Kamu lapar? 😋`,
      `Belum sempat, sibuk dengan deadline. Mungkin nanti jajan aja. Kamu? 🍕`,
      `Udah! Tadi siang makan soto ayam di dekat kantor. Recommended banget! 🍲`,
    ]
    return eatResponses[Math.floor(Math.random() * eatResponses.length)]
  }

  // Contoh: Kategori pertanyaan tentang hobi
  if (/\b(suka|hobi|hobby|kesukaan|favorit|ngapain|aktifitas|kegiatan)\b/.test(msg)) {
    return `Hmm, kalau waktu luang saya suka jalan-jalan di sekitar ${user.address.city}, main game, dan baca buku. Kamu suka ngapain? 😄`
  }

  // ... (23+ kategori pertanyaan lainnya)

  // Respons default jika tidak cocok dengan kategori manapun
  const defaults = [
    `Menarik! Coba cerita lebih dong, saya penasaran 🤔`,
    `Wah, sebagai orang ${user.address.city} saya relate banget sama itu! ✨`,
    `Di ${user.company.name} kami sering diskusi hal seperti ini. Seru! 💡`,
    `Haha, kamu lucu juga ya! 😄 Ada lagi?`,
    `Interesting sekali! Bisa jelasin lebih detail? 👀`,
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

// 9. Manajemen State Chat & Penyimpanan ke localStorage (ChatModal.jsx)
const [messages, setMessages] = useState(() => {
  const saved = localStorage.getItem(`chat_${user.id}`)
  return saved
    ? JSON.parse(saved)
    : [
        {
          id: 1,
          from: 'bot',
          text: `Halo! 👋 Saya **${user.name}** (@${user.username}).\nAda yang mau kamu tanyakan ke saya?`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]
})

// Setiap ada perubahan messages, simpan ke localStorage
useEffect(() => {
  localStorage.setItem(`chat_${user.id}`, JSON.stringify(messages))
}, [messages, user.id])
```

---

## 🎯 Kategori Pertanyaan Bot yang Tersedia (Total 23+)

Berikut adalah daftar lengkap kategori pertanyaan yang dapat dijawab oleh Bot AI:

| No | Kategori | Contoh Pertanyaan | Respons Bot |
|---|---|---|---|
| 1 | Sapaan | Halo, Hai, Selamat pagi | Greeting dinamis dengan nama user |
| 2 | Tanya Nama | Siapa nama kamu? | Nama lengkap, username, kota, perusahaan |
| 3 | Tanya Lokasi | Tinggal di mana? | Alamat lengkap & tempat tinggal |
| 4 | Tanya Pekerjaan | Kerja di mana? | Info perusahaan & motto bisnis |
| 5 | Tanya Kontak | Email? Telepon? | Email, nomor telepon, website |
| 6 | Tanya Kabar | Apa kabar? | Respons variatif tentang kabar user |
| 7 | 🔥 Tanya Makan | Udah makan belum? | Respons random tentang status makan & rekomendasi |
| 8 | Tanya Hobi | Suka apa? | Hobi & aktivitas favorit user |
| 9 | Tanya Usia | Umur berapa? | Usia random yang reasonable |
| 10 | Tanya Status | Sudah menikah? | Respons diplomatis tentang status |
| 11 | Tanya Tech | Programmer? | Topik teknologi & coding |
| 12 | Tanya Musik | Musik apa favorit? | Diskusi preferensi musik |
| 13 | Tanya Buku | Hobi membaca? | Rekomendasi buku & kebiasaan baca |
| 14 | Tanya Film | Suka nonton apa? | Diskusi film & series favorit |
| 15 | Tanya Olahraga | Olahraga apa? | Aktivitas fisik & fitness |
| 16 | Tanya Traveling | Jalan-jalan? | Rencana wisata & petualangan |
| 17 | Tanya Impian | Impian apa? | Goal & aspirasi masa depan |
| 18 | Tanya Stress | Merasa stress? | Support emosional & tips |
| 19 | Tanya Sukses | Congrats! | Apresiasi & motivasi |
| 20 | Tanya Kantor | Kabar kantor? | Update pekerjaan & kantor |
| 21 | Ucapan Spesial | Selamat ulang tahun | Respons untuk momen spesial |
| 22 | Terima Kasih | Makasih, Thanks | Balasan ucapan terima kasih |
| 23 | Perpisahan | Bye, Dadah, Sampai jumpa | Ucapan selamat tinggal |

Bot juga memiliki **12+ respons default** yang generic namun tetap terasa personal jika pertanyaan tidak cocok dengan kategori manapun.


SEKIAN DARI SAYA TERIMAKASIH

---
