export async function fetchCommunityFeed(supabase) {
    const { data, error } = await supabase
        .from('safety_feed')
        .select(`
            *,
            profiles (
                nickname,
                level
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data || [];
}

export async function createCommunityPost(supabase, post) {
    const { error } = await supabase.from('safety_feed').insert([post]);

    if (error) {
        throw error;
    }
}
