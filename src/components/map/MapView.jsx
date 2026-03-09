import React from 'react';
import { Map } from 'react-kakao-maps-sdk';

/**
 * 카카오맵을 감싸는 공통 지도 컴포넌트
 * @param {object} center - 지도의 중심 좌표 { lat, lng }
 * @param {number} level - 지도의 확대/축소 레벨 (기본값: 3)
 * @param {boolean} isPanto - 지도 중심을 부드럽게 이동시킬지 여부
 * @param {React.ReactNode} children - 맵 내부에 렌더링할 마커, 오버레이 등
 */
const MapView = ({ center, level = 3, isPanto = true, children }) => {
    return (
        <Map
            center={center}
            style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
            level={level}
            isPanto={isPanto}
        >
            {children}
        </Map>
    );
};

export default MapView;
