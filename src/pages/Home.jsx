import { useEffect, useMemo, useRef, useState } from 'react'
import { Circle, CustomOverlayMap } from 'react-kakao-maps-sdk'
import BottomSheet from '../components/feedback/BottomSheet'
import { useToast } from '../components/feedback/ToastProvider'
import CurrentLocationButton from '../components/map/CurrentLocationButton'
import MapFallbackPreview from '../components/map/MapFallbackPreview'
import MapView from '../components/map/MapView'
import SafetyMarkers from '../components/map/SafetyMarkers'
import { fetchReportMarkers } from '../services/reports'
import { generateMockSafetyData, MOCK_CATEGORIES } from '../utils/mockData'
import { supabase } from '../utils/supabaseClient'

const DEFAULT_CENTER = { lat: 37.5006, lng: 127.0364 }
const ALL_FILTER = '__all__'
const SAFETY_RING_LENGTH = 2 * Math.PI * 34

const UI = {
    residentReports: '\uC8FC\uBBFC \uC2E0\uACE0',
    community: '\uCEE4\uBBA4\uB2C8\uD2F0 \uC81C\uBCF4',
    gpsUnavailable: 'GPS\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    reportsLoadFailed: '\uC2E0\uACE0 \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.',
    scoreTitle: '\uD604\uC7AC \uC704\uCE58 \uC548\uC2EC \uC9C0\uC218',
    scoreBadge: '\uCC38\uACE0 \uC9C0\uD45C',
    scoreBasis: '\uC8FC\uBBFC \uD65C\uB3D9 \uAE30\uBC18',
    communityLabel: '\uCEE4\uBBA4\uB2C8\uD2F0',
    reportsLabel: '\uC8FC\uBBFC \uC2E0\uACE0',
    totalLabel: '\uC804\uCCB4 \uC81C\uBCF4',
    fallbackLocation: '\uD604\uC7AC \uC704\uCE58\uB97C \uAC00\uC838\uC624\uC9C0 \uBABB\uD574 \uAE30\uBCF8 \uC704\uCE58 \uAE30\uC900\uC73C\uB85C \uD45C\uC2DC \uC911\uC785\uB2C8\uB2E4.',
}

const FILTERS = [UI.residentReports, UI.community]

function Home() {
    const [activeFilter, setActiveFilter] = useState(ALL_FILTER)
    const [selectedMarkerId, setSelectedMarkerId] = useState(null)
    const [isScoreSheetOpen, setIsScoreSheetOpen] = useState(false)
    const [activeDetailItem, setActiveDetailItem] = useState(null)
    const suppressNextMapClickRef = useRef(false)
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
                    setMockSafetyData(generateMockSafetyData(center, 16, 0.005))
                },
                (error) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: error.message,
                        isLoading: false,
                    }))
                    setMockSafetyData(generateMockSafetyData(DEFAULT_CENTER, 16, 0.005))
                },
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
            )
        } else {
            setState((prev) => ({
                ...prev,
                errMsg: UI.gpsUnavailable,
                isLoading: false,
            }))
            setMockSafetyData(generateMockSafetyData(DEFAULT_CENTER, 16, 0.005))
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
                title: UI.reportsLoadFailed,
            })
        }
    }

    const handleLocationUpdate = (newCenter) => {
        setState((prev) => ({ ...prev, center: newCenter }))
        setMockSafetyData(generateMockSafetyData(newCenter, 16, 0.005))
    }

    const handleMarkerClick = (id) => {
        suppressNextMapClickRef.current = true
        setSelectedMarkerId((prev) => (prev === id ? null : id))
    }

    const handleMapClick = () => {
        if (suppressNextMapClickRef.current) {
            suppressNextMapClickRef.current = false
            return
        }

        setSelectedMarkerId(null)
    }

    const communitySignals = useMemo(
        () => mockSafetyData.filter((item) => item.type === MOCK_CATEGORIES.community),
        [mockSafetyData],
    )

    const allData = useMemo(() => [...realReports, ...communitySignals], [communitySignals, realReports])

    const filteredData = useMemo(() => {
        if (activeFilter === ALL_FILTER) {
            return allData
        }
        return allData.filter((item) => item.type === activeFilter)
    }, [activeFilter, allData])

    const stats = useMemo(() => {
        const community = communitySignals.length
        const reports = realReports.length
        const total = community + reports
        return { community, reports, total }
    }, [communitySignals, realReports])

    const safety = useMemo(() => {
        // Community signals raise confidence; recent reports lower it, with diminishing weight.
        const raw = 60 + stats.community * 2 - stats.reports * 4
        const score = Math.max(35, Math.min(98, Math.round(raw)))
        const rating = Math.round((score / 20) * 10) / 10
        const label = score >= 80 ? '안정적' : score >= 60 ? '보통 이상' : '주의 필요'
        const note =
            score >= 80
                ? '커뮤니티 제보가 꾸준히 올라오고 최근 신고 수가 과도하게 몰리지 않아 현재 구간은 비교적 안정적으로 보입니다.'
                : score >= 60
                    ? '주민 활동과 신고 흐름이 일반적인 수준입니다. 이동할 때 주변 상황을 함께 확인해 주세요.'
                    : '최근 신고가 상대적으로 많은 편입니다. 이동할 때 주변 상황에 조금 더 주의해 주세요.'
        return { score, rating, label, note }
    }, [stats])

    const handleOpenMarkerDetails = (item) => {
        setActiveDetailItem(item)
    }

    return (
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
            <div className="relative min-h-0 flex-1 overflow-hidden bg-slate-200">
                <MapView
                    center={state.center}
                    level={state.level}
                    onClick={handleMapClick}
                    fallback={
                        <MapFallbackPreview
                            center={state.center}
                            level={state.level}
                            markers={filteredData}
                            selectedMarkerId={selectedMarkerId}
                            onMarkerClick={handleMarkerClick}
                            onBackgroundClick={handleMapClick}
                        />
                    }
                >
                    <CustomOverlayMap position={state.center} clickable={false} zIndex={1}>
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
                        onMarkerClick={handleMarkerClick}
                        onOpenDetails={handleOpenMarkerDetails}
                    />
                </MapView>

                <div className="pointer-events-none absolute left-4 top-4 right-20 z-10">
                    <div className="hide-scrollbar pointer-events-auto overflow-x-auto">
                        <div className="inline-flex w-max max-w-full gap-2 rounded-2xl border border-white/50 bg-white/70 p-2 shadow-lg backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/65">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setActiveFilter((prev) => (prev === filter ? ALL_FILTER : filter))}
                                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        activeFilter === ALL_FILTER || activeFilter === filter
                                            ? 'bg-primary text-white shadow-md'
                                            : 'border border-slate-200/80 bg-white/85 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute right-4 top-5 z-10 flex flex-col gap-2">
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

                <div className="absolute bottom-3 left-4 right-4 z-10 rounded-xl border border-slate-100 bg-white/95 p-4 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{UI.scoreTitle}</h3>
                                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{UI.scoreBadge}</span>
                            </div>
                            <div className="mb-4 flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                </span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{safety.rating}</span>
                                <span className="ml-1 text-xs text-slate-500">{UI.scoreBasis}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 text-center dark:border-slate-700 dark:bg-slate-900/50">
                                    <p className="mb-1 text-[10px] font-medium text-slate-500">{UI.communityLabel}</p>
                                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{stats.community}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 text-center dark:border-slate-700 dark:bg-slate-900/50">
                                    <p className="mb-1 text-[10px] font-medium text-slate-500">{UI.reportsLabel}</p>
                                    <p className="text-sm font-bold text-red-600 dark:text-red-400">{stats.reports}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 text-center dark:border-slate-700 dark:bg-slate-900/50">
                                    <p className="mb-1 text-[10px] font-medium text-slate-500">{UI.totalLabel}</p>
                                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 flex flex-col items-center justify-center gap-2">
                            <div className="relative flex h-20 w-20 items-center justify-center">
                                <svg className="h-full w-full -rotate-90">
                                    <circle className="text-slate-100 dark:text-slate-700" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6"></circle>
                                    <circle
                                        className="text-primary transition-all duration-1000 ease-out"
                                        cx="40"
                                        cy="40"
                                        fill="transparent"
                                        r="34"
                                        stroke="currentColor"
                                        strokeDasharray={SAFETY_RING_LENGTH}
                                        strokeDashoffset={SAFETY_RING_LENGTH * (1 - safety.score / 100)}
                                        strokeWidth="6"
                                    ></circle>
                                </svg>
                                <span className="absolute text-xl font-bold text-primary">{safety.score}%</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsScoreSheetOpen(true)}
                                className="flex items-center px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary/5"
                            >
                                {'\uC790\uC138\uD788 \uBCF4\uAE30'} <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    {state.errMsg && (
                        <p className="mt-3 text-xs text-amber-600">
                            {UI.fallbackLocation}
                        </p>
                    )}
                </div>
            </div>

            <BottomSheet
                open={isScoreSheetOpen}
                onClose={() => setIsScoreSheetOpen(false)}
                title="안심 지수 상세"
                description="현재 위치 반경 500m 기준의 주민 활동과 신고 흐름을 요약했습니다."
            >
                <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Current Score</p>
                        <div className="mt-2 flex items-end gap-2">
                            <span className="text-4xl font-black text-primary">{safety.score}%</span>
                            <span className="pb-1 text-sm font-semibold text-slate-500">{safety.label}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {safety.note}
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-800">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Community</p>
                            <p className="mt-2 text-2xl font-black text-emerald-500">{stats.community}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-800">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Reports</p>
                            <p className="mt-2 text-2xl font-black text-red-500">{stats.reports}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-800">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Total</p>
                            <p className="mt-2 text-2xl font-black text-blue-500">{stats.total}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-800">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">해석 가이드</h4>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                주민 신고 수는 경고 신호이고, 커뮤니티 제보는 생활권 감시 밀도를 의미합니다. 둘을 함께 보되 최근 신고 증가가 더 큰 영향을 줍니다.
                            </p>
                        </div>
                    </div>
                </div>
            </BottomSheet>

            <BottomSheet
                open={Boolean(activeDetailItem)}
                onClose={() => setActiveDetailItem(null)}
                title={activeDetailItem?.categoryLabel || activeDetailItem?.type}
                description={activeDetailItem?.type}
                footer={
                    activeDetailItem?.imageUrl ? (
                        <button
                            type="button"
                            onClick={() => window.open(activeDetailItem.imageUrl, '_blank', 'noopener,noreferrer')}
                            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white"
                        >
                            사진 크게 보기
                        </button>
                    ) : null
                }
            >
                {activeDetailItem ? (
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Details</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {activeDetailItem.info || '추가 설명이 아직 없습니다.'}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-800">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Coordinates</p>
                            <p className="mt-2 font-mono text-xs text-slate-600 dark:text-slate-300">
                                {activeDetailItem.position?.lat?.toFixed?.(5)}, {activeDetailItem.position?.lng?.toFixed?.(5)}
                            </p>
                        </div>
                        {activeDetailItem.imageUrl ? (
                            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 dark:border-slate-700">
                                <img src={activeDetailItem.imageUrl} alt={`${activeDetailItem.type} preview`} className="h-52 w-full object-cover" />
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </BottomSheet>
        </div>
    )
}

export default Home
