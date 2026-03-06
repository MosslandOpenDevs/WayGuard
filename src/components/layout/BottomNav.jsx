import { NavLink } from 'react-router-dom'
import './BottomNav.css'

// 하단 네비게이션 탭 정의
const NAV_ITEMS = [
    { path: '/', icon: '🗺️', label: '안전지도' },
    { path: '/report', icon: '🚨', label: '신고하기' },
    { path: '/safe-return', icon: '🌙', label: '안심귀가' },
    { path: '/child-safety', icon: '👶', label: '아이안전' },
    { path: '/settings', icon: '⚙️', label: '설정' },
]

// 하단 네비게이션 바 — 5개 탭으로 주요 기능 전환
function BottomNav() {
    return (
        <nav className="bottom-nav">
            {NAV_ITEMS.map(({ path, icon, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `bottom-nav-item ${isActive ? 'active' : ''}`
                    }
                    end={path === '/'}
                >
                    <span className="bottom-nav-icon">{icon}</span>
                    <span className="bottom-nav-label">{label}</span>
                </NavLink>
            ))}
        </nav>
    )
}

export default BottomNav
