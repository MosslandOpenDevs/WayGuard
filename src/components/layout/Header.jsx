import { useLocation } from 'react-router-dom'
import './Header.css'

// 각 페이지별 헤더 제목 매핑
const PAGE_TITLES = {
    '/': '안전 지킴이',
    '/report': '위험 신고하기',
    '/safe-return': '안심 귀가',
    '/child-safety': '아이 안전',
    '/settings': '설정',
}

// 상단 헤더 컴포넌트 — 로고, 검색, 프로필 표시
function Header() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const title = PAGE_TITLES[location.pathname] || '안전 지킴이'

    return (
        <header className="header">
            <div className="header-inner">
                {/* 로고 영역 */}
                <div className="header-logo">
                    <div className="header-shield">🛡️</div>
                    <h1 className="header-title">{title}</h1>
                </div>

                {/* 홈일 때만 검색바 표시 */}
                {isHome && (
                    <div className="header-search">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="동네를 검색하세요"
                        />
                    </div>
                )}

                {/* 프로필 */}
                <button className="header-profile" aria-label="프로필">
                    <span>👤</span>
                </button>
            </div>
        </header>
    )
}

export default Header
