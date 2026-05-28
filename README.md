# React User Dashboard

Yo! Ini aplikasi React yang saya bikin buat ngerjain tugas React.
materi-materi ini:
- Setup React pake Vite (lebih cepet dari create-react-app)
- Component
- useState, useEffect, useContext, useRef
- Fetch API

## Fitur-fitur yang ada

- Ambil data user dari API `https://jsonplaceholder.typicode.com/users`
- Punya komponen yang terpisah: `Navbar`, `UserCard`, `Footer`
- Bisa di-interaksi: tombol `Like`, `Follow`, sama `Search`
- Pake React Hooks yang penting: `useState`, `useEffect`, `useContext`, `useRef`
- Bonus: tombol "Tampilkan Semua Data" buat liat semua user sekaligus

## Struktur komponennya

- `src/App.jsx`
  - `App` bungkus aplikasi dengan `UserProvider`
  - `AppContent` ambil data dari API terus tampilin list user
- `src/context/UserContext.jsx`
  - Bikin konteks untuk `searchTerm` sama `showAll`
- `src/context/UserProvider.jsx`
  - Share `searchTerm`, `setSearchTerm`, `showAll`, sama `setShowAll` ke semua komponen
- `src/components/Navbar.jsx`
  - Ada search bar yang bisa dicari pakai `useRef` buat auto-focus
  - Plus tombol "Tampilkan Semua Data" buat liat user sekaligus
- `src/components/UserCard.jsx`
  - Tampilin nama, email, username, sama kota user
  - Ada tombol `Like` sama `Follow` yang bisa diklik
- `src/components/Footer.jsx`
  - Footer simpel buat penutup halaman

## Cara kerjanya

### Ambil data dari API
Data user diambil pake `fetch` di dalam `useEffect`:

\`\`\`js
useEffect(() => {
  async function loadUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    setUsers(data)
  }

  loadUsers()
}, [])
\`\`\`

### Component
- `Navbar`: punya search input, tombol search, clear, sama tombol tampilkan semua data
- `UserCard`: tampilin data user dan tombol like/follow
- `Footer`: info singkat di bawah

### React Hooks yang dipakai
- `useState`: nyimpen state kayak `users`, `loading`, `error`, `liked`, `followed`, dll
- `useEffect`: panggil API pas component pertama kali di-render
- `useContext`: share `searchTerm` dan `showAll` ke komponen lain
- `useRef`: handle input search biar bisa fokus dan di-reset

### Contoh kode potongannya

\`\`\`js
const searchRef = useRef(null)

const handleSearch = () => {
  const value = searchRef.current?.value.trim() ?? ''
  setSearchTerm(value)
}
\`\`\`

## Cara menjalankan

1. \`npm install\`
2. \`npm run dev\`

Terus buka URL yang muncul di terminal, siap!

## Deploy (optional)

Mau di-deploy? Ada beberapa cara yang gampang:

- **GitHub Pages** (udah dikonfigurasi di repo ini):

  \`\`\`bash
  npm run deploy
  \`\`\`

- **Vercel / Netlify**: Login, pilih repo, atur build command \`npm run build\`, publish folder \`dist\`. Done!

Gampang kan? Saya udah setup GitHub Actions juga biar otomatis deploy setiap push.
