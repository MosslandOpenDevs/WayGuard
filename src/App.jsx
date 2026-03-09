import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './utils/supabaseClient'
import Home from './pages/Home'
import Report from './pages/Report'
import SafeReturn from './pages/SafeReturn'
import ChildSafety from './pages/ChildSafety'
import Community from './pages/Community'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'

// 페이지별 제목 매핑
const PAGE_TITLES = {
    '/': '안전 지킴이',
    '/report': '위험 신고하기',
    '/safe-return': '안심 귀가',
    '/child-safety': '아이 안전',
    '/community': '우리 동네 안전 톡',
    '/settings': '설정',
}

// 하단 네비게이션 탭 정의
const NAV_ITEMS = [
    { path: '/', icon: 'map', label: '지도' },
    { path: '/report', icon: 'campaign', label: '신고' },
    { path: '/community', icon: 'forum', label: '커뮤니티' },
    { path: '/settings', icon: 'person', label: '마이' },
]

// 앱 루트 — Stitch 디자인 기반 레이아웃
function App() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isCommunity = location.pathname === '/community'
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
    const title = PAGE_TITLES[location.pathname] || '안전 지킴이'

    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-primary">로딩 중...</div>
    }

    // 간단한 라우트 가드 컴포넌트
    const ProtectedRoute = ({ children }) => {
        if (!session) {
            return <Navigate to="/login" replace />
        }
        return children
    }

    return (
        <div className="relative mx-auto max-w-[430px] min-h-screen bg-white dark:bg-slate-900 flex flex-col overflow-hidden shadow-2xl">
            {/* 헤더 — 커뮤니티, 로그인, 회원가입 페이지는 자체 헤더가 있으므로 숨김 */}
            {!isCommunity && !isAuthPage && (
                <header className="pt-4 pb-4 px-4 bg-white dark:bg-slate-900 z-20 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-3xl font-bold">shield_with_heart</span>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
                        </div>
                        {session ? (
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-slate-500">person</span>
                            </div>
                        ) : (
                            <NavLink to="/login" className="text-sm font-bold text-primary">로그인</NavLink>
                        )}
                    </div>
                    {/* 홈일 때만 검색바 표시 */}
                    {isHome && (
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400">search</span>
                            </div>
                            <input
                                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
                                placeholder="동네를 검색하세요"
                                type="text"
                            />
                        </div>
                    )}
                </header>
            )}

            {/* 메인 콘텐츠 */}
            <main className="flex-1 overflow-y-auto relative">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Home remains public for viewing the map, but features may require login */}
                    <Route path="/" element={<Home />} />
                    <Route path="/child-safety" element={<ChildSafety />} />

                    {/* Protected Routes */}
                    <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
                    <Route path="/safe-return" element={<ProtectedRoute><SafeReturn /></ProtectedRoute>} />
                    <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings session={session} /></ProtectedRoute>} />
                </Routes>
            </main>

            {/* 하단 네비게이션 — Auth 페이지에서는 숨김 */}
            {!isAuthPage && (
                <nav className="relative bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-6 pt-2 w-full flex items-center z-50">
                    {/* 1. 지도 */}
                    <div className="w-1/5 flex justify-center">
                        <NavLink
                            to={NAV_ITEMS[0].path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                            }
                        >
                            <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[0].icon}</span>
                            <span className="text-[10px] font-medium">{NAV_ITEMS[0].label}</span>
                        </NavLink>
                    </div>
                    {/* 2. 신고 */}
                    <div className="w-1/5 flex justify-center">
                        <NavLink
                            to={NAV_ITEMS[1].path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                            }
                        >
                            <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[1].icon}</span>
                            <span className="text-[10px] font-medium">{NAV_ITEMS[1].label}</span>
                        </NavLink>
                    </div>

                    {/* 3. 중앙 긴급 SOS 플로팅 버튼 (정중앙 20% 영역) */}
                    <div className="w-1/5 flex flex-col items-center justify-center relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3">
                            <NavLink
                                to="/safe-return"
                                className={({ isActive }) =>
                                    `w-[60px] h-[60px] rounded-full shadow-lg shadow-primary/30 flex items-center justify-center border-4 border-white dark:border-slate-900 ${isActive ? 'bg-secondary' : 'bg-primary'} text-white`
                                }
                            >
                                <span className="material-symbols-outlined text-[32px] pt-1">shield_person</span>
                            </NavLink>
                        </div>
                    </div>

                    {/* 4. 커뮤니티 */}
                    <div className="w-1/5 flex justify-center">
                        <NavLink
                            to={NAV_ITEMS[2].path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                            }
                        >
                            <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[2].icon}</span>
                            <span className="text-[10px] font-medium">{NAV_ITEMS[2].label}</span>
                        </NavLink>
                    </div>
                    {/* 5. 마이 */}
                    <div className="w-1/5 flex justify-center">
                        <NavLink
                            to={NAV_ITEMS[3].path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                            }
                        >
                            <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[3].icon}</span>
                            <span className="text-[10px] font-medium">{NAV_ITEMS[3].label}</span>
                        </NavLink>
                    </div>
                </nav>
            )}
        </div>
    )
}

export default App
