import { useEffect, useMemo, useState } from 'react'
import { Circle, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { useToast } from '../components/feedback/ToastProvider'
import CurrentLocationButton from '../components/map/CurrentLocationButton'
import MapView from '../components/map/MapView'
import SafetyMarkers from '../components/map/SafetyMarkers'
import { fetchReportMarkers } from '../services/reports'
import { generateMockSafetyData } from '../utils/mockData'
import { supabase } from '../utils/supabaseClient'

const DEFAULT_CENTER = { lat: 37.5006, lng: 127.0364 }
const FILTERS = ['전체', '주민 신고', 'CCTV', '비상벨', '안전지킴이집']

function Home() {
    const [activeFilter, setActiveFilter] = useState('전체')
    const [selectedMarkerId, setSelectedMarkerId] = useState(null)
    const [state, setState] = useState({
        center: DEFAULT_CENTER,
        level: 3,
        errMsg: null,
        isLoading: true,
    })
    const [mockSafetyData, setMockSafetyData] = useState([])
    const [realReports, setRealReports] = useState([])
    const { showToast } = useToast()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }

                    setState((prev) => ({
                        ...prev,
                        center,
                        isLoading: false,
                    }))
                    setMockSafetyData(generateMockSafetyData(center, 20, 0.005))
                },
                (error) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: error.message,
                        isLoading: false,
                    }))
                    setMockSafetyData(generateMockSafetyData(DEFAULT_CENTER, 20, 0.005))
                },
            )
        } else {
            setState((prev) => ({
                ...prev,
                errMsg: 'GPS를 사용할 수 없습니다.',
                isLoading: false,
            }))
            setMockSafetyData(generateMockSafetyData(DEFAULT_CENTER, 20, 0.005))
        }

        fetchReports()
    }, [])

    const fetchReports = async () => {
        try {
            const markers = await fetchReportMarkers(supabase)
            setRealReports(markers)
        } catch (error) {
            console.error('Unexpected error in fetchReports:', error)
            showToast({
                tone: 'error',
                title: '신고 데이터를 불러오지 못했습니다.',
            })
        }
    }

    const handleLocationUpdate = (newCenter) => {
        setState((prev) => ({ ...prev, center: newCenter }))
        setMockSafetyData(generateMockSafetyData(newCenter, 20, 0.005))
    }

    const filteredData = useMemo(() => {
        const allData = [...realReports, ...mockSafetyData]
        if (activeFilter === '전체') {
            return allData
        }
        return allData.filter((item) => item.type === activeFilter)
    }, [activeFilter, mockSafetyData, realReports])

    const stats = useMemo(() => {
        const cctv = mockSafetyData.filter((item) => item.type === 'CCTV').length
        const bell = mockSafetyData.filter((item) => item.type === '비상벨').length
        const reports = realReports.length
        return { cctv, bell, reports }
    }, [mockSafetyData, realReports])

    return (
        <>
            <div className="relative z-10 overflow-x-auto border-b border-slate-100 bg-white px-4 py-3 hide-scrollbar dark:border-slate-800 dark:bg-slate-900">
                <div className="flex gap-2 whitespace-nowrap">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-primary text-white shadow-md' : 'border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative flex-1 overflow-hidden bg-slate-200" style={{ minHeight: '50vh' }}>
                <MapView center={state.center} level={state.level} onClick={() => setSelectedMarkerId(null)}>
                    <CustomOverlayMap position={state.center} zIndex={100}>
                        <div className="pointer-events-none flex size-8 items-center justify-center rounded-full bg-primary/20 animate-pulse">
                            <div className="size-4 rounded-full bg-primary shadow-lg ring-2 ring-white"></div>
                        </div>
                    </CustomOverlayMap>

                    <Circle
                        center={state.center}
                        radius={500}
                        strokeWeight={1}
                        strokeColor="#2764e7"
                        strokeOpacity={0.4}
                        strokeStyle="solid"
                        fillColor="#2764e7"
                        fillOpacity={0.05}
                    />

                    <SafetyMarkers
                        data={filteredData}
                        selectedMarkerId={selectedMarkerId}
                        onMarkerClick={(id) => setSelectedMarkerId(id === selectedMarkerId ? null : id)}
                    />
                </MapView>

                <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => setState((prev) => ({ ...prev, level: Math.max(1, (prev.level || 3) - 1) }))}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700 shadow-md transition-colors active:bg-slate-50 dark:bg-slate-800"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setState((prev) => ({ ...prev, level: Math.min(14, (prev.level || 3) + 1) }))}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700 shadow-md transition-colors active:bg-slate-50 dark:bg-slate-800"
                    >
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                </div>

                <CurrentLocationButton onLocationUpdate={handleLocationUpdate} />

                <div className="absolute bottom-6 left-4 right-4 z-10 rounded-xl border border-slate-100 bg-white/95 p-4 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">현재 위치 안전 지수</h3>
                                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">A등급</span>
                            </div>
                            <div className="mb-4 flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                </span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.2</span>
                                <span className="ml-1 text-xs text-slate-500">안전 점수 기준</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 text-center dark:border-slate-700 dark:bg-slate-900/50">
                                    <p className="mb-1 text-[10px] font-medium text-slate-500">CCTV</p>
                                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{stats.cctv}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 text-center dark:border-slate-700 dark:bg-slate-900/50">
                                    <p className="mb-1 text-[10px] font-medium text-slate-500">비상벨</p>
                                    <p className="text-sm font-bold text-red-600 dark:text-red-400">{stats.bell}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 text-center dark:border-slate-700 dark:bg-slate-900/50">
                                    <p className="mb-1 text-[10px] font-medium text-slate-500">주민 신고</p>
                                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{stats.reports}</p>
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 flex flex-col items-center justify-center gap-2">
                            <div className="relative flex h-20 w-20 items-center justify-center">
                                <svg className="h-full w-full -rotate-90">
                                    <circle className="text-slate-100 dark:text-slate-700" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6"></circle>
                                    <circle className="text-primary transition-all duration-1000 ease-out" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213" strokeDashoffset="32" strokeWidth="6"></circle>
                                </svg>
                                <span className="absolute text-xl font-bold text-primary">85%</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => showToast({ title: '안전 지수 상세 정보는 준비 중입니다.' })}
                                className="flex items-center px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary/5"
                            >
                                상세보기 <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    {state.errMsg && (
                        <p className="mt-3 text-xs text-amber-600">
                            현재 위치를 가져오지 못해 기본 위치 기준으로 표시 중입니다.
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home
