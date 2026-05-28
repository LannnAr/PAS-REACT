function NotFound({ searchTerm }) {
  return (
    <div className="not-found-container">
      <div className="not-found-icon">
        {/* Ikon Kaca Pembesar (SVG) */}
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
      <h3>Oops! User tidak ditemukan</h3>
      <p>
        Kami tidak menemukan data untuk kata kunci "<strong>{searchTerm}</strong>". 
        Coba gunakan nama, username, atau email yang lain ya!
      </p>
    </div>
  )
}

export default NotFound