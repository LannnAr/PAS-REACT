function SkeletonCard() {
  return (
    <article className="user-card skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-text-group">
          <div className="skeleton-title"></div>
          <div className="skeleton-subtitle"></div>
        </div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
      <div className="skeleton-actions">
        <div className="skeleton-btn"></div>
        <div className="skeleton-btn"></div>
      </div>
    </article>
  )
}

export default SkeletonCard