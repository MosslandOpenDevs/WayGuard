import { useState } from 'react'

// 아이 안전 페이지 — Stitch 디자인 기반 + 애니메이션 강화
function ChildSafety() {
    const [checked, setChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [alertOn, setAlertOn] = useState(true)

    const handleCheckRoute = () => {
        setIsLoading(true);
        setChecked(false);
        setTimeout(() => {
            setIsLoading(false);
            setChecked(true);
        }, 2000); // 2초 후 분석 완료 (로딩 애니메이션 체감 위해 시간 증가)
    }

    return (
        <div className="flex-1 px-4 pb-32 overflow-y-auto space-y-6 pt-4">

            {/* 상단 히어로 배너 */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-1">우리아이 안심등박</h2>
                    <p className="text-sm opacity-90">등하원길 위험 요소를 미리 파악하세요</p>
                </div>
                <span className="material-symbols-outlined text-[80px] absolute -bottom-4 -right-2 opacity-20 rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
            </div>

            {/* 경로 안전 확인 카드 */}
            <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative z-10 -mt-2">
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-teal-500">route</span>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">경로 안전 확인</h2>
                </div>

                <div className="relative space-y-3 pl-2">
                    {/* 출발지 도착지 연결 선 */}
                    <div className="absolute left-6 top-6 bottom-16 w-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>

                    {/* 출발지 */}
                    <div className="flex items-center gap-4 relative z-10 bg-white dark:bg-slate-900">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-300 dark:border-slate-600">
                            <span className="size-2.5 rounded-full bg-slate-400"></span>
                        </div>
                        <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-colors hover:border-teal-200">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">출발지 (어린이집)</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">행복 어린이집</p>
                        </div>
                    </div>

                    {/* 도착지 */}
                    <div className="flex items-center gap-4 relative z-10 bg-white dark:bg-slate-900 mt-2">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center border-2 border-teal-200">
                            <span className="material-symbols-outlined text-teal-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                        </div>
                        <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-colors hover:border-teal-200">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">도착지 (집)</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">우리집 (역삼동)</p>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckRoute}
                        disabled={isLoading}
                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 mt-4 shadow-lg ${isLoading
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 shadow-none cursor-not-allowed'
                            : 'bg-teal-500 hover:bg-teal-600 shadow-teal-500/30 text-white active:scale-95'
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                                안전 데이터 수집 및 분석 중...
                            </div>
                        ) : '안전 경로 분석하기'}
                    </button>
                </div>
            </section>

            {/* 로딩 애니메이션 (지도 스캐닝 효과) */}
            {isLoading && (
                <section className="animate-slide-up">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                        {/* 더미 맵 배경 격자무늬 */}
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.5 }}></div>

                        {/* 스캐닝 바 애니메이션 */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/30 to-teal-500/50 h-[30%] animate-[scan_2s_ease-in-out_infinite_alternate]" style={{ borderBottom: '2px solid #14b8a6' }}></div>

                        {/* 반짝이는 노드들 */}
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                        <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-amber-500 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-teal-500 animate-ping" style={{ animationDelay: '1s' }}></div>

                        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                            <div className="bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-full text-xs font-bold text-teal-600 dark:text-teal-400 shadow-lg animate-pulse">
                                주변 CCTV 및 위험 요소를 스캔하고 있습니다
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 분석 결과 — 체크 시 표시 */}
            {checked && (
                <section className="space-y-4 animate-[slide-up_0.5s_ease-out]">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">종합 분석 결과</h3>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            안전 경로 확인됨
                        </span>
                    </div>

                    {/* 미니 지도 결과창 */}
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
                        {/* 출발지 -> 도착지 안전 선 */}
                        <div className="absolute inset-0 flex items-center justify-center px-10">
                            <div className="w-full h-1 bg-teal-400/30 rounded-full relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-400 border-2 border-white"></div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center z-10 shadow-md">
                                    <span className="material-symbols-outlined text-white text-[10px]">home</span>
                                </div>
                                {/* 맥박이 뛰는 선 애니메이션 (SVG) */}
                                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path d="M 0 0 Q 50 -20 100 0 T 200 0" stroke="#14b8a6" strokeWidth="3" fill="none" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 안전 통계 4열 */}
                    <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="size-8 mx-auto bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-[18px]">videocam</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold mb-0.5">CCTV</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">12<span className="text-xs font-normal text-slate-400 ml-0.5">대</span></p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="size-8 mx-auto bg-green-50 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-[18px]">shield</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold mb-0.5">안전주택</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">3<span className="text-xs font-normal text-slate-400 ml-0.5">곳</span></p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="size-8 mx-auto bg-orange-50 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-[18px]">campaign</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold mb-0.5">비상벨</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">2<span className="text-xs font-normal text-slate-400 ml-0.5">개</span></p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="size-8 mx-auto bg-red-50 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-[18px]">warning</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold mb-0.5">주의구역</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">1<span className="text-xs font-normal text-slate-400 ml-0.5">곳</span></p>
                        </div>
                    </div>
                </section>
            )}

            {/* 주변 안전 시설 */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white px-1">주변 주요 보호 시설</h3>
                <div className="space-y-3">
                    <div onClick={() => alert('해당 시설의 상세 정보 및 연락처를 불러옵니다. (준비 중)')} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-teal-200 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex flex-col items-center justify-center border border-teal-100 dark:border-teal-800">
                            <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">씨유 역삼점 (아동안전지킴이집)</h4>
                            <p className="text-xs text-slate-500 mt-1">서울 강남구 역삼로 123</p>
                        </div>
                        <div className="bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded text-[11px] font-bold text-teal-600 dark:text-teal-400">150m</div>
                    </div>

                    <div onClick={() => alert('관할 경찰서/지구대의 안내 및 신고 페이지로 이동합니다. (준비 중)')} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_police</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">역삼 지구대</h4>
                            <p className="text-xs text-slate-500 mt-1">서울 강남구 테헤란로 45</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-[11px] font-bold text-blue-600 dark:text-blue-400">420m</div>
                    </div>
                </div>
            </section>

            {/* 실시간 위험 알림 — 다크 카드 */}
            <section className="bg-slate-900 p-5 rounded-2xl text-white shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                        </div>
                        <h3 className="font-bold text-base">위험 구역 자동 알림</h3>
                    </div>
                    {/* 토글 스위치 */}
                    <button
                        onClick={() => setAlertOn(!alertOn)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${alertOn ? 'bg-teal-500' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform shadow-md ${alertOn ? 'translate-x-6' : ''}`}></div>
                    </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed relative z-10 pl-1 -mt-1">
                    아동이 설정된 경로를 이탈하거나 주의 구역에 진입할 경우 보호자의 앱으로 즉시 푸시 알림을 전송합니다.
                </p>
            </section>

        </div>
    )
}

export default ChildSafety
