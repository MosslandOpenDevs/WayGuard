import React from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;

/**
 * 카카오맵을 감싸는 공통 지도 컴포넌트
 * @param {object} center - 지도의 중심 좌표 { lat, lng }
 * @param {number} level - 지도의 확대/축소 레벨 (기본값: 3)
 * @param {boolean} isPanto - 지도 중심을 부드럽게 이동시킬지 여부
 * @param {React.ReactNode} children - 맵 내부에 렌더링할 마커, 오버레이 등
 */
const MapView = ({ center, level = 3, isPanto = true, children, ...props }) => {
    const [loading, error] = useKakaoLoader({
        appkey: KAKAO_APP_KEY,
        libraries: ['services', 'clusterer'],
    });

    if (!KAKAO_APP_KEY) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 px-6 text-center text-sm text-slate-600">
                카카오 지도 키가 설정되지 않았습니다. `.env`에 `VITE_KAKAO_MAP_API_KEY`를 추가해 주세요.
            </div>
        );
    }

    if (error) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 px-6 text-center text-sm text-slate-600">
                카카오 지도를 불러오지 못했습니다. API 키 설정과 허용 도메인을 확인해 주세요.
            </div>
        );
    }

    if (loading) {
        return <div className="absolute inset-0 bg-slate-200" />;
    }

    return (
        <Map
            center={center}
            style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
            level={level}
            isPanto={isPanto}
            onCreate={(map) => {
                requestAnimationFrame(() => {
                    map.relayout();
                    map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
                });
            }}
            {...props}
        >
            {children}
        </Map>
    );
};

export default MapView;
