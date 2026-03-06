import { useState } from 'react'

// 더미 피드 데이터 — 실제로는 Supabase에서 가져올 예정
const FEED_DATA = [
    {
        id: 1,
        user: '안전지기_역삼',
        level: 3,
        time: '10분 전',
        title: '역삼로 12길 가로등 3개 고장',
        content: '어제 퇴근길에 보니 역삼로 12길 근처 가로등 3개가 한꺼번에 안 들어오네요. 밤에 너무 어두워서 위험해 보입니다.',
        tags: ['#가로등고장', '#야간위험'],
        location: '역삼로 12길',
        // Stitch에서 생성된 이미지 URL
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT23yUVpQbAYOCjr4OPeooIdEdgMWo7ujdS867uikisWTio0c4fKI-y0Msz6PYMetL7a7BShRChhHLfVUwa6ZTj6pWYqZ2MQ-7BSj6P_d2goUjZhXawSxn-K29CVeYVU_h_D04AROnKsN2UrZmf8bIJBlluXMKstVm_rO0hmmzsiCgPrYlgBbCMzFZB0mTqDYmQXMlL2f2Ac4Rmg6FX97FDBjDEP_kiUdS_OxNRYSKPy-G6utQuhsZ05FsiwrxZrzAB9dxZgsOS3aG',
        danger: 23,
        comments: 5,
        isPrimary: true,
    },
    {
        id: 2,
        user: '선릉보안관',
        level: 2,
        time: '45분 전',
        title: '선릉역 2번 출구 비상벨 작동 불량',
        content: '선릉역 2번 출구 앞 비상벨에 빨간 불이 계속 깜빡이고 눌러도 반응이 없는 것 같아요. 점검이 필요해 보입니다.',
        tags: ['#비상벨고장', '#선릉역'],
        location: '선릉역 2번 출구 앞',
        image: null,
        danger: 45,
        comments: 12,
        isPrimary: false,
    },
]

const FILTERS = ['전체', '가로등고장', '도로파손', '위험요소']

// 커뮤니티 피드 페이지 — Stitch 디자인 기반
function Community() {
    const [activeFilter, setActiveFilter] = useState('전체')

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* 동네 선택 + 검색/필터 — Stitch 헤더 영역 */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-1 group cursor-pointer">
                        <h2 className="text-lg font-bold tracking-tight">역삼동</h2>
                        <span className="material-symbols-outlined text-slate-500">expand_more</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">tune</span>
                        </button>
                    </div>
                </div>
                {/* 카테고리 필터 칩 */}
                <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-1 rounded-full px-4 text-sm font-semibold ${activeFilter === f
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* 피드 리스트 */}
            <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative">
                {FEED_DATA.map(post => (
                    <div key={post.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                        {/* 프로필 영역 */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border ${post.isPrimary ? 'bg-primary/10 border-slate-100' : 'bg-slate-100 border-slate-100'
                                    } dark:border-slate-800`}>
                                    <span className={`material-symbols-outlined ${post.isPrimary ? 'text-primary' : 'text-slate-400'}`}>person</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm">{post.user}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${post.isPrimary
                                                ? 'bg-primary/10 text-primary'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                            }`}>
                                            Lv.{post.level}
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-500">{post.time}</span>
                                </div>
                            </div>
                            <button className="text-slate-400">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>

                        {/* 글 내용 */}
                        <div className="space-y-2 mb-3">
                            <h3 className="text-base font-bold leading-snug">{post.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{post.content}</p>
                            <div className="flex flex-wrap gap-2 text-primary text-xs font-medium">
                                {post.tags.map(tag => <span key={tag}>{tag}</span>)}
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                <span>{post.location}</span>
                            </div>
                        </div>

                        {/* 이미지 (있으면) */}
                        {post.image && (
                            <div className="rounded-lg overflow-hidden mb-4 aspect-video bg-slate-100 dark:bg-slate-800">
                                <img
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    src={post.image}
                                />
                            </div>
                        )}

                        {/* 반응 버튼 */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary transition-colors">
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                <span className="text-xs font-bold">위험해요 {post.danger}</span>
                            </button>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 text-slate-500">
                                    <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                    <span className="text-xs font-medium">{post.comments}</span>
                                </button>
                                <button className="flex items-center gap-1 text-slate-500">
                                    <span className="material-symbols-outlined text-sm">share</span>
                                    <span className="text-xs font-medium">공유</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="h-20"></div>

                {/* 플로팅 글쓰기 버튼 */}
                <button className="fixed bottom-24 right-6 max-w-[430px] w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-20">
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </main>
        </div>
    )
}

export default Community
