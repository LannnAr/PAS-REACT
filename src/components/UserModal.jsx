function UserModal({ user, onClose }) {
  if (!user) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        
        <div className="modal-header">
          <div className="modal-avatar">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
              alt={user.name} 
            />
          </div>
          <h2>{user.name}</h2>
          <p className="modal-username">@{user.username}</p>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <h4><span>📞</span> Kontak & Media Sosial</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telepon:</strong> {user.phone}</p>
            <p>
              <strong>Website:</strong>{' '}
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </p>
          </div>

          <div className="info-section">
            <h4><span>🏢</span> Perusahaan</h4>
            <p><strong>Nama:</strong> {user.company?.name}</p>
            <p><strong>Slogan:</strong> <em>"{user.company?.catchPhrase}"</em></p>
            <p><strong>Fokus Bisnis:</strong> {user.company?.bs}</p>
          </div>

          <div className="info-section">
            <h4><span>📍</span> Alamat Lengkap</h4>
            <p><strong>Jalan:</strong> {user.address?.street}, {user.address?.suite}</p>
            <p><strong>Kota:</strong> {user.address?.city}</p>
            <p><strong>Kode Pos:</strong> {user.address?.zipcode}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserModal