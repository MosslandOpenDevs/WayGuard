const COMMUNITY_INTERACTION_SETUP_MESSAGE =
    '커뮤니티 좋아요와 댓글을 사용하려면 community_interactions_supabase.sql을 Supabase에서 먼저 실행해 주세요.'

function mapBasePost(post) {
    return {
        ...post,
        likeCount: Number(post.danger_count) || 0,
        commentCount: 0,
        isLiked: false,
        comments: [],
    }
}

function normalizeComment(comment) {
    return {
        id: comment.id,
        author: comment.profiles?.nickname || '익명 사용자',
        content: comment.content,
        createdAt: comment.created_at,
    }
}

function isMissingCommunityInteractionSchema(error) {
    if (!error) {
        return false
    }

    const normalizedMessage = `${error.message || ''} ${error.details || ''}`

    return (
        ['42P01', '42703', 'PGRST200', 'PGRST205'].includes(error.code) ||
        /community_post_(likes|comments)/i.test(normalizedMessage) ||
        /relationship/i.test(normalizedMessage)
    )
}

function createInteractionSetupError(error) {
    const wrappedError = new Error(COMMUNITY_INTERACTION_SETUP_MESSAGE)
    wrappedError.cause = error
    return wrappedError
}

export async function fetchCommunityFeed(supabase, userId = null) {
    const { data: posts, error: postsError } = await supabase
        .from('safety_feed')
        .select(`
            *,
            profiles (
                nickname,
                level
            )
        `)
        .order('created_at', { ascending: false })

    if (postsError) {
        throw postsError
    }

    if (!posts?.length) {
        return []
    }

    const postIds = posts.map((post) => post.id)

    const [{ data: likes, error: likesError }, { data: comments, error: commentsError }] = await Promise.all([
        supabase.from('community_post_likes').select('post_id, user_id').in('post_id', postIds),
        supabase
            .from('community_post_comments')
            .select(`
                id,
                post_id,
                content,
                created_at,
                profiles (
                    nickname
                )
            `)
            .in('post_id', postIds)
            .order('created_at', { ascending: true }),
    ])

    if (likesError || commentsError) {
        if (isMissingCommunityInteractionSchema(likesError || commentsError)) {
            return posts.map(mapBasePost)
        }

        throw likesError || commentsError
    }

    const likeCountMap = new Map()
    const likedPostIds = new Set()

    for (const like of likes || []) {
        likeCountMap.set(like.post_id, (likeCountMap.get(like.post_id) || 0) + 1)

        if (userId && like.user_id === userId) {
            likedPostIds.add(like.post_id)
        }
    }

    const commentsByPostId = new Map()

    for (const comment of comments || []) {
        const nextComments = commentsByPostId.get(comment.post_id) || []
        nextComments.push(normalizeComment(comment))
        commentsByPostId.set(comment.post_id, nextComments)
    }

    return posts.map((post) => {
        const postComments = commentsByPostId.get(post.id) || []

        return {
            ...post,
            likeCount: (Number(post.danger_count) || 0) + (likeCountMap.get(post.id) || 0),
            commentCount: postComments.length,
            isLiked: likedPostIds.has(post.id),
            comments: postComments,
        }
    })
}

export async function createCommunityPost(supabase, post) {
    const { error } = await supabase.from('safety_feed').insert([post])

    if (error) {
        throw error
    }
}

export async function toggleCommunityPostLike(supabase, postId, userId, shouldLike) {
    const request = shouldLike
        ? supabase.from('community_post_likes').insert([{ post_id: postId, user_id: userId }])
        : supabase.from('community_post_likes').delete().eq('post_id', postId).eq('user_id', userId)

    const { error } = await request

    if (!error || (shouldLike && error.code === '23505')) {
        return
    }

    if (isMissingCommunityInteractionSchema(error)) {
        throw createInteractionSetupError(error)
    }

    throw error
}

export async function createCommunityComment(supabase, postId, userId, content) {
    const { data, error } = await supabase
        .from('community_post_comments')
        .insert([{ post_id: postId, user_id: userId, content }])
        .select(`
            id,
            post_id,
            content,
            created_at,
            profiles (
                nickname
            )
        `)
        .single()

    if (error) {
        if (isMissingCommunityInteractionSchema(error)) {
            throw createInteractionSetupError(error)
        }

        throw error
    }

    return normalizeComment(data)
}
