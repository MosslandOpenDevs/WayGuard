import { useMemo, useState } from 'react'
import BottomSheet from '../components/feedback/BottomSheet'
import { useToast } from '../components/feedback/ToastProvider'

const SAFETY_SPOTS = [
    {
        id: 'store',
        title: '행복편의점',
        type: '아동안전지킴이집',
        address: '서울 강남구 역삼로 123',
        distance: '150m',
        icon: 'storefront',
        theme: 'teal',
        summary: '귀가 동선에서 가장 가까운 보호 거점입니다.',
        notes: ['야간 24시간 운영', '긴급 연락 대기 가능', '아이 단독 방문 가능'],
    },
    {
        id: 'police',
        title: '역삼 지구대',
        type: '관할 경찰 지원',
        address: '서울 강남구 테헤란로 45',
        distance: '420m',
        icon: 'local_police',
        theme: 'blue',
        summary: '야간 순찰 밀도가 높은 관할 지구대입니다.',
        notes: ['심야 순찰 동선 포함', '긴급 신고 연계 가능', '보호자 연락 지원'],
    },
]

function ChildSafety() {
    const [checked, setChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [alertOn, setAlertOn] = useState(true)
    const [activeSpot, setActiveSpot] = useState(null)
    const { showToast } = useToast()

    const handleCheckRoute = () => {
        setIsLoading(true)
        setChecked(false)
        window.setTimeout(() => {
            setIsLoading(false)
            setChecked(true)
        }, 1800)
    }

    const routeStats = useMemo(
        () => [
            { label: 'CCTV', value: '12개', icon: 'videocam', tone: 'blue' },
            { label: '안전 거점', value: '3곳', icon: 'shield', tone: 'green' },
            { label: '비상벨', value: '2개', icon: 'campaign', tone: 'orange' },
            { label: '주의 구간', value: '1곳', icon: 'warning', tone: 'red' },
        ],
        [],
    )

    return (
        <>
            <div className="h-full space-y-6 overflow-y-auto px-4 pb-8 pt-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-5 text-white shadow-lg">
                    <div className="relative z-10">
                        <h2 className="mb-1 text-xl font-bold">아이 귀가 경로 확인</h2>
                        <p className="text-sm opacity-90">위험 요소를 먼저 살펴보고, 보호 거점과 함께 안전한 길을 고르세요.</p>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-4 -right-2 rotate-12 text-[80px] opacity-20" style={{ fontVariationSettings: "'FILL' 1" }}>
                        child_care
                    </span>
                </div>

                <section className="relative z-10 -mt-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-teal-500">route</span>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">경로 안전 확인</h2>
                    </div>

                    <div className="relative space-y-3 pl-2">
                        <div className="absolute bottom-16 left-6 top-6 z-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

                        <div className="relative z-10 flex items-center gap-4 bg-white dark:bg-slate-900">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800">
                                <span className="size-2.5 rounded-full bg-slate-400" />
                            </div>
                            <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-700/50 dark:bg-slate-800/50">
                                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">출발지</p>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">다솔 어린이집</p>
                            </div>
                        </div>

                        <div className="relative z-10 mt-2 flex items-center gap-4 bg-white dark:bg-slate-900">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-200 bg-teal-50">
                                <span className="material-symbols-outlined text-sm text-teal-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    location_on
                                </span>
                            </div>
                            <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-700/50 dark:bg-slate-800/50">
                                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">도착지</p>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">우리 집</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleCheckRoute}
                            disabled={isLoading}
                            className={`mt-4 w-full rounded-xl py-4 font-bold shadow-lg transition-all duration-300 ${
                                isLoading
                                    ? 'cursor-not-allowed bg-slate-100 text-slate-400 shadow-none dark:bg-slate-800'
                                    : 'bg-teal-500 text-white shadow-teal-500/30 hover:bg-teal-600 active:scale-95'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined animate-spin">refresh</span>
                                    안전 데이터 수집 중...
                                </div>
                            ) : '안전 경로 분석하기'}
                        </button>
                    </div>
                </section>

                {isLoading ? (
                    <section className="animate-slide-up">
                        <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800">
                            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                            <div className="absolute inset-0 h-[30%] animate-[scan_2s_ease-in-out_infinite_alternate] bg-gradient-to-b from-transparent via-teal-400/30 to-teal-500/50" style={{ borderBottom: '2px solid #14b8a6' }} />
                            <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                            <div className="absolute right-1/3 top-1/2 h-2 w-2 rounded-full bg-amber-500 animate-ping" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-teal-500 animate-ping" style={{ animationDelay: '1s' }} />
                            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                                <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-teal-600 shadow-lg animate-pulse dark:bg-slate-900/90 dark:text-teal-400">
                                    CCTV, 보호 거점, 위험 요소를 탐색 중입니다
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null}

                {checked ? (
                    <section className="space-y-4 animate-[slide-up_0.5s_ease-out]">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">종합 분석 결과</h3>
                            <span className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400">
                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                안전 경로 확인
                            </span>
                        </div>

                        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                            <div className="absolute inset-0 flex items-center justify-center px-10">
                                <div className="relative h-1 w-full rounded-full bg-teal-400/30">
                                    <div className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-slate-400" />
                                    <div className="absolute right-0 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-teal-500 shadow-md">
                                        <span className="material-symbols-outlined text-[10px] text-white">home</span>
                                    </div>
                                    <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
                                        <path d="M 0 0 Q 50 -20 100 0 T 200 0" stroke="#14b8a6" strokeWidth="3" fill="none" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {routeStats.map((stat) => (
                                <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
                                    <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-slate-50 text-slate-700 dark:bg-slate-700/60 dark:text-white">
                                        <span className="material-symbols-outlined text-[18px]">{stat.icon}</span>
                                    </div>
                                    <p className="mb-0.5 text-[10px] font-bold text-slate-500">{stat.label}</p>
                                    <p className="text-xl font-black text-slate-800 dark:text-slate-100">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}

                <section className="space-y-4">
                    <h3 className="px-1 text-lg font-bold text-slate-900 dark:text-white">주변 보호 거점</h3>
                    <div className="space-y-3">
                        {SAFETY_SPOTS.map((spot) => (
                            <button
                                key={spot.id}
                                type="button"
                                onClick={() => setActiveSpot(spot)}
                                className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-colors hover:border-teal-200 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${spot.theme === 'teal' ? 'border-teal-100 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20' : 'border-blue-100 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'}`}>
                                    <span
                                        className={`material-symbols-outlined text-[20px] ${spot.theme === 'teal' ? 'text-teal-600 dark:text-teal-400' : 'text-blue-600 dark:text-blue-400'}`}
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        {spot.icon}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{spot.title}</h4>
                                    <p className="mt-1 text-xs text-slate-500">{spot.address}</p>
                                </div>
                                <div className={`rounded px-2 py-1 text-[11px] font-bold ${spot.theme === 'teal' ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                    {spot.distance}
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="relative mb-8 overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-xl">
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
                    <div className="relative z-10 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    warning
                                </span>
                            </div>
                            <h3 className="text-base font-bold">위험 구역 자동 알림</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setAlertOn((prev) => !prev)
                                showToast({
                                    title: alertOn ? '자동 알림을 껐습니다.' : '자동 알림을 켰습니다.',
                                })
                            }}
                            className={`relative h-6 w-12 rounded-full transition-colors ${alertOn ? 'bg-teal-500' : 'bg-slate-700'}`}
                        >
                            <div className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-transform ${alertOn ? 'translate-x-6' : ''}`} />
                        </button>
                    </div>
                    <p className="relative z-10 -mt-1 pl-1 text-xs leading-relaxed text-slate-300">
                        아이가 지정한 경로를 벗어나거나 주의 구간에 진입하면 보호자에게 즉시 알림을 보냅니다.
                    </p>
                </section>
            </div>

            <BottomSheet
                open={Boolean(activeSpot)}
                onClose={() => setActiveSpot(null)}
                title={activeSpot?.title}
                description={activeSpot ? `${activeSpot.type} · ${activeSpot.address}` : ''}
                footer={
                    activeSpot ? (
                        <div className="flex gap-3">
                            <a
                                href={activeSpot.id === 'police' ? 'tel:112' : 'tel:010-1234-5678'}
                                className="flex-1 rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                            >
                                전화 연결
                            </a>
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard?.writeText(activeSpot.address)
                                    showToast({ tone: 'success', title: '주소를 복사했습니다.' })
                                }}
                                className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white"
                            >
                                주소 복사
                            </button>
                        </div>
                    ) : null
                }
            >
                {activeSpot ? (
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activeSpot.summary}</p>
                        </div>
                        <div className="space-y-2">
                            {activeSpot.notes.map((note) => (
                                <div key={note} className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                                    {note}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </BottomSheet>
        </>
    )
}

export default ChildSafety
