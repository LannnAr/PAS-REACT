import { useEffect, useRef, useState } from 'react'

// ============================================================
// BOT RESPONSE LOGIC
// Bot akan menjawab berdasarkan data profil user + keyword pesan
// ============================================================
function getBotResponse(user, message) {
  const msg = message.toLowerCase().trim()

  // 1. Sapaan
  if (/\b(halo|hai|hi|hey|hei|selamat|pagi|siang|malam)\b/.test(msg)) {
    const greetings = [
      `Halo! 👋 Senang kamu menyapa saya, ${user.name} di sini!`,
      `Hai! 😊 Saya ${user.name}, ada yang bisa saya bantu?`,
      `Hey! Selamat datang! Saya ${user.name} dari ${user.address.city} 🏙️`,
      `Selamat pagi! Apa kabar hari ini? 🌅`,
      `Hi there! Senang bertemu denganmu! 🎉`,
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // 2. Tanya nama
  if (/\b(nama|siapa|kamu|dirimu|profil|introducing)\b/.test(msg)) {
    return `Nama saya **${user.name}**, dipanggil @${user.username}. Tinggal di ${user.address.city} dan kerja di ${user.company.name}. Nice to meet you! 😊`
  }

  // 3. Tanya lokasi
  if (/\b(tinggal|domisili|kota|mana|asal|dari|alamat|tempat)\b/.test(msg)) {
    return `Saya tinggal di ${user.address.city}, tepatnya di ${user.address.street}. Kamu sendiri dari mana? 🏙️`
  }

  // 4. Tanya pekerjaan
  if (/\b(kerja|kerjaan|pekerjaan|perusahaan|kantor|bisnis|company|profesi)\b/.test(msg)) {
    return `Saya bekerja di **${user.company.name}**.\nMotto perusahaan kami:\n*"${user.company.catchPhrase}"* 💼\n\nFokus bisnis kami di bidang ${user.company.bs}.`
  }

  // 5. Tanya kontak
  if (/\b(email|kontak|hubungi|nomor|telepon|hp|website|web)\b/.test(msg)) {
    return `Bisa hubungi saya di:\n📧 ${user.email}\n📞 ${user.phone}\n🌐 ${user.website}`
  }

  // 6. Tanya kabar
  if (/\b(kabar|gimana|bagaimana|apa kabar|how are you|baik)\b/.test(msg)) {
    const responses = [
      `Alhamdulillah baik! Lagi sibuk di ${user.company.name} nih. Kamu sendiri gimana? 😊`,
      `Baik banget, makasih udah nanya! Baru selesai meeting. Kamu? 😄`,
      `Lagi semangat! Habis dapat project baru di kantor. Gimana kabarmu? 🚀`,
      `Fit and fresh! Habis olahraga pagi. Kamu udah gerak-gerak? 💪`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // 7. Tanya udah makan belum / Makanan
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

  // 8. Tanya hobi
  if (/\b(suka|hobi|hobby|kesukaan|favorit|ngapain|aktifitas|kegiatan)\b/.test(msg)) {
    return `Hmm, kalau waktu luang saya suka jalan-jalan di sekitar ${user.address.city}, main game, dan baca buku. Kamu suka ngapain? 😄`
  }

  // 9. Tanya usia
  if (/\b(umur|usia|berapa umur|berapa usia|tua|tahun|lahir)\b/.test(msg)) {
    const ages = ['25', '28', '30', '32', '27', '29']
    const age = ages[Math.floor(Math.random() * ages.length)]
    return `Saya ${age} tahun, masih produktif di usia ini! 😄 Bekerja dan menikmati hidup. Kamu umur berapa?`
  }

  // 10. Tanya status pernikahan
  if (/\b(nikah|status|sudah|kawin|menikah|single|couple|istri|suami)\b/.test(msg)) {
    return `Ooh, pertanyaan pribadi! 😄 Setiap orang punya ceritanya sendiri. Yang penting sekarang saya fokus dengan karir. Bagaimana denganmu?`
  }

  // 11. Tanya hobby tech / programming
  if (/\b(coding|program|teknologi|tech|developer|ngoding|komputer)\b/.test(msg)) {
    return `Saya suka banget! Waktu luang sering eksplorasi teknologi baru. Di kantor juga banyak coding. Kamu juga programmer? 💻`
  }

  // 12. Tanya tentang musik
  if (/\b(musik|lagu|nyanyi|singer|band|suara|dengar)\b/.test(msg)) {
    const musicResponses = [
      `Saya suka musik! Favorit saya genre pop dan indie. Kamu dengar musik apa? 🎵`,
      `Musik adalah jiwa saya! Kalau lagi capek, langsung putar lagu favorit. Lagu apa yang kamu suka? 🎧`,
      `Hobi saya banget! Dari klasik sampai modern semua suka. Kamu selera musik apa? 🎸`,
    ]
    return musicResponses[Math.floor(Math.random() * musicResponses.length)]
  }

  // 13. Tanya tentang buku / membaca
  if (/\b(buku|baca|membaca|novel|cerita|penulis|author|mendengar|lihat)\b/.test(msg)) {
    return `Saya hobi membaca! Dari fiksi sampai non-fiksi, semua bagus. Lagi baca buku motivasi sekarang. Kamu suka membaca? 📖`
  }

  // 14. Tanya tentang film / serial
  if (/\b(film|series|nonton|tontonan|movie|drama|sinema|netflix)\b/.test(msg)) {
    const movieResponses = [
      `Suka banget nonton film! Favorit saya genre thriller dan action. Kamu suka film apa? 🎬`,
      `Lagi nontonin series di Netflix nih, seru banget! Rekomendasi film apa? 📺`,
      `Film adalah escape saya dari rutinitas kantor. Kamu favorite film-mu apa? 🍿`,
    ]
    return movieResponses[Math.floor(Math.random() * movieResponses.length)]
  }

  // 15. Tanya tentang olahraga
  if (/\b(olahraga|sport|gym|fitness|lari|sepak bola|badminton|renang)\b/.test(msg)) {
    return `Olahraga sangat penting untuk saya! Biasanya saya lari pagi atau ke gym. Menjaga kesehatan itu prioritas! 💪 Kamu suka olahraga apa?`
  }

  // 16. Tanya tentang traveling
  if (/\b(jalan|traveling|wisata|liburan|holiday|trip|petualangan|explore)\b/.test(msg)) {
    return `Saya love traveling! Ingin explore banyak tempat baru. ${user.address.city} sudah familiar, pengen lihat tempat lain. Kamu suka kemana-mana? ✈️`
  }

  // 17. Tanya tentang impian / goals
  if (/\b(impian|mimpi|goal|cita|rencana|harapan|masa depan|target)\b/.test(msg)) {
    return `Impian saya adalah naik level di karir, punya bisnis sendiri, dan bisa traveling ke berbagai negara. Kamu punya impian apa? 🚀`
  }

  // 18. Tanya tentang stress / beban
  if (/\b(stress|stress|beban|sibuk|capek|lelah|down|sedih|susah)\b/.test(msg)) {
    const stressResponses = [
      `Wajar sih capek, apalagi kerjaan lagi banyak. Tapi saya selalu ingat untuk balance dengan istirahat. Semangat ya! 💪`,
      `Sama! Kadang memang berat. Tapi saya selalu ingat, ini fase saja. Setiap masalah pasti ada solusinya. Kuat ya! 🙌`,
      `Pernah merasa begitu. Tips saya: istirahat cukup, olahraga, dan nonton hal yang bikin terhibur. Hang in there! 😊`,
    ]
    return stressResponses[Math.floor(Math.random() * stressResponses.length)]
  }

  // 19. Tanya tentang kesuksesan / prestasi
  if (/\b(sukses|berhasil|prestasi|bangga|apresiasi|hebat|keren|proud)\b/.test(msg)) {
    return `Makasih! Terus berjuang untuk menjadi lebih baik. Sukses itu proses, bukan tujuan. Kamu juga pasti bisa mencapai sukses! 🎯`
  }

  // 20. Tanya "apa kabar kantor"
  if (/\b(kantor|kerja|meeting|project|deadline|boss|kolega|teman kerja)\b/.test(msg)) {
    const workResponses = [
      `Kantor lagi sibuk dengan project besar! Deadline seminggu lagi. Tapi team-nya solid, pasti bisa handle. Kamu juga sibuk?`,
      `Alhamdulillah kantor sehat-sehat saja. Lagi rapat brainstorm untuk strategi baru. Menarik! Gimana denganmu?`,
      `Kolega-kolega di ${user.company.name} asyik! Sering bersama untuk achieve target. Kamu bekerja di mana?`,
    ]
    return workResponses[Math.floor(Math.random() * workResponses.length)]
  }

  // 21. Tanya "selamat ulang tahun" atau ucapan khusus
  if (/\b(ulang tahun|selamat|ucapan|congrats|congratulation)\b/.test(msg)) {
    return `Wah, terima kasih banyak! Sangat appreciate 🎂 Semoga kamu juga selalu sehat dan bahagia ya! 🥳`
  }

  // 22. Terima kasih
  if (/\b(makasih|terima kasih|thanks|thank you|thx|tq)\b/.test(msg)) {
    return `Sama-sama! 😊 Senang bisa ngobrol sama kamu. Ada lagi yang mau ditanyakan?`
  }

  // 23. Perpisahan
  if (/\b(bye|dadah|sampai jumpa|selamat tinggal|pamit|cabut|goodbye|see you)\b/.test(msg)) {
    return `Sampai jumpa! Senang ngobrol denganmu 👋\nJangan lupa mampir lagi ya! Semangat terus! 💪`
  }

  // Default responses — tetap terasa natural
  const defaults = [
    `Menarik! Coba cerita lebih dong, saya penasaran 🤔`,
    `Wah, sebagai orang ${user.address.city} saya relate banget sama itu! ✨`,
    `Di ${user.company.name} kami sering diskusi hal seperti ini. Seru! 💡`,
    `Haha, kamu lucu juga ya! 😄 Ada lagi?`,
    `Interesting sekali! Bisa jelasin lebih detail? 👀`,
    `Hmm belum pernah kepikiran itu sebelumnya. Good point! 🙌`,
    `"${user.company.catchPhrase}" — itulah prinsip hidup saya! 😄`,
    `Kamu tahu banyak! Saya jadi penasaran, cerita lagi dong! 🎉`,
    `Setuju banget dengan pendapat kamu! Minds think alike! 🧠`,
    `Wow, perspective baru untuk saya! Makasih ya! 🙏`,
    `Bener! Itulah yang saya percaya juga. Great minds! 👏`,
    `Hmm... menarik sih. Tapi ada perspektif lain juga loh 😊`,
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

// ============================================================
// CHAT MODAL COMPONENT
// ============================================================
function ChatModal({ user, onClose }) {
  // Ambil history chat dari localStorage, atau mulai dengan pesan pembuka
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

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Simpan pesan ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem(`chat_${user.id}`, JSON.stringify(messages))
  }, [messages, user.id])

  // Auto scroll ke bawah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Auto focus input saat modal dibuka
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = () => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg = {
      id: Date.now(),
      from: 'user',
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Delay sebelum bot balas — biar terasa natural
    const delay = 800 + Math.random() * 1200
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        from: 'bot',
        text: getBotResponse(user, text),
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    const initial = [
      {
        id: Date.now(),
        from: 'bot',
        text: `Chat direset! 👋 Halo lagi, saya ${user.name}. Ada yang mau ditanyakan?`,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      },
    ]
    setMessages(initial)
    localStorage.setItem(`chat_${user.id}`, JSON.stringify(initial))
  }

  // Format teks bold (**teks**) jadi <strong>
  const formatText = (text) => {
    return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="chat-header">
          <div className="chat-header__info">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
              alt={user.name}
              className="chat-avatar"
            />
            <div>
              <strong>{user.name}</strong>
              <span className="chat-status">
                {isTyping ? '✏️ mengetik...' : '🟢 Online'}
              </span>
            </div>
          </div>
          <div className="chat-header__actions">
            <button type="button" className="secondary" onClick={clearChat} title="Hapus riwayat chat">
              🗑️
            </button>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Tutup chat">
              &times;
            </button>
          </div>
        </div>

        {/* ── Daftar Pesan ── */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble-wrapper ${msg.from === 'user' ? 'chat-bubble-wrapper--user' : ''}`}
            >
              {msg.from === 'bot' && (
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  alt={user.name}
                  className="chat-bubble-avatar"
                />
              )}
              <div className={`chat-bubble ${msg.from === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
                <p style={{ whiteSpace: 'pre-line' }}>{formatText(msg.text)}</p>
                <span className="chat-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-bubble-wrapper">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.name}
                className="chat-bubble-avatar"
              />
              <div className="chat-bubble chat-bubble--bot chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input Area ── */}
        <div className="chat-input">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Kirim pesan ke ${user.name}...`}
            disabled={isTyping}
          />
          <button
            type="button"
            className="primary"
            onClick={sendMessage}
            disabled={isTyping || !input.trim()}
          >
            Kirim ➤
          </button>
        </div>

      </div>
    </div>
  )
}

export default ChatModal
