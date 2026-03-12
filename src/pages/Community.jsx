import { useEffect, useState } from 'react'
import { useToast } from '../components/feedback/ToastProvider'
import { createCommunityPost, fetchCommunityFeed } from '../services/community'
import { supabase } from '../utils/supabaseClient'

const FILTERS = ['전체', '가로등 고장', '순찰 요청', '위험 요소']

function Community() {
    const [activeFilter, setActiveFilter] = useState('전체')
    const [feed, setFeed] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [newPostContent, setNewPostContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showToast } = useToast()

    useEffect(() => {
        fetchFeed()
    }, [])

    const fetchFeed = async () => {
        setIsLoading(true)
        try {
            const data = await fetchCommunityFeed(supabase)
            setFeed(data)
        } catch (error) {
            console.error('Error fetching feeds:', error)
            showToast({
                tone: 'error',
                title: '동네 소식을 불러오지 못했습니다.',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddPost = async () => {
        if (!newPostContent.trim()) {
            showToast({
                tone: 'error',
                title: '내용을 입력해 주세요.',
            })
            return
        }

        setIsSubmitting(true)

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            showToast({
                tone: 'error',
                title: '로그인이 필요한 기능입니다.',
            })
            setIsSubmitting(false)
            return
        }

        try {
            await createCommunityPost(supabase, {
                user_id: session.user.id,
                title: '동네 소식',
                content: newPostContent,
                location_name: '내 주변',
                danger_count: 0,
            })
            setIsWriting(false)
            setNewPostContent('')
            showToast({
                tone: 'success',
                title: '게시물이 등록되었습니다.',
            })
            fetchFeed()
        } catch (error) {
            console.error('Error posting feed:', error)
            showToast({
                tone: 'error',
                title: '글 작성 중 오류가 발생했습니다.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatTime = (isoString) => {
        const date = new Date(isoString)
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
    }

    return (
        <div className="relative flex flex-1 flex-col overflow-hidden">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        type="button"
                        onClick={() => showToast({ title: '동네 변경 기능은 준비 중입니다.' })}
                        className="group flex items-center gap-1 transition-opacity hover:opacity-80"
                    >
                        <h2 className="text-lg font-bold tracking-tight">우리 동네 소식</h2>
                        <span className="material-symbols-outlined text-slate-500">expand_more</span>
                    </button>
                </div>

                <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-1 rounded-full px-4 text-sm font-semibold transition-colors ${activeFilter === filter ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                {isLoading ? (
                    <div className="py-10 text-center text-slate-500 animate-pulse">동네 소식을 불러오는 중...</div>
                ) : feed.length === 0 ? (
                    <div className="flex flex-col items-center py-10 text-center text-slate-500">
                        <span className="material-symbols-outlined mb-2 text-4xl text-slate-300">speaker_notes_off</span>
                        <p>등록된 동네 소식이 없습니다.</p>
                        <p className="text-xs">첫 번째 소식을 남겨보세요.</p>
                    </div>
                ) : (
                    feed.map((post) => (
                        <div key={post.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-primary/5 text-primary dark:border-slate-800">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                {post.profiles?.nickname || '익명 사용자'}
                                            </span>
                                            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                                                Lv.{post.profiles?.level || 1}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => showToast({ title: '게시물 옵션은 준비 중입니다.' })}
                                            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                        >
                                            <span className="material-symbols-outlined text-lg">more_horiz</span>
                                        </button>
                                    </div>
                                    <span className="text-xs text-slate-500">{formatTime(post.created_at)}</span>
                                </div>
                            </div>

                            <div className="mb-3 space-y-1.5">
                                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 dark:text-slate-200">{post.content}</p>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-50 pt-3 dark:border-slate-800/50">
                                {post.location_name && (
                                    <div className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-slate-400 dark:bg-slate-800/50">
                                        <span className="material-symbols-outlined text-xs">location_on</span>
                                        <span className="text-[11px] font-medium">{post.location_name}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => showToast({ tone: 'success', title: '공감이 반영되었습니다.' })}
                                        className="flex items-center gap-1 text-slate-400 transition-colors hover:text-primary"
                                    >
                                        <span className="material-symbols-outlined text-sm">favorite</span>
                                        <span className="text-xs font-semibold">{post.danger_count || 0}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => showToast({ title: '댓글 기능은 준비 중입니다.' })}
                                        className="flex items-center gap-1 text-slate-400 transition-colors hover:text-primary"
                                    >
                                        <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                        <span className="text-xs font-semibold">0</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div className="h-24"></div>
            </main>

            <button
                type="button"
                onClick={() => setIsWriting(true)}
                className="group absolute bottom-24 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
                <span className="material-symbols-outlined text-3xl transition-transform group-active:rotate-90">edit</span>
            </button>

            {isWriting && (
                <div className="absolute inset-0 z-50 flex flex-col justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
                    <div className="relative w-full rounded-t-3xl bg-white px-6 pb-8 pt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-slide-up dark:bg-slate-900 dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                        <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate-200 dark:bg-slate-700"></div>

                        <div className="mb-6 mt-2 flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                <span className="material-symbols-outlined text-primary">edit_square</span>
                                동네 소식 쓰기
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsWriting(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <div className="relative">
                            <textarea
                                className="mb-6 h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                                placeholder="우리 동네의 안전 소식이나 위험 요소를 이웃과 자유롭게 공유해보세요."
                                value={newPostContent}
                                onChange={(event) => setNewPostContent(event.target.value)}
                                maxLength={500}
                            />
                            <div className="absolute bottom-10 right-3 text-[10px] text-slate-400">{newPostContent.length}/500</div>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddPost}
                            disabled={isSubmitting}
                            className={`w-full rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all ${isSubmitting ? 'cursor-not-allowed bg-primary/70' : 'bg-primary shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]'}`}
                        >
                            {isSubmitting ? '게시 중...' : '게시하기'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Community
