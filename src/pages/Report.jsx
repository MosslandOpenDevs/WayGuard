import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/feedback/ToastProvider'
import { createReport, uploadReportImage } from '../services/reports'
import { compressImage } from '../utils/imageUtils'
import { supabase } from '../utils/supabaseClient'

const CATEGORIES = [
    { id: 'light', icon: 'lightbulb', label: '가로등 고장' },
    { id: 'cctv', icon: 'videocam_off', label: 'CCTV 사각지대' },
    { id: 'facility', icon: 'warning', label: '위험 시설물' },
    { id: 'suspicious', icon: 'person_search', label: '수상한 상황' },
    { id: 'other', icon: 'more_horiz', label: '기타 위험' },
]

function Report() {
    const [selectedCategory, setSelectedCategory] = useState('light')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState({ lat: 37.5006, lng: 127.0364 })
    const [locationName, setLocationName] = useState('현재 위치를 찾는 중...')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [photoFile, setPhotoFile] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const { showToast } = useToast()

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationName('기본 위치 사용 중 (GPS 미지원)')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setLocationName('현재 내 위치')
            },
            () => {
                setLocationName('기본 위치 사용 중 (위치 권한 없음)')
            },
        )
    }, [])

    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview)
            }
        }
    }, [photoPreview])

    const handleSubmit = async () => {
        if (!description.trim()) {
            showToast({
                tone: 'error',
                title: '상세 설명을 입력해 주세요.',
            })
            return
        }

        setIsSubmitting(true)

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            showToast({
                tone: 'error',
                title: '로그인이 필요합니다.',
            })
            navigate('/login')
            setIsSubmitting(false)
            return
        }

        let imageUrl = null

        if (photoFile) {
            try {
                const compressedBlob = await compressImage(photoFile, 800, 800, 0.7)
                imageUrl = await uploadReportImage(supabase, session.user.id, compressedBlob)
            } catch (error) {
                console.error('Image upload error:', error)
                showToast({
                    tone: 'error',
                    title: '사진 업로드에 실패했습니다.',
                    description: "Supabase Storage의 'reports' 버킷과 공개 권한을 확인해 주세요.",
                })
                setIsSubmitting(false)
                return
            }
        }

        try {
            await createReport(supabase, {
                user_id: session.user.id,
                category: selectedCategory,
                description,
                latitude: location.lat,
                longitude: location.lng,
                image_url: imageUrl,
            })

            showToast({
                tone: 'success',
                title: '신고가 접수되었습니다.',
                description: '주변 이웃과 관련 기관에 공유됩니다.',
            })
            navigate('/')
        } catch (error) {
            console.error('Error inserting report:', error)
            showToast({
                tone: 'error',
                title: '신고 접수 중 오류가 발생했습니다.',
                description: error.message,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handlePhotoUpload = (event) => {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }

        if (photoPreview) {
            URL.revokeObjectURL(photoPreview)
        }

        setPhotoFile(file)
        setPhotoPreview(URL.createObjectURL(file))
    }

    const handleRemovePhoto = () => {
        if (photoPreview) {
            URL.revokeObjectURL(photoPreview)
        }
        setPhotoFile(null)
        setPhotoPreview(null)
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 pb-32">
            <section className="mt-6">
                <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-slate-100">신고 유형 선택</h2>
                <div className="grid grid-cols-2 gap-4">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => setSelectedCategory(category.id)}
                            className={`relative flex flex-col gap-2 rounded-xl p-4 text-left transition-all ${selectedCategory === category.id ? 'border-2 border-primary bg-primary/5' : 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'}`}
                        >
                            <div className="flex items-start justify-between">
                                <span
                                    className={`material-symbols-outlined ${selectedCategory === category.id ? 'text-primary' : 'text-slate-500'}`}
                                    style={selectedCategory === category.id ? { fontVariationSettings: "'FILL' 1" } : {}}
                                >
                                    {category.icon}
                                </span>
                                {selectedCategory === category.id && (
                                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                )}
                            </div>
                            <p className={`text-sm ${selectedCategory === category.id ? 'font-bold text-primary' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                                {category.label}
                            </p>
                        </button>
                    ))}
                </div>
            </section>

            <section className="mt-8">
                <div className="mb-4 flex items-end justify-between">
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">사진 첨부</h2>
                    <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500 dark:bg-red-900/20">
                        개인정보 주의
                    </span>
                </div>
                <div className="hide-scrollbar flex gap-4 overflow-x-auto">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                        <span className="material-symbols-outlined text-slate-400">photo_camera</span>
                        <span className="mt-1 text-[10px] font-medium text-slate-400">{photoFile ? '1' : '0'}/1</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />
                    </button>

                    {photoPreview && (
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-200 animate-slide-up dark:border-slate-800 dark:bg-slate-800">
                            <img src={photoPreview} alt="첨부 사진 미리보기" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 transition-colors hover:bg-black/70"
                            >
                                <span className="material-symbols-outlined text-[14px] text-white">close</span>
                            </button>
                        </div>
                    )}
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
                    타인의 얼굴이나 차량 번호판 등 <span className="font-bold text-red-500">개인정보가 포함된 사진은 사전 경고 없이 비공개 처리</span>될 수 있으며, 법적 책임은 등록한 본인에게 있습니다.
                </p>
            </section>

            <section className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">발생 위치</h2>
                    <button
                        type="button"
                        onClick={() => showToast({ title: '위치 변경 기능은 준비 중입니다.', description: '현재 위치를 계속 사용합니다.' })}
                        className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                        위치 수정 <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-4 p-4">
                        <span className="material-symbols-outlined text-primary">location_on</span>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{locationName}</p>
                            <p className="mt-0.5 font-mono text-[10px] uppercase text-slate-500">
                                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-slate-100">상세 설명</h2>
                <div className="relative">
                    <textarea
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-primary focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="상황을 자세히 설명해 주세요. 예: 가로등이 깜빡여서 어둡습니다."
                        rows="4"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        maxLength={200}
                    />
                    <div className="absolute bottom-3 right-4 text-[10px] font-medium text-slate-400">{description.length}/200</div>
                </div>
            </section>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800/50">
                <span className="material-symbols-outlined text-lg text-slate-400">info</span>
                <p className="text-[11px] leading-relaxed text-slate-500">
                    허위 신고는 관련 법령에 따라 처벌받을 수 있습니다. 신고 내용은 안전한 지역사회를 위해 지자체와 관련 기관에 전달됩니다.
                </p>
            </div>

            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all ${isSubmitting ? 'cursor-not-allowed bg-primary/70' : 'bg-primary shadow-primary/20 active:scale-[0.98]'}`}
                >
                    {isSubmitting ? '접수 중...' : '신고하기'}
                </button>
            </div>
        </div>
    )
}

export default Report
