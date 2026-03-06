import { useState } from 'react'

// 설정(마이) 페이지 — Stitch 디자인 기반
function Settings() {
    const [darkMode, setDarkMode] = useState(false)
    const [pushAlert, setPushAlert] = useState(true)

    return (
        <div className="flex-1 px-4 pb-24 overflow-y-auto pt-2">
            {/* 프로필 카드 */}
            <section className="mb-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">person</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold">김안전</h3>
                        <p className="text-xs text-slate-400">anzen@email.com</p>
                    </div>
                    <button className="text-primary text-sm font-bold flex items-center gap-1">
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
                            onClick={() => setDarkMode(!darkMode)}
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
                    <button className="text-primary text-sm font-bold">추가</button>
                </div>
                <div className="space-y-4">
                    {[
                        { icon: 'home', name: '우리 집', address: '서울 강남구 역삼동 123-4', color: 'primary' },
                        { icon: 'work', name: '회사', address: '서울 강남구 테헤란로 152', color: 'blue-600' },
                        { icon: 'school', name: '행복 어린이집', address: '서울 강남구 역삼동 456-7', color: 'emerald-500' },
                    ].map((place, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
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
                        { icon: 'description', label: '이용약관' },
                        { icon: 'lock', label: '개인정보처리방침' },
                        { icon: 'support_agent', label: '고객센터' },
                        { icon: 'info', label: '앱 버전', value: 'v1.0.0' },
                    ].map((item, i) => (
                        <button key={i} className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0">
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
            <button className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                로그아웃
            </button>
        </div>
    )
}

export default Settings
