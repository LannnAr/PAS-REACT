import { useState } from 'react'
import UserModal from './UserModal' // 1. PASTIKAN IMPORT FILE MODAL

function UserCard({ user }) {
  const [liked, setLiked] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [showModal, setShowModal] = useState(false) // 2. TAMBAHKAN STATE INI

  return (
    <>
      <article className="user-card">
        {/* 3. BUNGKUS PROFIL & INFO DALAM DIV CLICKABLE */}
        <div className="user-card__clickable" onClick={() => setShowModal(true)}>
         {/* Bagian Profil dengan Avatar */}
          <div className="user-card__profile">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
              alt={`Avatar ${user.name}`} 
              className="user-avatar"
            />
            <div className="user-card__header">
              <h2>{user.name}</h2>
              <span>@{user.username}</span>
            </div>
          </div>

          {/* Bagian Info */}
          <div className="user-card__body">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>City:</strong> {user.address.city}</p>
          </div>
        </div>

        {/* Bagian Tombol (Tetap di luar area clickable agar fungsinya tidak bentrok) */}
        <div className="user-card__actions">
          <button
            type="button"
            className={liked ? 'primary active' : 'primary'}
            onClick={() => setLiked((prev) => !prev)}
          >
            {liked ? '❤️ Liked' : '🤍 Like'}
          </button>
          <button
            type="button"
            className={followed ? 'secondary active' : 'secondary'}
            onClick={() => setFollowed((prev) => !prev)}
          >
            {followed ? '✓ Following' : '+ Follow'}
          </button>
        </div>
      </article>

      {/* 4. TAMPILKAN MODAL SAAT STATE TRUE */}
      {showModal && <UserModal user={user} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default UserCard