import { useState, useEffect } from 'react'
import UserModal from './UserModal'

function UserCard({ user, index = 0 }) {
  // Ambil data liked dari localStorage saat komponen pertama kali dimuat
  const [liked, setLiked] = useState(() => {
    return JSON.parse(localStorage.getItem(`liked_${user.id}`)) || false
  })

  // Ambil data followed dari localStorage saat komponen pertama kali dimuat
  const [followed, setFollowed] = useState(() => {
    return JSON.parse(localStorage.getItem(`followed_${user.id}`)) || false
  })

  const [showModal, setShowModal] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  // Simpan perubahan liked ke localStorage setiap kali nilainya berubah
  useEffect(() => {
    localStorage.setItem(`liked_${user.id}`, JSON.stringify(liked))
  }, [liked, user.id])

  // Simpan perubahan followed ke localStorage setiap kali nilainya berubah
  useEffect(() => {
    localStorage.setItem(`followed_${user.id}`, JSON.stringify(followed))
  }, [followed, user.id])

  return (
    <>
      <article
        className={`user-card${isAnimating ? ' card-animate' : ''}`}
        style={isAnimating ? { animationDelay: `${index * 80}ms` } : {}}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        {/* Area klik untuk membuka modal */}
        <div className="user-card__clickable" onClick={() => setShowModal(true)}>
          {/* Profil dengan Avatar */}
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

          {/* Info */}
          <div className="user-card__body">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>City:</strong> {user.address.city}</p>
          </div>
        </div>

        {/* Tombol aksi */}
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

      {showModal && <UserModal user={user} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default UserCard
