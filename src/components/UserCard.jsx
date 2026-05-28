import { useState } from 'react'

function UserCard({ user }) {
  const [liked, setLiked] = useState(false)
  const [followed, setFollowed] = useState(false)

  return (
    <article className="user-card">
      {/* Bagian Profil dengan Avatar */}
      <div className="user-card__profile">
        <img 
          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.username}&backgroundColor=c084fc`} 
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

      {/* Bagian Tombol */}
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
  )
}

export default UserCard