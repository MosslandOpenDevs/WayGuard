const SAFE_RETURN_PROFILE_KEY = 'wayguard.safe-return.profile'
const SAFE_RETURN_SESSION_KEY = 'wayguard.safe-return.session'

const DEFAULT_PROFILE = {
    destinationName: '\uC6B0\uB9AC \uC9D1',
    destinationAddress: '\uC11C\uC6B8 \uAC15\uB0A8\uAD6C \uC5ED\uC0BC\uB3D9',
    alertAfterMinutes: 30,
    contacts: [
        { id: 1, name: '\uC5C4\uB9C8', phone: '010-1234-5678' },
        { id: 2, name: '\uCE5C\uAD6C \uBBFC\uC218', phone: '010-9876-5432' },
    ],
}

function normalizeContacts(contacts = []) {
    return contacts
        .filter((contact) => contact.name?.trim() || contact.phone?.trim())
        .map((contact, index) => ({
            id: contact.id ?? Date.now() + index,
            name: contact.name?.trim() || '',
            phone: contact.phone?.trim() || '',
        }))
}

function loadLocalProfile() {
    try {
        const raw = localStorage.getItem(SAFE_RETURN_PROFILE_KEY)
        if (!raw) {
            return DEFAULT_PROFILE
        }

        const parsed = JSON.parse(raw)
        return {
            destinationName: parsed.destinationName || DEFAULT_PROFILE.destinationName,
            destinationAddress: parsed.destinationAddress || DEFAULT_PROFILE.destinationAddress,
            alertAfterMinutes: Number(parsed.alertAfterMinutes) || DEFAULT_PROFILE.alertAfterMinutes,
            contacts: normalizeContacts(parsed.contacts).length ? normalizeContacts(parsed.contacts) : DEFAULT_PROFILE.contacts,
        }
    } catch {
        return DEFAULT_PROFILE
    }
}

function saveLocalProfile(profile) {
    localStorage.setItem(
        SAFE_RETURN_PROFILE_KEY,
        JSON.stringify({
            ...profile,
            contacts: normalizeContacts(profile.contacts),
        }),
    )
}

function saveLocalSession(session) {
    localStorage.setItem(SAFE_RETURN_SESSION_KEY, JSON.stringify(session))
}

function clearLocalSession() {
    localStorage.removeItem(SAFE_RETURN_SESSION_KEY)
}

export function getActiveSafeReturnSession() {
    try {
        const raw = localStorage.getItem(SAFE_RETURN_SESSION_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export async function fetchSafeReturnProfile(supabase, userId) {
    const fallbackProfile = loadLocalProfile()

    if (!userId) {
        return { profile: fallbackProfile, source: 'local' }
    }

    try {
        const [{ data: profileRow, error: profileError }, { data: contactRows, error: contactsError }] = await Promise.all([
            supabase.from('safe_return_profiles').select('*').eq('user_id', userId).maybeSingle(),
            supabase.from('safe_return_contacts').select('*').eq('user_id', userId).order('priority', { ascending: true }),
        ])

        if (profileError || contactsError) {
            throw profileError || contactsError
        }

        const profile = {
            destinationName: profileRow?.destination_name || fallbackProfile.destinationName,
            destinationAddress: profileRow?.destination_address || fallbackProfile.destinationAddress,
            alertAfterMinutes: Number(profileRow?.alert_after_minutes) || fallbackProfile.alertAfterMinutes,
            contacts: normalizeContacts(
                (contactRows || []).map((contact) => ({
                    id: contact.id,
                    name: contact.name,
                    phone: contact.phone,
                })),
            ),
        }

        if (!profile.contacts.length) {
            profile.contacts = fallbackProfile.contacts
        }

        saveLocalProfile(profile)
        return { profile, source: 'remote' }
    } catch {
        return { profile: fallbackProfile, source: 'local' }
    }
}

export async function saveSafeReturnProfile(supabase, userId, profile) {
    const normalizedProfile = {
        destinationName: profile.destinationName?.trim() || DEFAULT_PROFILE.destinationName,
        destinationAddress: profile.destinationAddress?.trim() || DEFAULT_PROFILE.destinationAddress,
        alertAfterMinutes: Number(profile.alertAfterMinutes) || DEFAULT_PROFILE.alertAfterMinutes,
        contacts: normalizeContacts(profile.contacts),
    }

    saveLocalProfile(normalizedProfile)

    if (!userId) {
        return { profile: normalizedProfile, source: 'local' }
    }

    try {
        const profilePayload = {
            user_id: userId,
            destination_name: normalizedProfile.destinationName,
            destination_address: normalizedProfile.destinationAddress,
            alert_after_minutes: normalizedProfile.alertAfterMinutes,
            updated_at: new Date().toISOString(),
        }

        const contactsPayload = normalizedProfile.contacts.map((contact, index) => ({
            user_id: userId,
            name: contact.name,
            phone: contact.phone,
            priority: index + 1,
        }))

        const upsertProfile = supabase.from('safe_return_profiles').upsert(profilePayload, { onConflict: 'user_id' })
        const refreshContacts = supabase.from('safe_return_contacts').delete().eq('user_id', userId)

        const [{ error: profileError }, { error: deleteError }] = await Promise.all([upsertProfile, refreshContacts])

        if (profileError || deleteError) {
            throw profileError || deleteError
        }

        if (contactsPayload.length) {
            const { error: insertError } = await supabase.from('safe_return_contacts').insert(contactsPayload)
            if (insertError) {
                throw insertError
            }
        }

        return { profile: normalizedProfile, source: 'remote' }
    } catch {
        return { profile: normalizedProfile, source: 'local' }
    }
}

export async function startSafeReturnSession(supabase, userId, sessionInput) {
    const payload = {
        ...sessionInput,
        startedAt: sessionInput.startedAt || new Date().toISOString(),
        status: 'active',
    }

    saveLocalSession(payload)

    if (!userId) {
        return { session: payload, source: 'local' }
    }

    try {
        const { data, error } = await supabase
            .from('safe_return_sessions')
            .insert({
                user_id: userId,
                destination_name: payload.destinationName,
                destination_address: payload.destinationAddress,
                status: payload.status,
                alert_after_minutes: payload.alertAfterMinutes,
                started_at: payload.startedAt,
                last_latitude: payload.lastLatitude,
                last_longitude: payload.lastLongitude,
            })
            .select()
            .single()

        if (error) {
            throw error
        }

        const stored = { ...payload, id: data.id }
        saveLocalSession(stored)
        return { session: stored, source: 'remote' }
    } catch {
        return { session: payload, source: 'local' }
    }
}

export async function syncSafeReturnSessionLocation(supabase, session) {
    saveLocalSession(session)

    if (!session?.id) {
        return
    }

    await supabase
        .from('safe_return_sessions')
        .update({
            last_latitude: session.lastLatitude,
            last_longitude: session.lastLongitude,
            updated_at: new Date().toISOString(),
        })
        .eq('id', session.id)
}

export async function finishSafeReturnSession(supabase, session, status = 'arrived') {
    clearLocalSession()

    if (!session?.id) {
        return { source: 'local' }
    }

    try {
        const { error } = await supabase
            .from('safe_return_sessions')
            .update({
                status,
                ended_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                last_latitude: session.lastLatitude,
                last_longitude: session.lastLongitude,
            })
            .eq('id', session.id)

        if (error) {
            throw error
        }

        return { source: 'remote' }
    } catch {
        return { source: 'local' }
    }
}
