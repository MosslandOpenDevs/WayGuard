const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function projectMarker(position, center, level) {
    const zoomFactor = Math.max(1, level || 3) / 3
    const latSpan = 0.018 * zoomFactor
    const lngSpan = 0.024 * zoomFactor

    const x = 50 + ((position.lng - center.lng) / lngSpan) * 100
    const y = 50 - ((position.lat - center.lat) / latSpan) * 100

    return {
        left: `${clamp(x, 8, 92)}%`,
        top: `${clamp(y, 10, 90)}%`,
    }
}

const previewRoads = [
    { width: '140%', height: '18px', top: '22%', left: '-10%', rotate: '-12deg' },
    { width: '130%', height: '16px', top: '58%', left: '-6%', rotate: '8deg' },
    { width: '20px', height: '120%', top: '-10%', left: '28%', rotate: '4deg' },
    { width: '16px', height: '125%', top: '-12%', left: '69%', rotate: '-6deg' },
]

function MarkerPopup({ item }) {
    return (
        <div className="absolute bottom-full left-1/2 z-30 mb-3 w-44 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-xl">
            <div className="flex items-center gap-2">
                <div className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white ${item.bgColor}`}>
                    <span className="material-symbols-outlined text-[12px]">{item.icon}</span>
                </div>
                <p className="truncate text-sm font-bold text-slate-800">{item.type}</p>
            </div>
            <p className="mt-2 text-xs leading-snug text-slate-500">{item.info || '주변 안전 정보를 표시합니다.'}</p>
            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[8px] border-t-[8px] border-x-transparent border-t-white"></div>
        </div>
    )
}

function FallbackMarker({ item, center, level, isSelected, onClick }) {
    const point = projectMarker(item.position, center, level)
    const isReport = item.type === '주민 신고'

    return (
        <button
            type="button"
            onClick={(event) => {
                event.stopPropagation()
                onClick(item.id)
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={point}
        >
            <div className="relative flex flex-col items-center">
                {isSelected && <MarkerPopup item={item} />}
                <div
                    className={`flex items-center justify-center rounded-full border-[3px] border-white text-white shadow-lg transition-all ${
                        isReport ? 'bg-red-500' : item.bgColor
                    } ${isSelected ? 'h-10 w-10 scale-110' : 'h-8 w-8'}`}
                >
                    <span className={`material-symbols-outlined ${isSelected ? 'text-[20px]' : 'text-[16px]'}`}>
                        {isReport ? 'campaign' : item.icon}
                    </span>
                </div>
                <div className="mt-[-2px] h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-white"></div>
                <div
                    className="z-10 mt-[-9px] h-0 w-0 border-x-[4px] border-t-[6px] border-x-transparent"
                    style={{ borderTopColor: isReport ? '#ef4444' : item.color }}
                ></div>
            </div>
        </button>
    )
}

const fallbackCopy = {
    missingKey: {
        eyebrow: 'Map Preview',
        title: '카카오 지도 키가 없어 프리뷰 지도를 보여주고 있습니다.',
        description: '실시간 지도를 사용하려면 `.env`에 `VITE_KAKAO_MAP_API_KEY`를 추가한 뒤 서버를 다시 실행해 주세요.',
    },
    sdkError: {
        eyebrow: 'Map Fallback',
        title: '카카오 지도를 불러오지 못해 프리뷰 지도로 전환했습니다.',
        description: 'JavaScript 키인지, 그리고 Kakao 콘솔의 허용 도메인에 `http://localhost:5173`가 등록됐는지 확인해 주세요.',
    },
}

const MapFallbackPreview = ({ center, level = 3, markers = [], selectedMarkerId, onMarkerClick, onBackgroundClick, reason = 'missingKey' }) => {
    const copy = fallbackCopy[reason] || fallbackCopy.missingKey

    return (
        <div
            className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,#fef3c7,transparent_28%),linear-gradient(180deg,#dbeafe_0%,#eff6ff_38%,#f8fafc_100%)]"
            onClick={onBackgroundClick}
            role="presentation"
        >
            <div className="absolute inset-0 opacity-70">
                {previewRoads.map((road) => (
                    <div
                        key={`${road.top}-${road.left}`}
                        className="absolute rounded-full bg-white/90 shadow-[0_0_0_1px_rgba(148,163,184,0.12)]"
                        style={{
                            width: road.width,
                            height: road.height,
                            top: road.top,
                            left: road.left,
                            transform: `rotate(${road.rotate})`,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40" />

            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-primary/10" />
            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20">
                <div className="flex h-full w-full items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-primary ring-2 ring-white" />
                </div>
            </div>

            {markers.map((item) => (
                <FallbackMarker
                    key={item.id}
                    item={item}
                    center={center}
                    level={level}
                    isSelected={selectedMarkerId === item.id}
                    onClick={(id) => onMarkerClick?.(selectedMarkerId === id ? null : id)}
                />
            ))}

            <div className="absolute left-4 top-4 right-4 z-20 rounded-2xl border border-white/70 bg-white/88 px-4 py-3 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{copy.title}</p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">{markers.length}개 포인트</div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{copy.description}</p>
            </div>
        </div>
    )
}

export default MapFallbackPreview
