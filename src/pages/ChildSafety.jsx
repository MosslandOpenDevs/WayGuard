import { useState } from 'react'
import { useToast } from '../components/feedback/ToastProvider'

function ChildSafety() {
    const [checked, setChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [alertOn, setAlertOn] = useState(true)
    const { showToast } = useToast()

    const handleCheckRoute = () => {
        setIsLoading(true)
        setChecked(false)
        setTimeout(() => {
            setIsLoading(false)
            setChecked(true)
        }, 2000)
    }

    return (
        <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-32 pt-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-5 text-white shadow-lg">
                <div className="relative z-10">
                    <h2 className="mb-1 text-xl font-bold">우리 아이 등하원</h2>
                    <p className="text-sm opacity-90">위험 요소를 미리 파악하고 안전 경로를 확인하세요.</p>
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
                    <div className="absolute bottom-16 left-6 top-6 z-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

                    <div className="relative z-10 flex items-center gap-4 bg-white dark:bg-slate-900">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800">
                            <span className="size-2.5 rounded-full bg-slate-400"></span>
                        </div>
                        <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-3 transition-colors hover:border-teal-200 dark:border-slate-700/50 dark:bg-slate-800/50">
                            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">출발지 (어린이집)</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">행복 어린이집</p>
                        </div>
                    </div>

                    <div className="relative z-10 mt-2 flex items-center gap-4 bg-white dark:bg-slate-900">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-200 bg-teal-50">
                            <span className="material-symbols-outlined text-sm text-teal-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                location_on
                            </span>
                        </div>
                        <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-3 transition-colors hover:border-teal-200 dark:border-slate-700/50 dark:bg-slate-800/50">
                            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">도착지 (집)</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">우리 집 (역삼동)</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCheckRoute}
                        disabled={isLoading}
                        className={`mt-4 w-full rounded-xl py-4 font-bold shadow-lg transition-all duration-300 ${isLoading ? 'cursor-not-allowed bg-slate-100 text-slate-400 shadow-none dark:bg-slate-800' : 'bg-teal-500 text-white shadow-teal-500/30 hover:bg-teal-600 active:scale-95'}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                                안전 데이터를 수집하고 분석 중...
                            </div>
                        ) : (
                            '안전 경로 분석하기'
                        )}
                    </button>
                </div>
            </section>

            {isLoading && (
                <section className="animate-slide-up">
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800">
                        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                        <div className="absolute inset-0 h-[30%] animate-[scan_2s_ease-in-out_infinite_alternate] bg-gradient-to-b from-transparent via-teal-400/30 to-teal-500/50" style={{ borderBottom: '2px solid #14b8a6' }}></div>
                        <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-blue-500 animate-ping"></div>
                        <div className="absolute right-1/3 top-1/2 h-2 w-2 rounded-full bg-amber-500 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-teal-500 animate-ping" style={{ animationDelay: '1s' }}></div>

                        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                            <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-teal-600 shadow-lg animate-pulse dark:bg-slate-900/90 dark:text-teal-400">
                                주변 CCTV와 위험 요소를 탐색하고 있습니다
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {checked && (
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
                                <div className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-slate-400"></div>
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
                        <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
                            <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 dark:bg-blue-900/30">
                                <span className="material-symbols-outlined text-[18px]">videocam</span>
                            </div>
                            <p className="mb-0.5 text-[10px] font-bold text-slate-500">CCTV</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">12<span className="ml-0.5 text-xs font-normal text-slate-400">개</span></p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
                            <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-green-50 text-green-500 dark:bg-green-900/30">
                                <span className="material-symbols-outlined text-[18px]">shield</span>
                            </div>
                            <p className="mb-0.5 text-[10px] font-bold text-slate-500">안전주택</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">3<span className="ml-0.5 text-xs font-normal text-slate-400">곳</span></p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
                            <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-orange-50 text-orange-500 dark:bg-orange-900/30">
                                <span className="material-symbols-outlined text-[18px]">campaign</span>
                            </div>
                            <p className="mb-0.5 text-[10px] font-bold text-slate-500">비상벨</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">2<span className="ml-0.5 text-xs font-normal text-slate-400">개</span></p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
                            <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-900/30">
                                <span className="material-symbols-outlined text-[18px]">warning</span>
                            </div>
                            <p className="mb-0.5 text-[10px] font-bold text-slate-500">주의구역</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">1<span className="ml-0.5 text-xs font-normal text-slate-400">곳</span></p>
                        </div>
                    </div>
                </section>
            )}

            <section className="space-y-4">
                <h3 className="px-1 text-lg font-bold text-slate-900 dark:text-white">주변 주요 보호 시설</h3>
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={() => showToast({ title: '보호 시설 상세 정보는 준비 중입니다.' })}
                        className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-colors hover:border-teal-200 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20">
                            <span className="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                                storefront
                            </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">늘푸른 편의점 (아동안전지킴이집)</h4>
                            <p className="mt-1 text-xs text-slate-500">서울 강남구 역삼로 123</p>
                        </div>
                        <div className="rounded bg-teal-50 px-2 py-1 text-[11px] font-bold text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">150m</div>
                    </button>

                    <button
                        type="button"
                        onClick={() => showToast({ title: '관할 경찰서 안내 기능은 준비 중입니다.' })}
                        className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-colors hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                            <span className="material-symbols-outlined text-[20px] text-blue-600 dark:text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                                local_police
                            </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">역삼 지구대</h4>
                            <p className="mt-1 text-xs text-slate-500">서울 강남구 테헤란로 45</p>
                        </div>
                        <div className="rounded bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">420m</div>
                    </button>
                </div>
            </section>

            <section className="relative mb-8 overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-xl">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"></div>
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
                        onClick={() => setAlertOn((prev) => !prev)}
                        className={`relative h-6 w-12 rounded-full transition-colors ${alertOn ? 'bg-teal-500' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-transform ${alertOn ? 'translate-x-6' : ''}`}></div>
                    </button>
                </div>
                <p className="relative z-10 -mt-1 pl-1 text-xs leading-relaxed text-slate-300">
                    아이가 설정한 경로를 이탈하거나 주의 구역에 진입하면 보호자 앱으로 즉시 푸시 알림이 전송됩니다.
                </p>
            </section>
        </div>
    )
}

export default ChildSafety
