import { Link } from 'react-router-dom'

const alerts = [
    {
        title: '골목 조도 저하',
        subtitle: '역삼역 4번 출구 뒤편',
        level: '주의',
        tone: 'from-amber-400 to-orange-500',
        icon: 'lightbulb',
    },
    {
        title: '귀가 동행 요청 증가',
        subtitle: '강남대로 남측 블록',
        level: '확인',
        tone: 'from-sky-400 to-blue-600',
        icon: 'group',
    },
]

const actions = [
    { label: '순찰 시작', icon: 'shield', style: 'bg-[#0f172a] text-white' },
    { label: '경로 브리핑', icon: 'route', style: 'bg-white/80 text-slate-900' },
    { label: '긴급 방송', icon: 'campaign', style: 'bg-[#ffe8e5] text-[#d9485f]' },
]

const crew = [
    { name: '이하늘', role: '학원가 안전 동행', eta: '4분 후 합류', accent: 'bg-emerald-500' },
    { name: '박도윤', role: '공원 출구 순찰', eta: '현장 도착', accent: 'bg-blue-500' },
    { name: '정유진', role: '주민 제보 확인', eta: '8분 후 도착', accent: 'bg-rose-500' },
]

function PatrolStudio() {
    return (
        <div className="relative h-full overflow-y-auto bg-[#f7f4ed] text-slate-900">
            <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.28),_transparent_42%),linear-gradient(135deg,_#132238_0%,_#214a7a_46%,_#f7f4ed_100%)]" />
            <div className="absolute right-[-40px] top-20 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute left-[-30px] top-40 h-28 w-28 rounded-full bg-amber-200/30 blur-2xl" />

            <div className="relative z-10 flex flex-col gap-5 px-5 pb-28 pt-6">
                <section className="overflow-hidden rounded-[28px] bg-[#10233d] p-5 text-white shadow-[0_24px_80px_rgba(16,35,61,0.24)]">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.34em] text-sky-200/80">Night Patrol Studio</p>
                            <h1 className="mt-3 text-[28px] font-black leading-8">야간 안심 브리핑</h1>
                            <p className="mt-2 text-sm text-slate-200/80">동네 신호를 한 화면에 묶어 빠르게 판단하는 실험 UI</p>
                        </div>
                        <Link
                            to="/"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-2xl bg-white/8 p-3 backdrop-blur">
                            <p className="text-[11px] text-slate-300">활성 제보</p>
                            <p className="mt-2 text-2xl font-black">12</p>
                        </div>
                        <div className="rounded-2xl bg-white/8 p-3 backdrop-blur">
                            <p className="text-[11px] text-slate-300">순찰 대기</p>
                            <p className="mt-2 text-2xl font-black">04</p>
                        </div>
                        <div className="rounded-2xl bg-[#7dd3fc]/15 p-3 backdrop-blur">
                            <p className="text-[11px] text-sky-100">안심 지수</p>
                            <p className="mt-2 text-2xl font-black text-[#9be7ff]">88%</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-[26px] border border-white/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Quick Actions</p>
                            <h2 className="mt-2 text-xl font-black">지금 바로 실행</h2>
                        </div>
                        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">LIVE</div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                        {actions.map((action) => (
                            <button
                                key={action.label}
                                type="button"
                                className={`flex min-h-24 flex-col items-start justify-between rounded-[22px] p-3 text-left shadow-sm transition-transform active:scale-[0.98] ${action.style}`}
                            >
                                <span className="material-symbols-outlined text-[26px]">{action.icon}</span>
                                <span className="text-sm font-bold leading-4">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="flex items-end justify-between px-1">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Signal Board</p>
                            <h2 className="mt-2 text-xl font-black">실시간 위험 핫스팟</h2>
                        </div>
                        <span className="text-xs font-semibold text-slate-500">최근 20분 기준</span>
                    </div>

                    {alerts.map((alert) => (
                        <article
                            key={alert.title}
                            className="overflow-hidden rounded-[26px] border border-slate-200/70 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                        >
                            <div className={`h-2 bg-gradient-to-r ${alert.tone}`} />
                            <div className="flex gap-4 p-4">
                                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${alert.tone} text-white`}>
                                    <span className="material-symbols-outlined text-[28px]">{alert.icon}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-base font-black text-slate-900">{alert.title}</h3>
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{alert.level}</span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">{alert.subtitle}</p>
                                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
                                        <span className="material-symbols-outlined text-base text-emerald-600">radar</span>
                                        주민 신고, 이동량, 순찰 밀도 신호를 함께 반영했습니다.
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="rounded-[30px] bg-[#1d1226] p-5 text-white shadow-[0_24px_80px_rgba(29,18,38,0.28)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-200/70">Crew Queue</p>
                            <h2 className="mt-2 text-xl font-black">현장 대응 크루</h2>
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-fuchsia-100">3명 온라인</span>
                    </div>

                    <div className="mt-4 space-y-3">
                        {crew.map((member) => (
                            <div key={member.name} className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 p-3">
                                <div className={`h-11 w-11 rounded-2xl ${member.accent}`} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="truncate text-sm font-black">{member.name}</p>
                                        <p className="text-xs font-semibold text-slate-300">{member.eta}</p>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-300">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PatrolStudio
