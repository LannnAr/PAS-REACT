# React User Dashboard

Aplikasi ini dibuat untuk memenuhi tugas React dengan materi:
- Instalasi React (Vite)
- Component
- useState
- useEffect
- useContext
- useRef

## Fitur yang dibangun

- Menampilkan data user dari API `https://jsonplaceholder.typicode.com/users`
- Komponen terpisah: `Navbar`, `UserCard`, `Footer`
- Interaktivitas: tombol `Like`, `Follow`, dan `Search`
- Menggunakan React Hook: `useState`, `useEffect`, `useContext`, `useRef`

## Struktur komponen

- `src/App.jsx`
  - `App` membungkus aplikasi dengan `UserProvider`
  - `AppContent` mengambil data dari API dan menampilkan daftar user
- `src/context/UserContext.jsx`
  - Membuat konteks untuk `searchTerm`
- `src/context/UserProvider.jsx`
  - Menyediakan `searchTerm` dan `setSearchTerm` ke seluruh komponen
- `src/components/Navbar.jsx`
  - Search bar dengan `useRef` untuk fokus input dan penggunaan search
- `src/components/UserCard.jsx`
  - Menampilkan nama, email, username, dan city user
  - Mendukung tombol `Like` dan `Follow`
- `src/components/Footer.jsx`
  - Footer sederhana sebagai penutup halaman

## Penjelasan implementasi

### Fetch API
Data user diambil dari API menggunakan `fetch` di dalam hook `useEffect`:

```js
useEffect(() => {
  async function loadUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    setUsers(data)
  }

  loadUsers()
}, [])
```

### Component
- `Navbar`: menampilkan search input dan tombol untuk mencari atau mengosongkan search.
- `UserCard`: menampilkan data user dan tombol `Like` / `Follow`.
- `Footer`: menampilkan keterangan singkat di bagian bawah.

### React Hook
- `useState`: menyimpan state seperti `users`, `loading`, `error`, `liked`, dan `followed`.
- `useEffect`: memanggil API saat komponen pertama kali dirender.
- `useContext`: membagikan `searchTerm` dan `setSearchTerm` ke `Navbar` dan `AppContent`.
- `useRef`: mengelola referensi input search di `Navbar` agar bisa fokus dan reset.

### Contoh potongan kode

```js
const searchRef = useRef(null)

const handleSearch = () => {
  const value = searchRef.current?.value.trim() ?? ''
  setSearchTerm(value)
}
```

## Cara menjalankan proyek

1. `npm install`
2. `npm run dev`

Buka alamat yang ditampilkan oleh Vite untuk melihat aplikasi berjalan.

## Deploy (opsional)

Beberapa cara mudah untuk deploy aplikasi statis hasil build:

- GitHub Pages (menggunakan `gh-pages`):

  1. Install package: `npm install --save-dev gh-pages`
  2. Tambahkan script deploy (sudah ditambahkan di `package.json`):

```bash
npm run predeploy
npm run deploy
```

- Vercel / Netlify: cukup login ke layanan, pilih repository, dan atur build command `npm run build` dan publish folder `dist`.

Pilih metode yang nyaman. Jika butuh, saya bisa bantu buatkan workflow GitHub Actions untuk otomatis deploy.
