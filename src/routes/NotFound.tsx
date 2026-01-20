import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="page">
    <div className="empty-state">
      찾을 수 없는 페이지입니다. <Link to="/">홈으로 이동</Link>
    </div>
  </div>
)

export default NotFound
