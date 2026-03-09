import React, { useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

/**
 * 안전 데이터 배열을 받아 지도 위에 커스텀 마커로 렌더링하는 컴포넌트
 * @param {Array} data - 마커 데이터 배열 [{ id, type, position, icon, bgColor, info }, ...]
 * @param {string|number} selectedMarkerId - 현재 선택된 마커 ID
 * @param {function} onMarkerClick - 마커 클릭 시 호출될 핸들러
 */
const SafetyMarkers = ({ data, selectedMarkerId, onMarkerClick }) => {
    if (!data || data.length === 0) return null;

    return (
        <>
            {data.map((item) => {
                const isSelected = selectedMarkerId === item.id;

                return (
                    <CustomOverlayMap key={item.id} position={item.position} zIndex={isSelected ? 50 : 10}>
                        <div className="relative group flex flex-col items-center justify-center">

                            {/* 마커 본체 (클릭 가능 영역 확대) */}
                            {item.type === '주민신고' ? (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onMarkerClick(item.id)
                                    }}
                                    className={`flex justify-center items-center rounded-full shadow-lg text-white border-[3px] border-white transition-all cursor-pointer ring-offset-2 animate-pulse-red bg-red-500
                                        ${isSelected ? 'w-10 h-10 scale-110 shadow-red-500/50 z-20 ring-2 ring-red-500' : 'w-8 h-8 hover:scale-110'}`}
                                >
                                    <span className={`material-symbols-outlined ${isSelected ? 'text-[20px]' : 'text-[16px]'} fill-current`}>
                                        {isSelected ? 'e911_emergency' : 'campaign'}
                                    </span>
                                </div>
                            ) : (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onMarkerClick(item.id)
                                    }}
                                    className={`flex justify-center items-center rounded-full shadow-lg text-white border-[3px] border-white transition-all cursor-pointer ring-offset-2 hover:ring-2 hover:ring-primary/50
                                        ${item.bgColor} 
                                        ${isSelected ? 'w-10 h-10 scale-110 shadow-primary/30 z-20 ring-2 ring-primary' : 'w-8 h-8 hover:scale-110'}`}
                                >
                                    <span className={`material-symbols-outlined ${isSelected ? 'text-[20px]' : 'text-[16px]'}`}>{item.icon}</span>
                                </div>
                            )}

                            {/* 마커 꼬리 (삼각형) - 주민신고인 경우 빨간색으로 변경 */}
                            <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-white -mt-[2px]`}></div>
                            <div className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent -mt-[9px] z-10 transition-all`}
                                style={{ borderTopColor: item.type === '주민신고' ? '#ef4444' : item.color }}></div>

                            {/* 활성화된 팝업창 */}
                            {isSelected && (
                                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 animate-slide-up z-50 pointer-events-auto">
                                    <div className="p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={`size-6 rounded-full flex items-center justify-center ${item.bgColor} text-white shrink-0`}>
                                                <span className="material-symbols-outlined text-[12px]">{item.icon}</span>
                                            </div>
                                            <span className="font-bold text-sm text-slate-800 dark:text-white truncate">{item.type}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{item.info}</p>

                                        {item.imageUrl ? (
                                            <div className="mt-2 w-full h-32 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer" onClick={() => window.open(item.imageUrl, '_blank')}>
                                                <img
                                                    src={item.imageUrl}
                                                    alt={`${item.type} 첨부 사진`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Load+Failed';
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="mt-2 w-full py-4 flex flex-col items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-700">
                                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-lg">no_photography</span>
                                                <p className="text-[10px] text-slate-400 mt-1">첨부된 사진이 없습니다</p>
                                            </div>
                                        )}

                                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                                            <button className="text-[10px] font-bold text-primary hover:bg-primary/5 px-2 py-1 rounded transition-colors">길찾기</button>
                                        </div>
                                    </div>
                                    {/* 팝업 꼬리 */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white dark:border-t-slate-800"></div>
                                </div>
                            )}
                        </div>
                    </CustomOverlayMap>
                )
            })}
        </>
    );
};

export default SafetyMarkers;
