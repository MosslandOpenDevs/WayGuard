import React from 'react'
import { CustomOverlayMap } from 'react-kakao-maps-sdk'

const LABELS = {
    report: '\uC8FC\uBBFC \uC2E0\uACE0',
    community: '\uCEE4\uBBA4\uB2C8\uD2F0 \uC81C\uBCF4',
    empty: '\uC0C1\uC138 \uC124\uBA85\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.',
    details: '\uC2E0\uACE0 \uB0B4\uC6A9',
}

const MARKER_STYLES = {
    report: {
        fill: '#ef4444',
        ring: 'rgba(239, 68, 68, 0.22)',
        label: LABELS.report,
    },
    community: {
        fill: '#10b981',
        ring: 'rgba(16, 185, 129, 0.20)',
        label: LABELS.community,
    },
}

const isReportMarker = (type = '') => type.includes(LABELS.report) || type.toLowerCase().includes('report')

function MarkerButton({ item, markerStyle, isSelected, onClick }) {
    return (
        <button
            type="button"
            aria-label={`${item.type} \uC0C1\uC138 \uBCF4\uAE30`}
            onClick={(event) => {
                event.stopPropagation()
                onClick?.(item.id)
            }}
            className={`relative flex items-center justify-center rounded-full border-2 border-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition-transform duration-150 ${
                isSelected ? 'h-9 w-9 scale-105' : 'h-7 w-7 hover:scale-105'
            }`}
            style={{ backgroundColor: markerStyle.fill }}
        >
            <span
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                    backgroundColor: markerStyle.ring,
                    transform: 'scale(1.45)',
                }}
            />
            <span className="pointer-events-none relative h-3 w-3 rounded-full bg-white/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)]" />
        </button>
    )
}

function MarkerPopup({ item, markerStyle, onOpenDetails }) {
    const title = item.categoryLabel || markerStyle.label

    return (
        <div className="relative">
            <div className="min-w-[216px] max-w-[248px] rounded-[28px] border border-slate-200/90 bg-white/95 p-3 shadow-[0_24px_48px_rgba(15,23,42,0.18)] backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: markerStyle.fill }}
                        />
                        <span className="text-sm font-bold text-slate-900">{title}</span>
                    </div>
                    <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                        style={{
                            backgroundColor: markerStyle.ring,
                            color: markerStyle.fill,
                        }}
                    >
                        {markerStyle.label}
                    </span>
                </div>
                <div className="mt-3 rounded-2xl bg-slate-50 px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{LABELS.details}</p>
                    <p className="mt-1 text-xs leading-snug text-slate-600">{item.info || LABELS.empty}</p>
                </div>
                {item.imageUrl ? (
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation()
                            window.open(item.imageUrl, '_blank', 'noopener,noreferrer')
                        }}
                        className="mt-3 block h-28 w-full overflow-hidden rounded-[20px] border border-slate-200 bg-slate-100"
                    >
                        <img
                            src={item.imageUrl}
                            alt={`${item.type} image`}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.onerror = null
                                event.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Load+Failed'
                            }}
                        />
                    </button>
                ) : null}
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation()
                        onOpenDetails?.(item)
                    }}
                    className="mt-3 flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
                >
                    전체 보기
                </button>
            </div>
        </div>
    )
}

function SafetyMarkers({ data, selectedMarkerId, onMarkerClick, onOpenDetails }) {
    if (!data?.length) return null

    return (
        <>
            {data.map((item) => {
                const isSelected = selectedMarkerId === item.id
                const isReport = isReportMarker(item.type)
                const markerStyle = isReport ? MARKER_STYLES.report : MARKER_STYLES.community

                return (
                    <React.Fragment key={item.id}>
                        <CustomOverlayMap
                            position={item.position}
                            clickable={true}
                            xAnchor={0.5}
                            yAnchor={0.5}
                            zIndex={isSelected ? 30 : isReport ? 20 : 10}
                        >
                            <MarkerButton
                                item={item}
                                markerStyle={markerStyle}
                                isSelected={isSelected}
                                onClick={onMarkerClick}
                            />
                        </CustomOverlayMap>

                        {isSelected ? (
                            <CustomOverlayMap
                                position={item.position}
                                clickable={true}
                                xAnchor={0.5}
                                yAnchor={1.16}
                                zIndex={60}
                            >
                                <MarkerPopup item={item} markerStyle={markerStyle} onOpenDetails={onOpenDetails} />
                            </CustomOverlayMap>
                        ) : null}
                    </React.Fragment>
                )
            })}
        </>
    )
}

export default SafetyMarkers
