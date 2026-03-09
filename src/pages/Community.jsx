import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const FILTERS = ['전체', '가로등고장', '도로파손', '위험요소']

// 커뮤니티 피드 페이지 — Supabase 연동
function Community() {
    const [activeFilter, setActiveFilter] = useState('전체')
    const [feed, setFeed] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [newPostContent, setNewPostContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchFeed()
    }, [])

    const fetchFeed = async () => {
        setIsLoading(true)
        // safety_feed 테이블과 profiles 테이블을 조인하여 작성자 정보도 함께 가져옵니다
        const { data, error } = await supabase
            .from('safety_feed')
            .select(`
                *,
                profiles (
                    nickname,
                    level
                )
            `)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching feeds:', error)
        } else {
            setFeed(data || [])
        }
        setIsLoading(false)
    }

    const handleAddPost = async () => {
        if (!newPostContent.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        setIsSubmitting(true)

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            alert('로그인이 필요한 기능입니다.');
            setIsSubmitting(false)
            return;
        }

        const { error } = await supabase
            .from('safety_feed')
            .insert([
                {
                    user_id: session.user.id,
                    title: '동네 소식', // 간소화를 위해 제목은 고정 또는 앞부분 일부 사용 가능
                    content: newPostContent,
                    location_name: '내 위치 주변',
                    danger_count: 0
                }
            ])

        setIsSubmitting(false)

        if (error) {
            console.error('Error posting feed:', error)
            alert('글 작성 중 오류가 발생했습니다.')
        } else {
            setIsWriting(false)
            setNewPostContent('')
            fetchFeed() // 새로고침
        }
    }

    // 날짜 포맷 함수 (간이형)
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* 동네 선택 + 검색/필터 */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0">
                <div className="flex items-center justify-between px-4 py-3">
                    <div onClick={() => alert('동네 변경 기능은 준비 중입니다.')} className="flex items-center gap-1 group cursor-pointer hover:opacity-80 transition-opacity">
                        <h2 className="text-lg font-bold tracking-tight">우리 동네 피드</h2>
                        <span className="material-symbols-outlined text-slate-500">expand_more</span>
                    </div>
                </div>
                {/* 카테고리 필터 칩 */}
                <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-1 rounded-full px-4 text-sm font-semibold transition-colors ${activeFilter === f
                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* 피드 리스트 */}
            <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {isLoading ? (
                    <div className="text-center text-slate-500 py-10 animate-pulse">피드를 불러오는 중...</div>
                ) : feed.length === 0 ? (
                    <div className="text-center text-slate-500 py-10 flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">speaker_notes_off</span>
                        <p>등록된 동네 소식이 없습니다.</p>
                        <p className="text-xs">첫 번째 소식을 남겨보세요!</p>
                    </div>
                ) : (
                    feed.map(post => (
                        <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
                            {/* 프로필 영역 */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 bg-primary/5 text-primary">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                                                {post.profiles?.nickname || '익명 사용자'}
                                            </span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-primary/10 text-primary">
                                                Lv.{post.profiles?.level || 1}
                                            </span>
                                        </div>
                                        <button onClick={() => alert('게시물 옵션(신고/차단) 기능은 준비 중입니다.')} className="text-slate-400 p-1 -mr-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                            <span className="material-symbols-outlined text-lg">more_horiz</span>
                                        </button>
                                    </div>
                                    <span className="text-xs text-slate-500">{formatTime(post.created_at)}</span>
                                </div>
                            </div>

                            {/* 글 내용 */}
                            <div className="space-y-1.5 mb-3">
                                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                            </div>

                            {/* 하단 메타 정보 */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/50">
                                {post.location_name && (
                                    <div className="flex items-center gap-1 text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                                        <span className="material-symbols-outlined text-xs">location_on</span>
                                        <span className="text-[11px] font-medium">{post.location_name}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <button onClick={() => alert('공감했습니다!')} className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">favorite</span>
                                        <span className="text-xs font-semibold">{post.danger_count || 0}</span>
                                    </button>
                                    <button onClick={() => alert('댓글 기능은 준비 중입니다.')} className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                        <span className="text-xs font-semibold">0</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div className="h-24"></div> {/* 하단 여백 */}
            </main>

            {/* 플로팅 글쓰기 버튼 */}
            <button
                onClick={() => setIsWriting(true)}
                className="absolute bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 group"
            >
                <span className="material-symbols-outlined text-3xl group-active:rotate-90 transition-transform">edit</span>
            </button>

            {/* 글쓰기 모달 */}
            {isWriting && (
                <div className="absolute inset-0 z-50 flex flex-col justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-slate-900 w-full rounded-t-3xl pt-6 pb-8 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-slide-up relative">
                        {/* 상단 닫기 핸들러 */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>

                        <div className="flex justify-between items-center mb-6 mt-2">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">edit_square</span>
                                동네 소식 쓰기
                            </h3>
                            <button onClick={() => setIsWriting(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <div className="relative">
                            <textarea
                                className="w-full h-36 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none mb-6 text-sm dark:text-white placeholder:text-slate-400"
                                placeholder="우리 동네의 안전 소식이나 위험 요소를 이웃들과 자유롭게 공유해보세요!"
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            ></textarea>
                            <div className="absolute bottom-10 right-3 text-[10px] text-slate-400">{newPostContent.length}/500</div>
                        </div>

                        <button
                            onClick={handleAddPost}
                            disabled={isSubmitting}
                            className={`w-full py-4 text-white text-base font-bold rounded-xl shadow-lg transition-all ${isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]'}`}
                        >
                            {isSubmitting ? '게시하는 중...' : '게시하기'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Community
