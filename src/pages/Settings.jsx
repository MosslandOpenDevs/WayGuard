import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

// 설정(마이) 페이지 — Stitch 디자인 기반
function Settings() {
    const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))
    const [pushAlert, setPushAlert] = useState(true)
    const [userProfile, setUserProfile] = useState({ nickname: '로딩 중...', email: '' })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                // 이메일 설정
                setUserProfile(prev => ({ ...prev, email: session.user.email }))
                // 닉네임 설정
                const { data } = await supabase
                    .from('profiles')
                    .select('nickname')
                    .eq('id', session.user.id)
                    .single()

                if (data) {
                    setUserProfile(prev => ({ ...prev, nickname: data.nickname }))
                }
            }
        }
        fetchUser()
    }, [])

    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }

    const handleLogout = async () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            await supabase.auth.signOut()
            navigate('/login')
        }
    }

    return (
        <div className="flex-1 px-4 pb-24 overflow-y-auto pt-2">
            {/* 프로필 카드 */}
            <section className="mb-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">person</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold">{userProfile.nickname}</h3>
                        <p className="text-xs text-slate-400">{userProfile.email}</p>
                    </div>
                    <button onClick={() => alert('프로필 편집 기능은 준비 중입니다.')} className="text-primary text-sm font-bold flex items-center gap-1 hover:bg-primary/5 px-2 py-1 rounded transition-colors">
                        수정 <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </section>

            {/* 알림 설정 */}
            <section className="mb-6">
                <h3 className="text-lg font-bold mb-3 px-1">알림 설정</h3>
                <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">notifications_active</span>
                            <div>
                                <p className="text-sm font-bold">푸시 알림</p>
                                <p className="text-[11px] text-slate-400">위험 구역 진입 시 알림</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setPushAlert(!pushAlert)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${pushAlert ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform shadow ${pushAlert ? 'translate-x-5' : ''}`}></div>
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">dark_mode</span>
                            <div>
                                <p className="text-sm font-bold">다크 모드</p>
                                <p className="text-[11px] text-slate-400">야간에 눈이 편한 화면</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform shadow ${darkMode ? 'translate-x-5' : ''}`}></div>
                        </button>
                    </div>
                </div>
            </section>

            {/* 자주 가는 장소 */}
            <section className="mb-6">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-lg font-bold">자주 가는 장소</h3>
                    <button onClick={() => alert('새로운 장소 등록 기능은 준비 중입니다.')} className="text-primary text-sm font-bold hover:bg-primary/5 px-2 py-1 rounded transition-colors">추가</button>
                </div>
                <div className="space-y-4">
                    {[
                        { icon: 'home', name: '우리 집', address: '서울 강남구 역삼동 123-4', color: 'primary' },
                        { icon: 'work', name: '회사', address: '서울 강남구 테헤란로 152', color: 'blue-600' },
                        { icon: 'school', name: '행복 어린이집', address: '서울 강남구 역삼동 456-7', color: 'emerald-500' },
                    ].map((place, i) => (
                        <div key={i} onClick={() => alert(`${place.name} 상세 정보 (준비 중)`)} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors">
                            <div className={`w-10 h-10 rounded-full bg-${place.color}/10 flex items-center justify-center`}>
                                <span className={`material-symbols-outlined text-${place.color}`}>{place.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">{place.name}</p>
                                <p className="text-[11px] text-slate-400">{place.address}</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 기타 메뉴 */}
            <section className="mb-6">
                <h3 className="text-lg font-bold mb-3 px-1">기타</h3>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                    {[
                        { icon: 'description', label: '이용약관', alert: '이용약관 페이지는 준비 중입니다.' },
                        { icon: 'lock', label: '개인정보처리방침', alert: '개인정보처리방침 페이지는 준비 중입니다.' },
                        { icon: 'support_agent', label: '고객센터', alert: '고객센터 연결: 1588-0000 (평일 09:00~18:00)' },
                        { icon: 'info', label: '앱 버전', value: 'v1.0.0', alert: '최신 버전 안내: 가장 최신 버전인 v1.0.0 을 사용 중입니다.' },
                    ].map((item, i) => (
                        <button key={i} onClick={() => alert(item.alert)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                            <span className="material-symbols-outlined text-slate-400 text-xl">{item.icon}</span>
                            <span className="flex-1 text-sm font-medium">{item.label}</span>
                            {item.value
                                ? <span className="text-xs text-slate-400">{item.value}</span>
                                : <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                            }
                        </button>
                    ))}
                </div>
            </section>

            {/* 로그아웃 */}
            <button onClick={handleLogout} className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                로그아웃
            </button>
        </div>
    )
}

export default Settings
