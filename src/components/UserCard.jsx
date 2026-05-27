import { useState } from 'react'

function UserCard({ user }) {
  const [liked, setLiked] = useState(false)
  const [followed, setFollowed] = useState(false)

  return (
    <article className="user-card">
      <div className="user-card__header">
        <h2>{user.name}</h2>
        <span>@{user.username}</span>
      </div>
      <div className="user-card__body">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
      </div>
      <div className="user-card__actions">
        <button
          type="button"
          className={liked ? 'primary active' : 'primary'}
          onClick={() => setLiked((prev) => !prev)}
        >
          {liked ? 'Liked' : 'Like'}
        </button>
        <button
          type="button"
          className={followed ? 'secondary active' : 'secondary'}
          onClick={() => setFollowed((prev) => !prev)}
        >
          {followed ? 'Following' : 'Follow'}
        </button>
      </div>
    </article>
  )
}

export default UserCard
