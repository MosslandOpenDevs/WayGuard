import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { PAGE_TITLES } from './constants/app'
import { ToastProvider } from './components/feedback/ToastProvider'
import BottomNav from './components/layout/BottomNav'
import Header from './components/layout/Header'
import ProtectedRoute from './components/layout/ProtectedRoute'
import ChildSafety from './pages/ChildSafety'
import Community from './pages/Community'
import Home from './pages/Home'
import Login from './pages/Login'
import Report from './pages/Report'
import SafeReturn from './pages/SafeReturn'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import { supabase } from './utils/supabaseClient'

function App() {
    const location = useLocation()
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    const isHome = location.pathname === '/'
    const isCommunity = location.pathname === '/community'
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
    const title = PAGE_TITLES[location.pathname] || '안전 지킴이'

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-primary dark:bg-slate-900">
                로딩 중...
            </div>
        )
    }

    return (
        <ToastProvider>
            <div className="relative mx-auto flex min-h-screen max-w-[430px] flex-col overflow-hidden bg-white shadow-2xl dark:bg-slate-900">
                {!isCommunity && !isAuthPage && <Header title={title} isHome={isHome} session={session} />}

                <main className="relative flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/child-safety" element={<ChildSafety />} />
                        <Route path="/report" element={<ProtectedRoute session={session}><Report /></ProtectedRoute>} />
                        <Route path="/safe-return" element={<ProtectedRoute session={session}><SafeReturn /></ProtectedRoute>} />
                        <Route path="/community" element={<ProtectedRoute session={session}><Community /></ProtectedRoute>} />
                        <Route path="/settings" element={<ProtectedRoute session={session}><Settings /></ProtectedRoute>} />
                    </Routes>
                </main>

                {!isAuthPage && <BottomNav />}
            </div>
        </ToastProvider>
    )
}

export default App
