import { useState, useEffect } from 'react'

// 안심 귀가 페이지 — Stitch 디자인 기반 및 애니메이션 강화
function SafeReturn() {
    const [isActive, setIsActive] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        } else {
            setElapsedTime(0);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24">
            {/* 히어로 영역 — 애니메이션이 강화된 메인 버튼 */}
            <div className="flex flex-col items-center justify-center pt-12 pb-8 px-6 text-center overflow-hidden">
                <div className="relative mb-8 w-64 h-64 flex items-center justify-center">

                    {/* 활성화 시 퍼지는 파동 효과 (Ripple Effect) */}
                    {isActive && (
                        <>
                            <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                            <div className="absolute inset-4 rounded-full border border-emerald-500/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                            <div className="absolute inset-8 rounded-full border border-emerald-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
                        </>
                    )}

                    {/* 정지 상태 배경 효과 */}
                    {!isActive && (
                        <div className="absolute inset-4 rounded-full bg-primary/5"></div>
                    )}

                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`relative flex h-44 w-44 flex-col items-center justify-center rounded-full text-white shadow-2xl active:scale-95 transition-all duration-500 z-10 ${isActive
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/40'
                            : 'bg-gradient-to-br from-primary to-blue-600 shadow-primary/40'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-6xl mb-2 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            {isActive ? 'shield_with_heart' : 'shield_person'}
                        </span>
                        <span className="text-lg font-bold tracking-tight">
                            {isActive ? (
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium opacity-90 mb-1">귀가 중...</span>
                                    <span className="text-xl font-mono tracking-widest leading-none">{formatTime(elapsedTime)}</span>
                                </div>
                            ) : (
                                '귀가 시작'
                            )}
                        </span>
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-2 transition-colors duration-300">
                    {isActive ? <span className="text-emerald-500 dark:text-emerald-400">안심 귀가 작동 중</span> : '안심 귀가 모드'}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {isActive ? '지정된 연락처로 안전 상태가 실시간 공유됩니다' : '버튼을 눌러 우리 동네 안전 귀가를 시작하세요'}
                </p>
            </div>

            {/* 목적지 카드 */}
            <div className="px-4 mb-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex items-center gap-4 border border-slate-100 dark:border-slate-700/50 hover:border-primary/30 transition-colors">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">최종 목적지</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">우리 집 (서울 강남구 역삼동)</p>
                    </div>
                    <button onClick={() => alert('목적지 변경 기능은 준비 중입니다.')} className="text-primary text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">변경</button>
                </div>
            </div>

            {/* 비상 연락처 */}
            <div className="px-4 mb-8 text-center sm:text-left">
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">보호자 연락망</h3>
                    <button onClick={() => alert('지인 목록 편집 기능은 준비 중입니다.')} className="text-slate-400 text-xs font-bold hover:text-primary transition-colors">편집</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                    {/* 연락처: 엄마 */}
                    <div className="flex flex-col items-center min-w-[72px] group cursor-pointer">
                        <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-2 overflow-hidden border-2 border-primary group-hover:shadow-md transition-all flex items-center justify-center relative">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>face_3</span>
                            <div className="absolute right-1 bottom-1 size-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">엄마</span>
                    </div>
                    {/* 연락처: 친구 */}
                    <div className="flex flex-col items-center min-w-[72px] group cursor-pointer">
                        <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-2 overflow-hidden border-2 border-transparent group-hover:border-slate-300 transition-all flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">친구 민지</span>
                    </div>
                    {/* 지인 추가 버튼 */}
                    <button onClick={() => alert('주소록에서 지인 추가 기능은 준비 중입니다.')} className="flex flex-col items-center min-w-[72px] group">
                        <div className="size-16 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 group-hover:border-primary group-hover:bg-primary/5 transition-all flex items-center justify-center mb-2 text-slate-400 group-hover:text-primary">
                            <span className="material-symbols-outlined text-2xl">add</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">연락처 추가</span>
                    </button>
                </div>
            </div>

            {/* 안전 기능 3개 */}
            <div className="px-4 mb-8">
                <div className="grid grid-cols-3 gap-3">
                    <div onClick={() => alert('실시간 위치 공유 링크가 복사되었습니다!')} className="bg-white dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer hover:border-blue-200 transition-colors">
                        <span className="material-symbols-outlined text-blue-500 text-2xl">share_location</span>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 font-bold leading-tight">실시간<br />위치 공유</span>
                    </div>
                    <div onClick={() => alert('미도착 시 자동 알림 설정 기능은 준비 중입니다.')} className="bg-white dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer hover:border-amber-200 transition-colors">
                        <span className="material-symbols-outlined text-amber-500 text-2xl">notifications_active</span>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 font-bold leading-tight">미도착 시<br />자동 알림</span>
                    </div>
                    <div onClick={() => { if (window.confirm('경찰서(112)와 지정된 보호자에게 긴급 SOS를 발송하시겠습니까?')) alert('긴급 SOS가 발송되었습니다!'); }} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-red-100 dark:border-red-900/50 shadow-sm active:scale-95 transition-transform cursor-pointer">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                        <span className="text-[11px] text-red-700 dark:text-red-400 font-bold leading-tight">긴급 SOS<br />호출</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SafeReturn
