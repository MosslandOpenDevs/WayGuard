import React, { useState } from 'react';

/**
 * 현재 위치(GPS)를 기반으로 지도를 이동시키는 버튼 컴포넌트
 * @param {function} onLocationUpdate - 위치 업데이트 성공 시 호출될 콜백 함수 (lat, lng 전달)
 */
const CurrentLocationButton = ({ onLocationUpdate }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('현재 브라우저에서는 위치 정보를 지원하지 않습니다.');
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                if (onLocationUpdate) {
                    onLocationUpdate({ lat: latitude, lng: longitude });
                }
                setIsLoading(false);
            },
            (error) => {
                console.error('Error fetching location:', error);
                alert('위치 정보를 가져오는 데 실패했습니다. 장치의 위치 서비스가 켜져 있는지 확인해 주세요.');
                setIsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    };

    return (
        <button
            onClick={handleGetCurrentLocation}
            disabled={isLoading}
            className={`absolute bottom-24 right-4 z-10 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95'
                }`}
            aria-label="현재 위치로 이동"
        >
            <span className={`material-symbols-outlined text-slate-700 dark:text-slate-300 ${isLoading ? 'animate-spin' : ''}`}>
                {isLoading ? 'refresh' : 'my_location'}
            </span>
        </button>
    );
};

export default CurrentLocationButton;
