import { useState, useEffect } from 'react'
import UserModal from './UserModal'
import ChatModal from './ChatModal'

function UserCard({ user, index = 0 }) {
  const [liked, setLiked] = useState(() => {
    return JSON.parse(localStorage.getItem(`liked_${user.id}`)) || false
  })
  const [followed, setFollowed] = useState(() => {
    return JSON.parse(localStorage.getItem(`followed_${user.id}`)) || false
  })
  const [showModal, setShowModal] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    localStorage.setItem(`liked_${user.id}`, JSON.stringify(liked))
  }, [liked, user.id])

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
        {/* Area klik untuk membuka modal detail */}
        <div className="user-card__clickable" onClick={() => setShowModal(true)}>
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

          {/* Tombol Chat — BARU */}
          <button
            type="button"
            className="chat-btn"
            onClick={() => setShowChat(true)}
          >
            💬 Chat
          </button>
        </div>
      </article>

      {showModal && <UserModal user={user} onClose={() => setShowModal(false)} />}
      {showChat && <ChatModal user={user} onClose={() => setShowChat(false)} />}
    </>
  )
}

export default UserCard
