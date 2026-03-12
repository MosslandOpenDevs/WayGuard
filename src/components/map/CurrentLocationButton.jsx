import { useState } from 'react'
import { useToast } from '../feedback/ToastProvider'

const CurrentLocationButton = ({ onLocationUpdate }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useToast()

    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            showToast({
                tone: 'error',
                title: '위치 정보를 사용할 수 없습니다.',
                description: '이 브라우저는 GPS 기능을 지원하지 않습니다.',
            })
            return
        }

        setIsLoading(true)

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords

                if (onLocationUpdate) {
                    onLocationUpdate({ lat: latitude, lng: longitude })
                }

                showToast({
                    tone: 'success',
                    title: '현재 위치로 이동했습니다.',
                })
                setIsLoading(false)
            },
            (error) => {
                console.error('Error fetching location:', error)
                showToast({
                    tone: 'error',
                    title: '위치 정보를 가져오지 못했습니다.',
                    description: '장치의 위치 서비스와 브라우저 권한을 확인해 주세요.',
                })
                setIsLoading(false)
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            },
        )
    }

    return (
        <button
            onClick={handleGetCurrentLocation}
            disabled={isLoading}
            className={`absolute bottom-24 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition-all dark:border-slate-700 dark:bg-slate-800 ${isLoading ? 'cursor-not-allowed opacity-70' : 'active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            aria-label="현재 위치로 이동"
        >
            <span className={`material-symbols-outlined text-slate-700 dark:text-slate-300 ${isLoading ? 'animate-spin' : ''}`}>
                {isLoading ? 'refresh' : 'my_location'}
            </span>
        </button>
    )
}

export default CurrentLocationButton
