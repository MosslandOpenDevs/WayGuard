import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/feedback/ToastProvider'
import { supabase } from '../utils/supabaseClient'

function Settings() {
    const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))
    const [pushAlert, setPushAlert] = useState(true)
    const [userProfile, setUserProfile] = useState({ nickname: '로딩 중...', email: '' })
    const navigate = useNavigate()
    const { showToast } = useToast()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                return
            }

            setUserProfile((prev) => ({ ...prev, email: session.user.email || '' }))

            const { data } = await supabase
                .from('profiles')
                .select('nickname')
                .eq('id', session.user.id)
                .single()

            if (data?.nickname) {
                setUserProfile((prev) => ({ ...prev, nickname: data.nickname }))
            }
        }

        fetchUser()
    }, [])

    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.contains('dark')
        document.documentElement.classList.toggle('dark', !isDark)
        setDarkMode(!isDark)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    const savedPlaces = [
        { icon: 'home', name: '우리 집', address: '서울 강남구 역삼동 123-4', iconClassName: 'text-primary', bgClassName: 'bg-primary/10' },
        { icon: 'work', name: '회사', address: '서울 강남구 테헤란로 152', iconClassName: 'text-blue-600', bgClassName: 'bg-blue-600/10' },
        { icon: 'school', name: '하늘 어린이집', address: '서울 강남구 역삼동 456-7', iconClassName: 'text-emerald-500', bgClassName: 'bg-emerald-500/10' },
    ]

    const menuItems = [
        { icon: 'description', label: '이용약관', message: '이용약관 페이지는 준비 중입니다.' },
        { icon: 'lock', label: '개인정보처리방침', message: '개인정보처리방침 페이지는 준비 중입니다.' },
        { icon: 'support_agent', label: '고객센터', message: '고객센터 연결: 1588-0000 (평일 09:00~18:00)' },
        { icon: 'info', label: '앱 버전', value: 'v1.0.0', message: '현재 최신 버전 v1.0.0을 사용 중입니다.' },
    ]

    return (
        <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2">
            <section className="mb-6">
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <span className="material-symbols-outlined text-3xl text-primary">person</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold">{userProfile.nickname}</h3>
                        <p className="text-xs text-slate-400">{userProfile.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => showToast({ title: '프로필 편집 기능은 준비 중입니다.' })}
                        className="flex items-center gap-1 rounded px-2 py-1 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                    >
                        수정 <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </section>

            <section className="mb-6">
                <h3 className="mb-3 px-1 text-lg font-bold">알림 설정</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">notifications_active</span>
                            <div>
                                <p className="text-sm font-bold">푸시 알림</p>
                                <p className="text-[11px] text-slate-400">위험 구역 진입 시 알림</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setPushAlert((prev) => !prev)}
                            className={`relative h-6 w-11 rounded-full transition-colors ${pushAlert ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow transition-transform ${pushAlert ? 'translate-x-5' : ''}`}></div>
                        </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">dark_mode</span>
                            <div>
                                <p className="text-sm font-bold">다크 모드</p>
                                <p className="text-[11px] text-slate-400">눈부심을 줄인 화면</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            className={`relative h-6 w-11 rounded-full transition-colors ${darkMode ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-5' : ''}`}></div>
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-6">
                <div className="mb-3 flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold">자주 가는 장소</h3>
                    <button
                        type="button"
                        onClick={() => showToast({ title: '새 장소 등록 기능은 준비 중입니다.' })}
                        className="rounded px-2 py-1 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                    >
                        추가
                    </button>
                </div>
                <div className="space-y-4">
                    {savedPlaces.map((place) => (
                        <button
                            key={place.name}
                            type="button"
                            onClick={() => showToast({ title: `${place.name} 상세 정보는 준비 중입니다.` })}
                            className="flex w-full items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-colors hover:border-primary/30 dark:border-slate-700 dark:bg-slate-800"
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${place.bgClassName}`}>
                                <span className={`material-symbols-outlined ${place.iconClassName}`}>{place.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">{place.name}</p>
                                <p className="text-[11px] text-slate-400">{place.address}</p>
                            </div>
                            <span className="material-symbols-outlined text-sm text-slate-300">chevron_right</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-6">
                <h3 className="mb-3 px-1 text-lg font-bold">기타</h3>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => showToast({ title: item.message })}
                            className="flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                        >
                            <span className="material-symbols-outlined text-xl text-slate-400">{item.icon}</span>
                            <span className="flex-1 text-sm font-medium">{item.label}</span>
                            {item.value ? (
                                <span className="text-xs text-slate-400">{item.value}</span>
                            ) : (
                                <span className="material-symbols-outlined text-sm text-slate-300">chevron_right</span>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
                로그아웃
            </button>
        </div>
    )
}

export default Settings
