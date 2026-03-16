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
    const title = PAGE_TITLES[location.pathname] || '\uC548\uC804 \uC9C0\uD0B4\uC774'

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
                {'\uB85C\uB529 \uC911...'}
            </div>
        )
    }

    return (
        <ToastProvider>
            <div className="relative mx-auto flex h-[100dvh] max-h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-white shadow-2xl dark:bg-slate-900">
                {!isCommunity && !isAuthPage && <Header title={title} isHome={isHome} session={session} />}

                <main className="relative min-h-0 flex-1 overflow-hidden">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/child-safety" element={<ChildSafety />} />
                        <Route
                            path="/report"
                            element={
                                <ProtectedRoute session={session}>
                                    <Report />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/safe-return"
                            element={
                                <ProtectedRoute session={session}>
                                    <SafeReturn />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/community"
                            element={
                                <ProtectedRoute session={session}>
                                    <Community />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute session={session}>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>

                {!isAuthPage && <BottomNav />}
            </div>
        </ToastProvider>
    )
}

export default App
