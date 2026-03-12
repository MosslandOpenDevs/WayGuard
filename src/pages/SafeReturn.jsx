import { useEffect, useMemo, useState } from 'react'
import { useToast } from '../components/feedback/ToastProvider'
import {
    fetchSafeReturnProfile,
    finishSafeReturnSession,
    getActiveSafeReturnSession,
    saveSafeReturnProfile,
    startSafeReturnSession,
    syncSafeReturnSessionLocation,
} from '../services/safeReturn'
import { supabase } from '../utils/supabaseClient'

const UI = {
    locationUnavailableTitle: '\uD604\uC7AC \uC704\uCE58\uB97C \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    locationUnavailableDescription: '\uC704\uCE58 \uAD8C\uD55C\uC744 \uD5C8\uC6A9\uD574\uC57C \uBCF4\uD638\uC790\uC5D0\uAC8C \uCD5C\uC2E0 \uC704\uCE58\uAC00 \uACF5\uC720\uB429\uB2C8\uB2E4.',
    destinationRequired: '\uBAA9\uC801\uC9C0 \uC774\uB984\uACFC \uC8FC\uC18C\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.',
    profileSavedTitle: '\uC548\uC2EC \uADC0\uAC00 \uC124\uC815\uC744 \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4.',
    profileSavedRemote: 'Supabase\uC5D0\uB3C4 \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    profileSavedLocal: '\uD604\uC7AC \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    guardianRequired: '\uBCF4\uD638\uC790 \uC5F0\uB77D\uCC98\uB97C \uCD5C\uC18C 1\uBA85 \uB4F1\uB85D\uD574 \uC8FC\uC138\uC694.',
    startLocationFailedTitle: '\uD604\uC7AC \uC704\uCE58\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.',
    startLocationFailedDescription: '\uADC0\uAC00 \uC138\uC158\uC740 \uC2DC\uC791\uB418\uC9C0\uB9CC \uC2E4\uC2DC\uAC04 \uACF5\uC720 \uC815\uBCF4\uAC00 \uC81C\uD55C\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    startTitle: '\uC548\uC2EC \uADC0\uAC00\uB97C \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4.',
    startRemote: '\uADC0\uAC00 \uC138\uC158\uC774 Supabase\uC5D0 \uAE30\uB85D\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    startLocal: '\uADC0\uAC00 \uC138\uC158\uC774 \uD604\uC7AC \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    finishTitle: '\uB3C4\uCC29 \uCC98\uB9AC\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    finishRemote: '\uADC0\uAC00 \uC138\uC158\uC774 \uC885\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    finishLocal: '\uB85C\uCEEC \uC138\uC158\uC744 \uC885\uB8CC\uD588\uC2B5\uB2C8\uB2E4.',
    loading: '\uC548\uC2EC \uADC0\uAC00 \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911...',
    activeLabel: '\uADC0\uAC00 \uC911...',
    startButton: '\uADC0\uAC00 \uC2DC\uC791',
    activeHeading: '\uC548\uC2EC \uADC0\uAC00 \uC9C4\uD589 \uC911',
    idleHeading: '\uC548\uC2EC \uADC0\uAC00 \uBAA8\uB4DC',
    activeDescription: '\uB4F1\uB85D\uD55C \uBCF4\uD638\uC790\uC5D0\uAC8C \uD604\uC7AC \uADC0\uAC00 \uC0C1\uD0DC\uB97C \uACF5\uC720\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.',
    idleDescription: '\uBAA9\uC801\uC9C0\uC640 \uBCF4\uD638\uC790 \uC5F0\uB77D\uCC98\uB97C \uC800\uC7A5\uD55C \uB4A4 \uC548\uC2EC \uADC0\uAC00\uB97C \uC2DC\uC791\uD574 \uBCF4\uC138\uC694.',
    destinationSection: '\uBAA9\uC801\uC9C0',
    destinationSectionDescription: '\uB3C4\uCC29\uD560 \uC7A5\uC18C\uB97C \uC800\uC7A5\uD574 \uB450\uC138\uC694',
    destinationPlaceholder: '\uC608: \uC6B0\uB9AC \uC9D1',
    destinationAddressPlaceholder: '\uC608: \uC11C\uC6B8 \uAC15\uB0A8\uAD6C \uC5ED\uC0BC\uB3D9 123-4',
    alertThreshold: '\uBBF8\uB3C4\uCC29 \uC54C\uB9BC \uAE30\uC900 \uC2DC\uAC04',
    saveButton: '\uC548\uC2EC \uADC0\uAC00 \uC124\uC815 \uC800\uC7A5',
    savingButton: '\uC800\uC7A5 \uC911...',
    contactsSection: '\uBCF4\uD638\uC790 \uC5F0\uB77D\uCC98',
    addContact: '\uC5F0\uB77D\uCC98 \uCD94\uAC00',
    guardian: '\uBCF4\uD638\uC790',
    remove: '\uC0AD\uC81C',
    namePlaceholder: '\uC774\uB984',
    locationShareStatus: '\uC2E4\uC2DC\uAC04 \uC704\uCE58\n\uACF5\uC720 \uC0C1\uD0DC',
    alertThresholdCard: '\uBBF8\uB3C4\uCC29 \uC54C\uB9BC\n\uAE30\uC900',
    connected: '\uC5F0\uACB0\uB428',
    waiting: '\uB300\uAE30 \uC911',
    emergencyNeedsStart: '\uBA3C\uC800 \uC548\uC2EC \uADC0\uAC00\uB97C \uC2DC\uC791\uD574 \uC8FC\uC138\uC694.',
    emergencyRecordedTitle: '\uAE34\uAE09 \uC0C1\uD0DC\uB85C \uAE30\uB85D\uD588\uC2B5\uB2C8\uB2E4.',
    emergencyRecordedDescription: '\uC2E4\uC81C \uBB38\uC790 \uBC1C\uC1A1\uC740 \uB2E4\uC74C \uB2E8\uACC4\uC5D0\uC11C \uC5F0\uACB0\uD569\uB2C8\uB2E4.',
    emergencyLabel: '\uAE34\uAE09 SOS\n\uAE30\uB85D',
    tripStatus: '\uD604\uC7AC \uADC0\uAC00 \uC0C1\uD0DC',
    moving: '\uC774\uB3D9 \uC911',
    arrived: '\uB3C4\uCC29 \uC644\uB8CC',
    idle: '\uB300\uAE30 \uC911',
    destinationRow: '\uBAA9\uC801\uC9C0',
    addressRow: '\uC8FC\uC18C',
    elapsedRow: '\uACBD\uACFC \uC2DC\uAC04',
    lastLocationRow: '\uB9C8\uC9C0\uB9C9 \uC704\uCE58',
    lastLocationEmpty: '\uC544\uC9C1 \uD655\uC778\uB418\uC9C0 \uC54A\uC74C',
}

function SafeReturn() {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState({
        destinationName: '',
        destinationAddress: '',
        alertAfterMinutes: 30,
        contacts: [],
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [routeStatus, setRouteStatus] = useState('idle')
    const [elapsedTime, setElapsedTime] = useState(0)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [profileSource, setProfileSource] = useState('local')
    const [sessionSource, setSessionSource] = useState('local')
    const { showToast } = useToast()

    const isActive = routeStatus === 'active'

    useEffect(() => {
        let mounted = true

        const initialize = async () => {
            const { data: { session: authSession } } = await supabase.auth.getSession()
            const userId = authSession?.user?.id || null
            const profileResult = await fetchSafeReturnProfile(supabase, userId)
            const activeSession = getActiveSafeReturnSession()

            if (!mounted) {
                return
            }

            setProfile(profileResult.profile)
            setProfileSource(profileResult.source)
            if (activeSession?.status === 'active') {
                setSession(activeSession)
                setSessionSource(activeSession.id ? 'remote' : 'local')
                setRouteStatus('active')
                setElapsedTime(Math.max(0, Math.floor((Date.now() - new Date(activeSession.startedAt).getTime()) / 1000)))
                if (activeSession.lastLatitude && activeSession.lastLongitude) {
                    setCurrentLocation({
                        lat: activeSession.lastLatitude,
                        lng: activeSession.lastLongitude,
                    })
                }
            }
            setIsLoading(false)
        }

        initialize()

        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        if (!isActive) {
            return undefined
        }

        const timer = window.setInterval(() => {
            setElapsedTime((prev) => prev + 1)
        }, 1000)

        return () => window.clearInterval(timer)
    }, [isActive])

    useEffect(() => {
        if (!isActive || !navigator.geolocation) {
            return undefined
        }

        const syncLocation = () => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const nextLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }

                    setCurrentLocation(nextLocation)
                    setSession((current) => {
                        if (!current) {
                            return current
                        }

                        const nextSession = {
                            ...current,
                            lastLatitude: nextLocation.lat,
                            lastLongitude: nextLocation.lng,
                        }

                        void syncSafeReturnSessionLocation(supabase, nextSession)
                        return nextSession
                    })
                },
                () => {
                    showToast({
                        tone: 'error',
                        title: UI.locationUnavailableTitle,
                        description: UI.locationUnavailableDescription,
                    })
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                    timeout: 5000,
                },
            )
        }

        syncLocation()
        const interval = window.setInterval(syncLocation, 30000)
        return () => window.clearInterval(interval)
    }, [isActive, showToast])

    const progress = useMemo(() => {
        const alertSeconds = Math.max(1, Number(profile.alertAfterMinutes) * 60)
        return Math.min(100, Math.round((elapsedTime / alertSeconds) * 100))
    }, [elapsedTime, profile.alertAfterMinutes])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
        const remainSeconds = (seconds % 60).toString().padStart(2, '0')
        return `${minutes}:${remainSeconds}`
    }

    const updateContact = (id, field, value) => {
        setProfile((current) => ({
            ...current,
            contacts: current.contacts.map((contact) => (contact.id === id ? { ...contact, [field]: value } : contact)),
        }))
    }

    const addContact = () => {
        setProfile((current) => ({
            ...current,
            contacts: [...current.contacts, { ...EMPTY_CONTACT, id: Date.now() }],
        }))
    }

    const removeContact = (id) => {
        setProfile((current) => ({
            ...current,
            contacts: current.contacts.filter((contact) => contact.id !== id),
        }))
    }

    const handleSaveProfile = async () => {
        if (!profile.destinationName.trim() || !profile.destinationAddress.trim()) {
            showToast({
                tone: 'error',
                title: UI.destinationRequired,
            })
            return
        }

        setIsSaving(true)
        const { data: { session: authSession } } = await supabase.auth.getSession()
        const result = await saveSafeReturnProfile(supabase, authSession?.user?.id || null, profile)
        setProfile(result.profile)
        setProfileSource(result.source)
        setIsSaving(false)

        showToast({
            tone: 'success',
            title: UI.profileSavedTitle,
            description: result.source === 'remote' ? UI.profileSavedRemote : UI.profileSavedLocal,
        })
    }

    const handleToggleSafeReturn = async () => {
        const { data: { session: authSession } } = await supabase.auth.getSession()
        const userId = authSession?.user?.id || null

        if (!isActive) {
            if (!profile.contacts.some((contact) => contact.name.trim() && contact.phone.trim())) {
                showToast({
                    tone: 'error',
                    title: UI.guardianRequired,
                })
                return
            }

            let nextLocation = currentLocation

            if (navigator.geolocation) {
                try {
                    nextLocation = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
                            reject,
                            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 },
                        )
                    })
                    setCurrentLocation(nextLocation)
                } catch {
                    showToast({
                        tone: 'error',
                        title: UI.startLocationFailedTitle,
                        description: UI.startLocationFailedDescription,
                    })
                }
            }

            const result = await startSafeReturnSession(supabase, userId, {
                destinationName: profile.destinationName,
                destinationAddress: profile.destinationAddress,
                alertAfterMinutes: profile.alertAfterMinutes,
                contacts: profile.contacts,
                lastLatitude: nextLocation?.lat || null,
                lastLongitude: nextLocation?.lng || null,
            })

            setSession(result.session)
            setSessionSource(result.source)
            setRouteStatus('active')
            setElapsedTime(0)
            showToast({
                tone: 'success',
                title: UI.startTitle,
                description: result.source === 'remote' ? UI.startRemote : UI.startLocal,
            })
            return
        }

        const result = await finishSafeReturnSession(supabase, session, 'arrived')
        setSession(null)
        setSessionSource(result.source)
        setRouteStatus('arrived')
        setElapsedTime(0)
        showToast({
            tone: 'success',
            title: UI.finishTitle,
            description: result.source === 'remote' ? UI.finishRemote : UI.finishLocal,
        })
    }

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
                {UI.loading}
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24">
            <div className="flex flex-col items-center justify-center overflow-hidden px-6 pb-8 pt-12 text-center">
                <div className="relative mb-8 flex h-64 w-64 items-center justify-center">
                    {isActive && (
                        <>
                            <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                            <div className="absolute inset-4 rounded-full border border-emerald-500/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                            <div className="absolute inset-8 rounded-full border border-emerald-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
                        </>
                    )}

                    {!isActive && <div className="absolute inset-4 rounded-full bg-primary/5"></div>}

                    <button
                        type="button"
                        onClick={handleToggleSafeReturn}
                        className={`relative z-10 flex h-44 w-44 flex-col items-center justify-center rounded-full text-white shadow-2xl transition-all duration-500 active:scale-95 ${isActive ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/40' : 'bg-gradient-to-br from-primary to-blue-600 shadow-primary/40'}`}
                    >
                        <span className={`material-symbols-outlined mb-2 text-6xl transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            {isActive ? 'shield_with_heart' : 'shield_person'}
                        </span>
                        <span className="text-lg font-bold tracking-tight">
                            {isActive ? (
                                <div className="flex flex-col items-center">
                                    <span className="mb-1 text-sm font-medium opacity-90">{UI.activeLabel}</span>
                                    <span className="font-mono text-xl leading-none tracking-widest">{formatTime(elapsedTime)}</span>
                                </div>
                            ) : (
                                UI.startButton
                            )}
                        </span>
                    </button>
                </div>

                <h2 className="mb-2 text-2xl font-bold transition-colors duration-300">
                    {isActive ? <span className="text-emerald-500 dark:text-emerald-400">{UI.activeHeading}</span> : UI.idleHeading}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isActive ? UI.activeDescription : UI.idleDescription}
                </p>
            </div>

            <div className="mb-6 px-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                    <div className="mb-3 flex items-center justify-between">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${profileSource === 'remote' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}`}>
                            {profileSource === 'remote' ? 'Supabase 저장됨' : '로컬 저장 중'}
                        </span>
                    </div>
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary">
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{UI.destinationSection}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{UI.destinationSectionDescription}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <input
                            type="text"
                            value={profile.destinationName}
                            onChange={(event) => setProfile((current) => ({ ...current, destinationName: event.target.value }))}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900"
                            placeholder={UI.destinationPlaceholder}
                        />
                        <input
                            type="text"
                            value={profile.destinationAddress}
                            onChange={(event) => setProfile((current) => ({ ...current, destinationAddress: event.target.value }))}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900"
                            placeholder={UI.destinationAddressPlaceholder}
                        />
                        <div>
                            <label className="mb-2 block text-xs font-bold text-slate-500">{UI.alertThreshold}</label>
                            <input
                                type="range"
                                min="10"
                                max="90"
                                step="5"
                                value={profile.alertAfterMinutes}
                                onChange={(event) => setProfile((current) => ({ ...current, alertAfterMinutes: Number(event.target.value) }))}
                                className="w-full"
                            />
                            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                                <span>10분</span>
                                <span>{profile.alertAfterMinutes}분</span>
                                <span>90분</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className={`w-full rounded-xl py-3 text-sm font-bold text-white transition-all ${isSaving ? 'cursor-not-allowed bg-primary/70' : 'bg-primary active:scale-[0.98]'}`}
                        >
                            {isSaving ? UI.savingButton : UI.saveButton}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-8 px-4">
                <div className="mb-4 flex items-center justify-between px-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{UI.contactsSection}</h3>
                    <button
                        type="button"
                        onClick={addContact}
                        className="text-xs font-bold text-primary transition-colors hover:opacity-80"
                    >
                        {UI.addContact}
                    </button>
                </div>
                <div className="space-y-3">
                    {profile.contacts.map((contact, index) => (
                        <div key={contact.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{`${UI.guardian} ${index + 1}`}</span>
                                {profile.contacts.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeContact(contact.id)}
                                        className="text-xs font-bold text-red-500"
                                    >
                                        {UI.remove}
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <input
                                    type="text"
                                    value={contact.name}
                                    onChange={(event) => updateContact(contact.id, 'name', event.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900"
                                    placeholder={UI.namePlaceholder}
                                />
                                <input
                                    type="tel"
                                    value={contact.phone}
                                    onChange={(event) => updateContact(contact.id, 'phone', event.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-900"
                                    placeholder="010-0000-0000"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8 px-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                        <span className="material-symbols-outlined text-2xl text-blue-500">share_location</span>
                        <p className="mt-2 whitespace-pre-line text-[11px] font-bold leading-tight text-slate-700 dark:text-slate-300">{UI.locationShareStatus}</p>
                        <p className="mt-2 text-xs font-semibold text-slate-500">
                            {currentLocation ? UI.connected : UI.waiting}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                        <span className="material-symbols-outlined text-2xl text-amber-500">notifications_active</span>
                        <p className="mt-2 whitespace-pre-line text-[11px] font-bold leading-tight text-slate-700 dark:text-slate-300">{UI.alertThresholdCard}</p>
                        <p className="mt-2 text-xs font-semibold text-slate-500">{profile.alertAfterMinutes}분</p>
                    </div>
                    <button
                        type="button"
                        onClick={async () => {
                            if (!session && !isActive) {
                                showToast({
                                    tone: 'error',
                                    title: UI.emergencyNeedsStart,
                                })
                                return
                            }
                            const result = await finishSafeReturnSession(supabase, session, 'emergency')
                            setSession(null)
                            setSessionSource(result.source)
                            setRouteStatus('idle')
                            setElapsedTime(0)
                            showToast({
                                tone: 'success',
                                title: UI.emergencyRecordedTitle,
                                description: UI.emergencyRecordedDescription,
                            })
                        }}
                        className="rounded-2xl border border-red-100 bg-red-50 p-4 text-center shadow-sm transition-transform active:scale-95 dark:border-red-900/50 dark:bg-red-900/20"
                    >
                        <span className="material-symbols-outlined animate-pulse text-2xl text-red-600 dark:text-red-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                            emergency
                        </span>
                        <p className="mt-2 whitespace-pre-line text-[11px] font-bold leading-tight text-red-700 dark:text-red-400">{UI.emergencyLabel}</p>
                    </button>
                </div>
            </div>

            <div className="px-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{UI.tripStatus}</h3>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'}`}>
                            {isActive ? UI.moving : routeStatus === 'arrived' ? UI.arrived : UI.idle}
                        </span>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${sessionSource === 'remote' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}`}>
                            {sessionSource === 'remote' ? '세션 Supabase 저장됨' : '세션 로컬 저장 중'}
                        </span>
                    </div>
                    <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="space-y-2 text-sm text-slate-500">
                        <p>{UI.destinationRow}: <span className="font-semibold text-slate-700 dark:text-slate-200">{profile.destinationName}</span></p>
                        <p>{UI.addressRow}: <span className="font-semibold text-slate-700 dark:text-slate-200">{profile.destinationAddress}</span></p>
                        <p>{UI.elapsedRow}: <span className="font-semibold text-slate-700 dark:text-slate-200">{formatTime(elapsedTime)}</span></p>
                        <p>
                            {UI.lastLocationRow}:{' '}
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                {currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : UI.lastLocationEmpty}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SafeReturn
