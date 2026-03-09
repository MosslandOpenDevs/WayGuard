import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { compressImage } from '../utils/imageUtils'

// 신고 카테고리 정의
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
    const [location, setLocation] = useState({ lat: 37.5006, lng: 127.0364 }) // 기본 역삼동
    const [locationName, setLocationName] = useState('현재 위치를 찾는 중...')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [photoFile, setPhotoFile] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    useEffect(() => {
        // 컴포넌트 마운트 시 위치 정보 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    setLocationName('현재 내 위치')
                },
                () => {
                    setLocationName('기본 위치 (위치 권한 없음)')
                }
            )
        } else {
            setLocationName('기본 위치 (GPS 미지원)')
        }
    }, [])

    const handleSubmit = async () => {
        if (!description.trim()) {
            alert('상세 설명을 입력해주세요.');
            return;
        }

        setIsSubmitting(true)

        // 현재 사용자 가져오기
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            alert('로그인이 필요합니다.')
            navigate('/login')
            setIsSubmitting(false)
            return
        }

        let imageUrl = null;

        // 사진이 첨부되었으면 먼저 압축 및 업로드
        if (photoFile) {
            try {
                // 1. 이미지 압축 (최대 800px, 70% 퀄리티)
                const compressedBlob = await compressImage(photoFile, 800, 800, 0.7);
                const fileName = `${session.user.id}/${Date.now()}.jpg`;

                // 2. Supabase Storage에 업로드
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('reports') // 버킷 이름 (직접 생성 필요)
                    .upload(fileName, compressedBlob, {
                        contentType: 'image/jpeg'
                    });

                if (uploadError) {
                    console.error('Storage upload error:', uploadError);
                    alert(`사진 업로드 실패 (Storage 버킷 'reports'를 생성하고 Public 권한을 열어주세요)\n에러: ${uploadError.message}`);
                    setIsSubmitting(false);
                    return;
                }

                // 3. 업로드된 사진의 Public URL 가져오기
                const { data: { publicUrl } } = supabase.storage
                    .from('reports')
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            } catch (imgError) {
                console.error('Image compression error:', imgError);
                alert('사진 압축 중 오류가 발생했습니다.');
                setIsSubmitting(false);
                return;
            }
        }

        // Supabase DB에 인서트
        const { error } = await supabase
            .from('reports')
            .insert([
                {
                    user_id: session.user.id,
                    category: selectedCategory,
                    description: description,
                    latitude: location.lat,
                    longitude: location.lng,
                    image_url: imageUrl
                }
            ])

        setIsSubmitting(false)

        if (error) {
            console.error('Error inserting report:', error)
            alert(`신고 접수 중 오류가 발생했습니다.\n${error.message}`)
        } else {
            alert('신고가 안전하게 접수되었습니다! 주변 이웃들과 관련 기관에 전달됩니다.')
            navigate('/')
        }
    }

    const handlePhotoUpload = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    }

    const handleRemovePhoto = () => {
        setPhotoFile(null);
        setPhotoPreview(null);
    }

    const handleChangeLocation = () => {
        alert('지도에서 새 위치 지정하기 (기능 준비 중입니다.)\n현재 위치를 계속 사용합니다.');
    }

    return (
        <div className="flex-1 overflow-y-auto pb-32 px-4">
            {/* 카테고리 선택 */}
            <section className="mt-6">
                <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold mb-4">신고 유형 선택</h2>
                <div className="grid grid-cols-2 gap-4">
                    {CATEGORIES.map(cat => (
                        <div
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`relative flex flex-col gap-2 rounded-xl p-4 cursor-pointer transition-all ${selectedCategory === cat.id
                                ? 'border-2 border-primary bg-primary/5'
                                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <span
                                    className={`material-symbols-outlined ${selectedCategory === cat.id ? 'text-primary' : 'text-slate-500'}`}
                                    style={selectedCategory === cat.id ? { fontVariationSettings: "'FILL' 1" } : {}}
                                >
                                    {cat.icon}
                                </span>
                                {selectedCategory === cat.id && (
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                )}
                            </div>
                            <p className={`text-sm font-${selectedCategory === cat.id ? 'bold' : 'medium'} ${selectedCategory === cat.id ? 'text-primary' : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                {cat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 사진 첨부 */}
            <section className="mt-8">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold">사진 첨부</h2>
                    <span className="text-[10px] text-red-500 font-bold bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">※ 개인정보 주의</span>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                    {/* 업로드 버튼 */}
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="flex flex-col shrink-0 items-center justify-center w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-400">photo_camera</span>
                        <span className="text-[10px] text-slate-400 mt-1 font-medium">{photoFile ? '1' : '0'}/1</span>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />
                    </div>
                    {/* 첨부된 사진 썸네일 */}
                    {photoPreview && (
                        <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 animate-slide-up">
                            <img src={photoPreview} alt="Attached Preview" className="w-full h-full object-cover" />
                            <button
                                onClick={handleRemovePhoto}
                                className="absolute top-1 right-1 size-5 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-outlined text-white text-[14px]">close</span>
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                    타인의 얼굴이나 차량 번호판 등 <span className="font-bold text-red-500">개인정보가 포함된 사진은 사전 경고 없이 무통보 삭제</span>될 수 있으며, 법적 책임은 등록자 본인에게 있습니다.
                </p>
            </section>

            {/* 발생 위치 */}
            <section className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold">발생 위치</h2>
                    <button onClick={handleChangeLocation} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                        위치 수정 <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="p-4 flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary">location_on</span>
                        <div className="flex-1">
                            <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">{locationName}</p>
                            <p className="text-slate-500 text-[10px] uppercase font-mono mt-0.5">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 상세 설명 */}
            <section className="mt-8">
                <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold mb-4">상세 설명</h2>
                <div className="relative">
                    <textarea
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-primary focus:border-primary outline-none transition-shadow"
                        placeholder="상황을 설명해주세요 (예: 가로등이 깜빡여서 어둡습니다)"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                    />
                    <div className="absolute bottom-3 right-4 text-[10px] text-slate-400 font-medium">{description.length}/200</div>
                </div>
            </section>

            {/* 안내 문구 */}
            <div className="mt-6 flex gap-3 items-start p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                <span className="material-symbols-outlined text-slate-400 text-lg">info</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                    허위 신고 시 관계 법령에 따라 처벌받을 수 있습니다. 신고 내용은 안전한 지역 사회를 위해 시청/경찰관서에 전달됩니다.
                </p>
            </div>

            {/* 제출 버튼 */}
            <div className="mt-8">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white text-base font-bold rounded-xl shadow-lg transition-all ${isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary shadow-primary/20 active:scale-[0.98]'}`}
                >
                    {isSubmitting ? '접수 중...' : '신고하기'}
                </button>
            </div>
        </div>
    )
}

export default Report
