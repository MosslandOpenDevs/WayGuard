import { useEffect, useMemo, useState } from 'react'
import BottomSheet from '../components/feedback/BottomSheet'
import { useToast } from '../components/feedback/ToastProvider'
import { createCommunityPost, fetchCommunityFeed } from '../services/community'
import { supabase } from '../utils/supabaseClient'

const FILTERS = ['전체', '조명 점검', '순찰 요청', '위험 요소', '안심 메모']
const NEIGHBORHOODS = [
    { id: 'yeoksam', name: '역삼동', subtitle: '강남구 생활권' },
    { id: 'nonhyeon', name: '논현동', subtitle: '심야 이동 집중 구역' },
    { id: 'daechi', name: '대치동', subtitle: '학원가 보호 동선' },
]

function normalizeCategory(post) {
    return FILTERS.includes(post.title) ? post.title : '안심 메모'
}

function Community() {
    const [activeFilter, setActiveFilter] = useState('전체')
    const [feed, setFeed] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [newPostContent, setNewPostContent] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('안심 메모')
    const [activeNeighborhood, setActiveNeighborhood] = useState(NEIGHBORHOODS[0])
    const [isNeighborhoodSheetOpen, setIsNeighborhoodSheetOpen] = useState(false)
    const [activePost, setActivePost] = useState(null)
    const [sheetMode, setSheetMode] = useState(null)
    const [commentDraft, setCommentDraft] = useState('')
    const [commentMap, setCommentMap] = useState({})
    const [likedPostIds, setLikedPostIds] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showToast } = useToast()

    useEffect(() => {
        fetchFeedData()
    }, [])

    const fetchFeedData = async () => {
        setIsLoading(true)
        try {
            const data = await fetchCommunityFeed(supabase)
            setFeed(data || [])
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
        const {
            data: { session },
        } = await supabase.auth.getSession()

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
                title: selectedCategory,
                content: newPostContent.trim(),
                location_name: activeNeighborhood.name,
                danger_count: 0,
            })

            setIsWriting(false)
            setNewPostContent('')
            setSelectedCategory('안심 메모')
            showToast({
                tone: 'success',
                title: '동네 소식을 등록했습니다.',
            })
            fetchFeedData()
        } catch (error) {
            console.error('Error posting feed:', error)
            showToast({
                tone: 'error',
                title: '글 작성 중 오류가 발생했습니다.',
                description: error.message,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatTime = (isoString) => {
        const date = new Date(isoString)
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
    }

    const filteredFeed = useMemo(() => {
        if (activeFilter === '전체') {
            return feed
        }

        return feed.filter((post) => normalizeCategory(post) === activeFilter)
    }, [activeFilter, feed])

    const openPostSheet = (post, mode) => {
        setActivePost(post)
        setSheetMode(mode)
    }

    const closePostSheet = () => {
        setActivePost(null)
        setSheetMode(null)
        setCommentDraft('')
    }

    const handleToggleLike = (postId) => {
        const nextLiked = !likedPostIds[postId]
        setLikedPostIds((current) => ({ ...current, [postId]: nextLiked }))
        showToast({
            tone: 'success',
            title: nextLiked ? '공감을 남겼습니다.' : '공감을 취소했습니다.',
        })
    }

    const handleAddComment = () => {
        if (!activePost || !commentDraft.trim()) {
            showToast({
                tone: 'error',
                title: '댓글 내용을 입력해 주세요.',
            })
            return
        }

        const nextComment = {
            id: Date.now(),
            author: '나',
            content: commentDraft.trim(),
            createdAt: new Date().toISOString(),
        }

        setCommentMap((current) => ({
            ...current,
            [activePost.id]: [...(current[activePost.id] || []), nextComment],
        }))
        setCommentDraft('')
        showToast({
            tone: 'success',
            title: '댓글을 남겼습니다.',
        })
    }

    const handleCopyPost = async () => {
        if (!activePost) return

        try {
            await navigator.clipboard.writeText(activePost.content)
            showToast({
                tone: 'success',
                title: '게시글 내용을 복사했습니다.',
            })
        } catch {
            showToast({
                tone: 'error',
                title: '복사에 실패했습니다.',
            })
        } finally {
            closePostSheet()
        }
    }

    const handleSharePost = async () => {
        if (!activePost) return

        try {
            if (navigator.share) {
                await navigator.share({
                    title: activePost.title || '동네 소식',
                    text: activePost.content,
                })
                showToast({
                    tone: 'success',
                    title: '공유가 완료되었습니다.',
                })
            } else {
                await navigator.clipboard.writeText(activePost.content)
                showToast({
                    tone: 'success',
                    title: '공유 기능 대신 내용을 복사했습니다.',
                })
            }
        } catch {
            showToast({
                title: '공유를 취소했습니다.',
            })
        } finally {
            closePostSheet()
        }
    }

    const activeComments = activePost ? commentMap[activePost.id] || [] : []

    return (
        <>
            <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
                <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/85">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            type="button"
                            onClick={() => setIsNeighborhoodSheetOpen(true)}
                            className="group flex items-center gap-2 transition-opacity hover:opacity-80"
                        >
                            <div className="text-left">
                                <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{activeNeighborhood.name} 동네 소식</p>
                                <p className="text-xs text-slate-400">{activeNeighborhood.subtitle}</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-500">expand_more</span>
                        </button>
                    </div>

                    <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`flex h-9 shrink-0 items-center justify-center gap-1 rounded-full px-4 text-sm font-semibold transition-colors ${
                                    activeFilter === filter
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                    {isLoading ? (
                        <div className="py-10 text-center text-slate-500 animate-pulse">동네 소식을 불러오는 중...</div>
                    ) : filteredFeed.length === 0 ? (
                        <div className="flex flex-col items-center py-10 text-center text-slate-500">
                            <span className="material-symbols-outlined mb-2 text-4xl text-slate-300">speaker_notes_off</span>
                            <p>등록된 동네 소식이 없습니다.</p>
                            <p className="text-xs">첫 제보를 남겨 우리 동네 안전 흐름을 알려 주세요.</p>
                        </div>
                    ) : (
                        filteredFeed.map((post) => {
                            const category = normalizeCategory(post)
                            const likeCount = (post.danger_count || 0) + (likedPostIds[post.id] ? 1 : 0)
                            const commentCount = (commentMap[post.id] || []).length

                            return (
                                <article
                                    key={post.id}
                                    className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-primary/5 text-primary dark:border-slate-800">
                                            <span className="material-symbols-outlined">person</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                                            {post.profiles?.nickname || '익명 사용자'}
                                                        </span>
                                                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                                                            Lv.{post.profiles?.level || 1}
                                                        </span>
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                                                            {category}
                                                        </span>
                                                        <span className="text-xs text-slate-500">{formatTime(post.created_at)}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => openPostSheet(post, 'options')}
                                                    className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                                >
                                                    <span className="material-symbols-outlined text-lg">more_horiz</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 space-y-1.5">
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 dark:text-slate-200">{post.content}</p>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-slate-50 pt-3 dark:border-slate-800/50">
                                        {post.location_name ? (
                                            <div className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-slate-400 dark:bg-slate-800/50">
                                                <span className="material-symbols-outlined text-xs">location_on</span>
                                                <span className="text-[11px] font-medium">{post.location_name}</span>
                                            </div>
                                        ) : <div />}
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleLike(post.id)}
                                                className={`flex items-center gap-1 transition-colors ${
                                                    likedPostIds[post.id] ? 'text-primary' : 'text-slate-400 hover:text-primary'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-sm">favorite</span>
                                                <span className="text-xs font-semibold">{likeCount}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openPostSheet(post, 'comments')}
                                                className="flex items-center gap-1 text-slate-400 transition-colors hover:text-primary"
                                            >
                                                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                                                <span className="text-xs font-semibold">{commentCount}</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    )}
                    <div className="h-24" />
                </main>

                <button
                    type="button"
                    onClick={() => setIsWriting(true)}
                    className="group absolute bottom-24 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                >
                    <span className="material-symbols-outlined text-3xl transition-transform group-active:rotate-90">edit</span>
                </button>
            </div>

            <BottomSheet
                open={isNeighborhoodSheetOpen}
                onClose={() => setIsNeighborhoodSheetOpen(false)}
                title="동네 선택"
                description="커뮤니티 피드 기준 생활권을 바꿀 수 있습니다."
            >
                <div className="space-y-3">
                    {NEIGHBORHOODS.map((neighborhood) => (
                        <button
                            key={neighborhood.id}
                            type="button"
                            onClick={() => {
                                setActiveNeighborhood(neighborhood)
                                setIsNeighborhoodSheetOpen(false)
                            }}
                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                                activeNeighborhood.id === neighborhood.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
                            }`}
                        >
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{neighborhood.name}</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{neighborhood.subtitle}</p>
                            </div>
                            {activeNeighborhood.id === neighborhood.id ? (
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                            ) : null}
                        </button>
                    ))}
                </div>
            </BottomSheet>

            <BottomSheet
                open={sheetMode === 'options' && Boolean(activePost)}
                onClose={closePostSheet}
                title="게시글 옵션"
                description={activePost ? `${normalizeCategory(activePost)} · ${activePost.location_name || activeNeighborhood.name}` : ''}
            >
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={handleCopyPost}
                        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">내용 복사</p>
                            <p className="mt-1 text-xs text-slate-500">게시글 내용을 클립보드에 복사합니다.</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">content_copy</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleSharePost}
                        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">공유하기</p>
                            <p className="mt-1 text-xs text-slate-500">이웃과 이 내용을 바로 공유합니다.</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">ios_share</span>
                    </button>
                </div>
            </BottomSheet>

            <BottomSheet
                open={sheetMode === 'comments' && Boolean(activePost)}
                onClose={closePostSheet}
                title="댓글"
                description={activePost?.content}
                footer={
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={commentDraft}
                            onChange={(event) => setCommentDraft(event.target.value)}
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            placeholder="이웃에게 남길 댓글을 입력해 주세요."
                        />
                        <button type="button" onClick={handleAddComment} className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">
                            등록
                        </button>
                    </div>
                }
            >
                {activeComments.length ? (
                    <div className="space-y-3">
                        {activeComments.map((comment) => (
                            <div key={comment.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{comment.author}</p>
                                    <p className="text-xs text-slate-400">{formatTime(comment.createdAt)}</p>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                        아직 댓글이 없습니다. 첫 댓글로 상황을 보태 주세요.
                    </div>
                )}
            </BottomSheet>

            {isWriting ? (
                <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/40 backdrop-blur-sm">
                    <div className="w-full max-w-[430px] rounded-t-3xl bg-white px-6 pb-8 pt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-slide-up dark:bg-slate-900 dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                        <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate-200 dark:bg-slate-700" />

                        <div className="mb-6 mt-2 flex items-center justify-between">
                            <div>
                                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                                    <span className="material-symbols-outlined text-primary">edit_square</span>
                                    동네 소식 남기기
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">{activeNeighborhood.name} 생활권에 공유됩니다.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsWriting(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <div className="mb-4 hide-scrollbar flex gap-2 overflow-x-auto">
                            {FILTERS.filter((filter) => filter !== '전체').map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setSelectedCategory(filter)}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                        selectedCategory === filter
                                            ? 'bg-primary text-white'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <textarea
                                className="mb-6 h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                                placeholder="주변 이웃에게 지금 필요한 안전 정보나 주의점을 공유해 보세요."
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
                            className={`w-full rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all ${
                                isSubmitting ? 'cursor-not-allowed bg-primary/70' : 'bg-primary shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]'
                            }`}
                        >
                            {isSubmitting ? '게시 중...' : '게시하기'}
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Community
