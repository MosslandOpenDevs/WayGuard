import { useState } from 'react'

// 신고 카테고리 정의 — Stitch 디자인의 아이콘과 레이블 매핑
const CATEGORIES = [
    { id: 'light', icon: 'lightbulb', label: '가로등 고장' },
    { id: 'cctv', icon: 'videocam_off', label: 'CCTV 사각지대' },
    { id: 'facility', icon: 'warning', label: '위험 시설물' },
    { id: 'suspicious', icon: 'person_search', label: '수상한 상황' },
    { id: 'other', icon: 'more_horiz', label: '기타 위험' },
]

// 위험 신고 페이지 — Stitch 디자인 기반
function Report() {
    const [selectedCategory, setSelectedCategory] = useState('light')
    const [description, setDescription] = useState('')

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
                <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold mb-4">사진 첨부</h2>
                <div className="flex gap-4 overflow-x-auto">
                    {/* 업로드 버튼 */}
                    <div className="flex flex-col shrink-0 items-center justify-center w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer">
                        <span className="material-symbols-outlined text-slate-400">photo_camera</span>
                        <span className="text-[10px] text-slate-400 mt-1 font-medium">1/5</span>
                    </div>
                    {/* 샘플 썸네일 */}
                    <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
                        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-500 text-2xl">image</span>
                        </div>
                        <button className="absolute top-1 right-1 size-5 bg-black/50 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px]">close</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* 발생 위치 */}
            <section className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold">발생 위치</h2>
                    <button className="text-primary text-xs font-bold flex items-center gap-1">
                        위치 수정 <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="p-4 flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary">location_on</span>
                        <div className="flex-1">
                            <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">서울 강남구 역삼동 123-4</p>
                            <p className="text-slate-500 text-xs mt-0.5">현재 위치를 기준으로 설정되었습니다.</p>
                        </div>
                    </div>
                    {/* 미니 지도 영역 */}
                    <div className="h-32 w-full bg-slate-200 dark:bg-slate-800 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100"></div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="size-8 bg-primary/20 rounded-full flex items-center justify-center">
                                <div className="size-3 bg-primary rounded-full ring-2 ring-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 상세 설명 */}
            <section className="mt-8">
                <h2 className="text-slate-900 dark:text-slate-100 text-base font-bold mb-4">상세 설명</h2>
                <div className="relative">
                    <textarea
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-primary focus:border-primary"
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
                <button className="w-full py-4 bg-primary text-white text-base font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                    신고하기
                </button>
            </div>
        </div>
    )
}

export default Report
