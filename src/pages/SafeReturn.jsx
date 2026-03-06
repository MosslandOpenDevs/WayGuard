import { useState } from 'react'

// 안심 귀가 페이지 — Stitch 디자인 기반
function SafeReturn() {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className="flex-1 overflow-y-auto pb-24">
            {/* 히어로 영역 — 큰 원형 시작 버튼 */}
            <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
                <div className="relative mb-6">
                    {/* 펄스 배경 효과 */}
                    <div className={`absolute inset-0 rounded-full scale-125 blur-xl ${isActive ? 'bg-emerald-500/10' : 'bg-primary/10'}`}></div>
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`relative flex h-48 w-48 flex-col items-center justify-center rounded-full text-white shadow-xl active:scale-95 transition-all ${isActive
                            ? 'bg-emerald-500 shadow-emerald-500/30 animate-pulse'
                            : 'bg-primary shadow-primary/30'
                            }`}
                    >
                        <span className="material-symbols-outlined text-6xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {isActive ? 'shield_with_heart' : 'shield_with_heart'}
                        </span>
                        <span className="text-xl font-bold tracking-tight">{isActive ? '귀가 중...' : '귀가 시작'}</span>
                    </button>
                </div>
                <h2 className="text-2xl font-bold mb-2">안심 귀가 모드</h2>
                <p className="text-slate-500 dark:text-slate-400">
                    {isActive ? '지인에게 위치가 공유되고 있습니다' : '버튼을 눌러 안전한 귀가를 시작하세요'}
                </p>
            </div>

            {/* 목적지 카드 */}
            <div className="px-4 mb-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex items-center gap-4 border border-slate-100 dark:border-slate-800">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <span className="material-symbols-outlined">home</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 mb-0.5">목적지</p>
                        <p className="text-sm font-bold">우리 집 (서울 강남구 역삼동)</p>
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline">변경</button>
                </div>
            </div>

            {/* 비상 연락처 */}
            <div className="px-4 mb-6">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="font-bold text-lg">비상 연락처</h3>
                    <button className="text-slate-400 text-sm font-medium">편집</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {/* 연락처: 엄마 */}
                    <div className="flex flex-col items-center min-w-[70px]">
                        <div className="size-14 rounded-full bg-slate-200 dark:bg-slate-700 mb-2 overflow-hidden border-2 border-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-500 text-2xl">person</span>
                        </div>
                        <span className="text-xs font-medium">엄마</span>
                    </div>
                    {/* 연락처: 친구 */}
                    <div className="flex flex-col items-center min-w-[70px]">
                        <div className="size-14 rounded-full bg-slate-200 dark:bg-slate-700 mb-2 overflow-hidden border-2 border-transparent flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-500 text-2xl">person</span>
                        </div>
                        <span className="text-xs font-medium">친구 민지</span>
                    </div>
                    {/* 지인 추가 버튼 */}
                    <button className="flex flex-col items-center min-w-[70px]">
                        <div className="size-14 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center mb-2 text-slate-400">
                            <span className="material-symbols-outlined">add</span>
                        </div>
                        <span className="text-xs font-medium text-slate-400">지인 추가</span>
                    </button>
                </div>
            </div>

            {/* 안전 기능 3개 */}
            <div className="px-4 mb-8">
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <span className="material-symbols-outlined text-primary">share_location</span>
                        <span className="text-[10px] leading-tight font-medium">실시간<br />위치 공유</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <span className="material-symbols-outlined text-primary">notifications_active</span>
                        <span className="text-[10px] leading-tight font-medium">미도착 시<br />자동 알림</span>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-red-100 dark:border-red-900/50 shadow-sm">
                        <span className="material-symbols-outlined text-red-500">emergency</span>
                        <span className="text-[10px] leading-tight font-bold text-red-600 dark:text-red-400">긴급 SOS<br />버튼</span>
                    </div>
                </div>
            </div>

            {/* 최근 활동 */}
            <div className="px-4">
                <h3 className="font-bold text-lg mb-3 px-1">최근 활동</h3>
                <div className="space-y-3">
                    {[
                        { date: '2026.03.05 오후 10:30', dest: '우리 집' },
                        { date: '2026.03.03 오후 09:15', dest: '우리 집' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">안전 도착</p>
                                    <p className="text-[11px] text-slate-400">{item.date}</p>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-500">{item.dest}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SafeReturn
