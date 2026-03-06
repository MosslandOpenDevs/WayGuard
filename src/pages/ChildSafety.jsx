import { useState } from 'react'

// 아이 안전 페이지 — Stitch 디자인 기반
function ChildSafety() {
    const [checked, setChecked] = useState(false)
    const [alertOn, setAlertOn] = useState(true)

    return (
        <div className="flex-1 px-6 pb-32 overflow-y-auto space-y-6 pt-4">
            {/* 경로 안전 확인 카드 */}
            <section className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">route</span>
                    <h2 className="text-lg font-bold">경로 안전 확인</h2>
                </div>
                <div className="space-y-3">
                    {/* 출발지 */}
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="material-symbols-outlined text-slate-400 text-sm">radio_button_checked</span>
                        <div className="flex-1">
                            <p className="text-xs text-slate-400 font-medium">출발지</p>
                            <p className="text-sm font-semibold">행복 어린이집</p>
                        </div>
                    </div>
                    {/* 도착지 */}
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                        <div className="flex-1">
                            <p className="text-xs text-slate-400 font-medium">도착지</p>
                            <p className="text-sm font-semibold">우리집</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setChecked(true)}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg font-bold transition-colors mt-2"
                    >
                        안전 경로 확인하기
                    </button>
                </div>
            </section>

            {/* 분석 결과 — 체크 시 표시 */}
            {checked && (
                <section className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">분석 결과</h3>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20">상대적 안전</span>
                    </div>
                    {/* 미니 지도 */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="material-symbols-outlined text-primary scale-150" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                        </div>
                    </div>
                    {/* 안전 통계 4열 */}
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center border border-blue-100 dark:border-blue-800">
                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mb-1">CCTV</p>
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">12</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center border border-green-100 dark:border-green-800">
                            <p className="text-[10px] text-green-600 dark:text-green-400 font-bold mb-1">안전주택</p>
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">3</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center border border-orange-100 dark:border-orange-800">
                            <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold mb-1">비상벨</p>
                            <p className="text-lg font-bold text-orange-800 dark:text-orange-200">2</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center border border-red-100 dark:border-red-800">
                            <p className="text-[10px] text-red-600 dark:text-red-400 font-bold mb-1">주의구역</p>
                            <p className="text-lg font-bold text-red-800 dark:text-red-200">1</p>
                        </div>
                    </div>
                </section>
            )}

            {/* 주변 안전 시설 */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold">주변 안전 시설</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">shield</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold">방범 안전지킴이집</h4>
                            <p className="text-xs text-slate-500">서울 강남구 역삼로 123</p>
                        </div>
                        <p className="text-sm font-bold text-primary">150m</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-600">local_police</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold">역삼 지구대</h4>
                            <p className="text-xs text-slate-500">서울 강남구 테헤란로 45</p>
                        </div>
                        <p className="text-sm font-bold text-primary">420m</p>
                    </div>
                </div>
            </section>

            {/* 실시간 위험 알림 — 다크 카드 */}
            <section className="bg-slate-900 dark:bg-primary p-4 rounded-xl text-white shadow-sm mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                        <h3 className="font-bold">실시간 위험 알림</h3>
                    </div>
                    {/* 토글 스위치 */}
                    <button
                        onClick={() => setAlertOn(!alertOn)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${alertOn ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform ${alertOn ? 'translate-x-5' : ''}`}></div>
                    </button>
                </div>
                <p className="text-sm text-slate-300 dark:text-slate-100 leading-relaxed">
                    아이가 주의 구역에 진입할 경우 보호자(<span className="font-bold text-white underline">엄마</span>)에게 즉시 푸시 알림을 전송합니다.
                </p>
            </section>
        </div>
    )
}

export default ChildSafety
