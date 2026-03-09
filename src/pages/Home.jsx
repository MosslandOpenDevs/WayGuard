import { useState, useEffect, useMemo } from 'react'
import { CustomOverlayMap, Circle } from 'react-kakao-maps-sdk'
import MapView from '../components/map/MapView'
import CurrentLocationButton from '../components/map/CurrentLocationButton'
import SafetyMarkers from '../components/map/SafetyMarkers'
import { generateMockSafetyData } from '../utils/mockData'
import { supabase } from '../utils/supabaseClient'

// 홈 페이지 — Stitch 디자인 기반 안전 지도 메인 화면
function Home() {
    const [activeFilter, setActiveFilter] = useState('전체')
    const [selectedMarkerId, setSelectedMarkerId] = useState(null)
    const filters = ['전체', '주민신고', 'CCTV', '비상벨', '지킴이집']

    // 중심 좌표 및 상태 관리
    const [state, setState] = useState({
        center: { lat: 37.5006, lng: 127.0364 },
        level: 3,
        errMsg: null,
        isLoading: true,
    })

    // 안전 시설 목데이터 및 실제 신고 데이터
    const [mockSafetyData, setMockSafetyData] = useState([])
    const [realReports, setRealReports] = useState([])

    // 컴포넌트 마운트 시 내 위치 받아오기 (Geolocation)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const center = { lat: position.coords.latitude, lng: position.coords.longitude };
                    setState((prev) => ({
                        ...prev,
                        center,
                        isLoading: false,
                    }));
                    setMockSafetyData(generateMockSafetyData(center, 20, 0.005));
                },
                (err) => {
                    setState((prev) => ({ ...prev, errMsg: err.message, isLoading: false }))
                    setMockSafetyData(generateMockSafetyData(state.center, 20, 0.005));
                }
            )
        } else {
            setState((prev) => ({ ...prev, errMsg: 'GPS 지원 안됨', isLoading: false }))
            setMockSafetyData(generateMockSafetyData(state.center, 20, 0.005));
        }

        fetchReports();
    }, [])

    // 실제 사용자 신고 데이터 가져오기
    const fetchReports = async () => {
        try {
            const { data, error } = await supabase
                .from('reports')
                .select('*')

            if (error) {
                console.error('Error fetching reports:', error)
                return;
            }

            if (data && Array.isArray(data)) {
                // 마커 겹침 방지를 위한 좌표 추적 맵
                const locationMap = new Map();

                // DB 데이터를 마커 포맷으로 변환
                const formattedReports = data.map(report => {
                    let imageUrl = report.image_url;

                    // image_url이 존재하고 경로 형태인 경우 Public URL로 변환
                    try {
                        if (imageUrl && typeof imageUrl === 'string' && !imageUrl.startsWith('http')) {
                            const { data: publicData } = supabase.storage
                                .from('reports')
                                .getPublicUrl(imageUrl);
                            imageUrl = publicData?.publicUrl || imageUrl;
                        }
                    } catch (storageErr) {
                        console.error('Storage URL error:', storageErr);
                    }

                    let lat = Number(report.latitude) || 37.5006;
                    let lng = Number(report.longitude) || 127.0364;

                    // 겹침 방지 오프셋 로직 (소수점 4자리 기준 동일 판단)
                    const locKey = `${lat.toFixed(4)}_${lng.toFixed(4)}`;
                    if (locationMap.has(locKey)) {
                        const count = locationMap.get(locKey);
                        locationMap.set(locKey, count + 1);

                        // 원형 배치 (약 10~20m 반경)
                        const radius = 0.00015 * Math.ceil(count / 6);
                        const angle = count * (Math.PI / 3); // 60도씩 회전

                        lat += Math.sin(angle) * radius;
                        lng += Math.cos(angle) * radius;
                    } else {
                        locationMap.set(locKey, 1);
                    }

                    return {
                        id: `report_${report.id}`,
                        type: '주민신고',
                        position: { lat, lng },
                        icon: 'campaign',
                        bgColor: 'bg-primary',
                        color: '#2764e7',
                        info: report.description || '',
                        imageUrl: imageUrl
                    };
                });
                setRealReports(formattedReports)
            }
        } catch (err) {
            console.error('Unexpected error in fetchReports:', err);
        }
    }

    const handleLocationUpdate = (newCenter) => {
        setState((prev) => ({ ...prev, center: newCenter }));
        setMockSafetyData(generateMockSafetyData(newCenter, 20, 0.005));
    };

    // 필터링된 마커 데이터 계산 (목데이터 + 실제 데이터 병합)
    const filteredData = useMemo(() => {
        const allData = [...realReports, ...mockSafetyData];
        if (activeFilter === '전체') return allData;
        return allData.filter(item => item.type === activeFilter);
    }, [activeFilter, mockSafetyData, realReports]);

    // 타입별 카운트 계산 (하단 플로팅 카드용)
    const stats = useMemo(() => {
        const cctv = mockSafetyData.filter(i => i.type === 'CCTV').length;
        const bell = mockSafetyData.filter(i => i.type === '비상벨').length;
        const reports = realReports.length;
        return { cctv, bell, reports };
    }, [mockSafetyData, realReports]);

    return (
        <>
            {/* 필터 바 — 가로 스크롤 */}
            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-x-auto hide-scrollbar z-10 relative">
                <div className="flex gap-2 whitespace-nowrap">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === f
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
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
                <MapView
                    center={state.center}
                    level={state.level}
                    onClick={() => setSelectedMarkerId(null)}
                >
                    {/* 내 위치 (현재 위치) 핑 */}
                    <CustomOverlayMap position={state.center} zIndex={100}>
                        <div className="size-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse pointer-events-none">
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

                    {/* 임시 안전 시설 데이터 렌더링 */}
                    <SafetyMarkers
                        data={filteredData}
                        selectedMarkerId={selectedMarkerId}
                        onMarkerClick={(id) => setSelectedMarkerId(id === selectedMarkerId ? null : id)}
                    />
                </MapView>

                {/* 지도 컨트롤 (확대, 축소) */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
                    <button onClick={() => setState(prev => ({ ...prev, level: Math.max(1, (prev.level || 3) - 1) }))} className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-slate-700 active:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button onClick={() => setState(prev => ({ ...prev, level: Math.min(14, (prev.level || 3) + 1) }))} className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-slate-700 active:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                </div>

                {/* 현재 위치로 이동하는 FAB 버튼 */}
                <CurrentLocationButton onLocationUpdate={handleLocationUpdate} />

                {/* 안전 등급 플로팅 카드 */}
                <div className="absolute bottom-6 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-100 dark:border-slate-700 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">현재 위치 안전 지수</h3>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded">A등급</span>
                            </div>
                            <div className="flex items-center gap-1 mb-4">
                                <span className="material-symbols-outlined text-amber-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.2</span>
                                <span className="text-xs text-slate-500 ml-1">우수 지역</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                                    <p className="text-[10px] text-slate-500 font-medium mb-1">CCTV</p>
                                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{stats.cctv}</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                                    <p className="text-[10px] text-slate-500 font-medium mb-1">비상벨</p>
                                    <p className="text-sm font-bold text-red-600 dark:text-red-400">{stats.bell}</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                                    <p className="text-[10px] text-slate-500 font-medium mb-1">주민신고</p>
                                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{stats.reports}</p>
                                </div>
                            </div>
                        </div>
                        {/* 원형 진행률 표시 */}
                        <div className="ml-4 flex flex-col items-center justify-center gap-2">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle className="text-slate-100 dark:text-slate-700" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6"></circle>
                                    <circle className="text-primary transition-all duration-1000 ease-out" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213" strokeDashoffset="32" strokeWidth="6"></circle>
                                </svg>
                                <span className="absolute text-xl font-bold text-primary">85%</span>
                            </div>
                            <button onClick={() => alert('안전 지수 상세 정보를 불러옵니다. (준비 중)')} className="text-[10px] font-semibold text-primary flex items-center hover:bg-primary/5 px-2 py-1 rounded">
                                상세보기 <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
