import { useState, useEffect } from 'react'
import { Map, CustomOverlayMap, Circle } from 'react-kakao-maps-sdk'

// 홈 페이지 — Stitch 디자인 기반 안전 지도 메인 화면
function Home() {
    const [activeFilter, setActiveFilter] = useState('전체')
    const filters = ['전체', 'CCTV', '가로등', '비상벨', '지킴이집', '스쿨존']

    // 중심 좌표 (기본값: 역삼동) 및 GPS 로딩 상태
    const [state, setState] = useState({
        center: { lat: 37.5006, lng: 127.0364 },
        errMsg: null,
        isLoading: true,
    })

    // 컴포넌트 마운트 시 내 위치 받아오기 (Geolocation)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: { lat: position.coords.latitude, lng: position.coords.longitude },
                        isLoading: false,
                    }))
                },
                (err) => {
                    setState((prev) => ({ ...prev, errMsg: err.message, isLoading: false }))
                }
            )
        } else {
            setState((prev) => ({ ...prev, errMsg: 'GPS 지원 안됨', isLoading: false }))
        }
    }, [])

    return (
        <>
            {/* 필터 바 — 가로 스크롤 */}
            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-x-auto hide-scrollbar">
                <div className="flex gap-2 whitespace-nowrap">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium ${activeFilter === f
                                ? 'bg-primary text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* 지도 영역 */}
            <div className="relative flex-1 bg-slate-200 overflow-hidden" style={{ minHeight: '50vh' }}>
                {/* 실제 카카오맵 렌더링 */}
                <Map
                    center={state.center}
                    style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
                    level={3}
                >
                    {/* 내 위치 (현재 위치) 핑 */}
                    <CustomOverlayMap position={state.center}>
                        <div className="size-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                            <div className="size-4 bg-primary rounded-full ring-2 ring-white shadow-lg"></div>
                        </div>
                    </CustomOverlayMap>

                    {/* 주변 안전 반경 가이드 (반경 500m) */}
                    <Circle
                        center={state.center}
                        radius={500}
                        strokeWeight={1}
                        strokeColor={"#2764e7"}
                        strokeOpacity={0.4}
                        strokeStyle={"solid"}
                        fillColor={"#2764e7"}
                        fillOpacity={0.05}
                    />
                </Map>

                {/* 지도 컨트롤 (확대, 축소, 내위치 중심) */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
                    <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-slate-700 active:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-slate-700 active:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                    <button
                        className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-primary mt-2 active:bg-slate-50 transition-colors"
                        onClick={() => {
                            // 내 위치 버튼 클릭 시 한 번 더 위치를 가져오는 로직 연동 가능
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    (pos) => setState(p => ({ ...p, center: { lat: pos.coords.latitude, lng: pos.coords.longitude } }))
                                )
                            }
                        }}
                    >
                        <span className="material-symbols-outlined">my_location</span>
                    </button>
                </div>

                {/* 안전 등급 플로팅 카드 */}
                <div className="absolute bottom-6 left-4 right-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">역삼동 안전 지수</h3>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded">A등급</span>
                            </div>
                            <div className="flex items-center gap-1 mb-4">
                                <span className="material-symbols-outlined text-amber-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.0</span>
                                <span className="text-xs text-slate-500 ml-1">우수 지역</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg text-center flex flex-col items-center justify-center">
                                    <p className="text-xs text-slate-500 font-medium mb-1">CCTV</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">32</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg text-center flex flex-col items-center justify-center">
                                    <p className="text-xs text-slate-500 font-medium mb-1">비상벨</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">8</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg text-center flex flex-col items-center justify-center">
                                    <p className="text-xs text-slate-500 font-medium mb-1">지킴이집</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">5</p>
                                </div>
                            </div>
                        </div>
                        {/* 원형 진행률 표시 */}
                        <div className="ml-4 flex flex-col items-center justify-center gap-2">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle className="text-slate-100 dark:text-slate-700" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6"></circle>
                                    <circle className="text-primary" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213" strokeDashoffset="40" strokeWidth="6"></circle>
                                </svg>
                                <span className="absolute text-xl font-bold text-primary">85%</span>
                            </div>
                            <button className="text-xs font-semibold text-primary flex items-center">
                                상세보기 <span className="material-symbols-outlined text-xs">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
