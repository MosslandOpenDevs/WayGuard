import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomSheet from '../components/feedback/BottomSheet'
import { useToast } from '../components/feedback/ToastProvider'
import { LEGAL_CONTENT } from '../constants/legal'
import { supabase } from '../utils/supabaseClient'

const PUSH_ALERT_KEY = 'wayguard.settings.push-alert'
const SAVED_PLACES_KEY = 'wayguard.settings.saved-places'
const DARK_MODE_KEY = 'wayguard.settings.dark-mode'

const DEFAULT_PLACES = [
    { id: 1, icon: 'home', name: '우리 집', address: '서울 강남구 역삼동 123-4', iconClassName: 'text-primary', bgClassName: 'bg-primary/10' },
    { id: 2, icon: 'work', name: '회사', address: '서울 강남구 테헤란로 152', iconClassName: 'text-blue-600', bgClassName: 'bg-blue-600/10' },
    { id: 3, icon: 'storefront', name: '24시 편의점', address: '서울 강남구 논현로 56', iconClassName: 'text-emerald-500', bgClassName: 'bg-emerald-500/10' },
]

function loadSavedPlaces() {
    try {
        const raw = localStorage.getItem(SAVED_PLACES_KEY)
        return raw ? JSON.parse(raw) : DEFAULT_PLACES
    } catch {
        return DEFAULT_PLACES
    }
}

function Settings() {
    const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))
    const [pushAlert, setPushAlert] = useState(() => localStorage.getItem(PUSH_ALERT_KEY) !== 'off')
    const [userProfile, setUserProfile] = useState({ id: '', nickname: '로딩 중...', email: '' })
    const [places, setPlaces] = useState(() => loadSavedPlaces())
    const [activePlace, setActivePlace] = useState(null)
    const [activeDocKey, setActiveDocKey] = useState(null)
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [draftNickname, setDraftNickname] = useState('')
    const [isSavingProfile, setIsSavingProfile] = useState(false)
    const [isAddingPlace, setIsAddingPlace] = useState(false)
    const [newPlace, setNewPlace] = useState({ name: '', address: '', icon: 'place' })
    const navigate = useNavigate()
    const { showToast } = useToast()

    useEffect(() => {
        localStorage.setItem(PUSH_ALERT_KEY, pushAlert ? 'on' : 'off')
    }, [pushAlert])

    useEffect(() => {
        localStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(places))
    }, [places])

    useEffect(() => {
        localStorage.setItem(DARK_MODE_KEY, darkMode ? 'dark' : 'light')
    }, [darkMode])

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (!session) {
                return
            }

            const nextProfile = {
                id: session.user.id,
                nickname: session.user.user_metadata?.nickname || '우리 동네 지킴이',
                email: session.user.email || '',
            }

            const { data } = await supabase
                .from('profiles')
                .select('nickname')
                .eq('id', session.user.id)
                .maybeSingle()

            if (data?.nickname) {
                nextProfile.nickname = data.nickname
            }

            setUserProfile(nextProfile)
            setDraftNickname(nextProfile.nickname)
        }

        fetchUser()
    }, [])

    const toggleDarkMode = () => {
        const nextDark = !darkMode
        document.documentElement.classList.toggle('dark', nextDark)
        setDarkMode(nextDark)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    const handleSaveProfile = async () => {
        const nickname = draftNickname.trim()
        if (!nickname) {
            showToast({ tone: 'error', title: '닉네임을 입력해 주세요.' })
            return
        }

        setIsSavingProfile(true)
        const { error } = await supabase.from('profiles').upsert({ id: userProfile.id, nickname }, { onConflict: 'id' })
        setIsSavingProfile(false)

        if (error) {
            showToast({
                tone: 'error',
                title: '프로필 저장에 실패했습니다.',
                description: error.message,
            })
            return
        }

        setUserProfile((prev) => ({ ...prev, nickname }))
        setIsEditingProfile(false)
        showToast({
            tone: 'success',
            title: '닉네임이 저장되었습니다.',
        })
    }

    const handleAddPlace = () => {
        if (!newPlace.name.trim() || !newPlace.address.trim()) {
            showToast({
                tone: 'error',
                title: '장소 이름과 주소를 입력해 주세요.',
            })
            return
        }

        const place = {
            id: Date.now(),
            icon: newPlace.icon,
            name: newPlace.name.trim(),
            address: newPlace.address.trim(),
            iconClassName: 'text-amber-600',
            bgClassName: 'bg-amber-500/10',
        }

        setPlaces((current) => [place, ...current])
        setNewPlace({ name: '', address: '', icon: 'place' })
        setIsAddingPlace(false)
        showToast({
            tone: 'success',
            title: '자주 가는 장소가 추가되었습니다.',
        })
    }

    const removePlace = (id) => {
        setPlaces((current) => current.filter((place) => place.id !== id))
        setActivePlace(null)
        showToast({
            tone: 'success',
            title: '저장한 장소를 삭제했습니다.',
        })
    }

    const activeDoc = activeDocKey ? LEGAL_CONTENT[activeDocKey] : null

    const menuItems = useMemo(
        () => [
            { icon: 'description', label: '이용약관', type: 'doc', value: 'terms' },
            { icon: 'lock', label: '개인정보 처리방침', type: 'doc', value: 'privacy' },
            { icon: 'support_agent', label: '고객 지원', type: 'doc', value: 'support' },
            { icon: 'info', label: '앱 버전', type: 'info', value: 'v1.0.0' },
        ],
        [],
    )

    return (
        <>
            <div className="h-full overflow-y-auto px-4 pb-8 pt-4">
                <section className="mb-6">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <span className="material-symbols-outlined text-3xl text-primary">person</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-lg font-bold">{userProfile.nickname}</h3>
                            <p className="truncate text-xs text-slate-400">{userProfile.email}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsEditingProfile(true)}
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                        >
                            수정 <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="mb-3 px-1 text-lg font-bold">앱 설정</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">notifications_active</span>
                                <div>
                                    <p className="text-sm font-bold">푸시 알림</p>
                                    <p className="text-[11px] text-slate-400">위험 구역 진입과 신고 업데이트를 알려줍니다.</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPushAlert((prev) => !prev)}
                                className={`relative h-6 w-11 rounded-full transition-colors ${pushAlert ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                            >
                                <div className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow transition-transform ${pushAlert ? 'translate-x-5' : ''}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">dark_mode</span>
                                <div>
                                    <p className="text-sm font-bold">다크 모드</p>
                                    <p className="text-[11px] text-slate-400">야간 이동 시 화면 눈부심을 줄입니다.</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={toggleDarkMode}
                                className={`relative h-6 w-11 rounded-full transition-colors ${darkMode ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                            >
                                <div className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-5' : ''}`} />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="mb-3 flex items-center justify-between px-1">
                        <h3 className="text-lg font-bold">자주 가는 장소</h3>
                        <button
                            type="button"
                            onClick={() => setIsAddingPlace(true)}
                            className="rounded-lg px-2 py-1 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                        >
                            추가
                        </button>
                    </div>
                    <div className="space-y-4">
                        {places.map((place) => (
                            <button
                                key={place.id}
                                type="button"
                                onClick={() => setActivePlace(place)}
                                className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-colors hover:border-primary/30 dark:border-slate-700 dark:bg-slate-800"
                            >
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${place.bgClassName}`}>
                                    <span className={`material-symbols-outlined ${place.iconClassName}`}>{place.icon}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold">{place.name}</p>
                                    <p className="truncate text-[11px] text-slate-400">{place.address}</p>
                                </div>
                                <span className="material-symbols-outlined text-sm text-slate-300">chevron_right</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="mb-3 px-1 text-lg font-bold">안내</h3>
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => {
                                    if (item.type === 'doc') {
                                        setActiveDocKey(item.value)
                                        return
                                    }

                                    showToast({
                                        title: `현재 버전은 ${item.value}입니다.`,
                                    })
                                }}
                                className="flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                            >
                                <span className="material-symbols-outlined text-xl text-slate-400">{item.icon}</span>
                                <span className="flex-1 text-sm font-medium">{item.label}</span>
                                {item.type === 'info' ? (
                                    <span className="text-xs text-slate-400">{item.value}</span>
                                ) : (
                                    <span className="material-symbols-outlined text-sm text-slate-300">chevron_right</span>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                    로그아웃
                </button>
            </div>

            <BottomSheet
                open={isEditingProfile}
                onClose={() => setIsEditingProfile(false)}
                title="프로필 수정"
                description="동네에서 보일 닉네임을 바꿀 수 있습니다."
                footer={
                    <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={isSavingProfile}
                        className={`w-full rounded-xl py-3 text-sm font-bold text-white ${
                            isSavingProfile ? 'cursor-not-allowed bg-primary/70' : 'bg-primary'
                        }`}
                    >
                        {isSavingProfile ? '저장 중...' : '저장하기'}
                    </button>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="profile-nickname">
                            닉네임
                        </label>
                        <input
                            id="profile-nickname"
                            type="text"
                            value={draftNickname}
                            onChange={(event) => setDraftNickname(event.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            maxLength={12}
                        />
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500 dark:bg-slate-800/70 dark:text-slate-300">
                        이메일은 계정 식별값이라 여기서 변경하지 않고, 커뮤니티와 신고 화면에는 닉네임만 노출됩니다.
                    </div>
                </div>
            </BottomSheet>

            <BottomSheet
                open={isAddingPlace}
                onClose={() => setIsAddingPlace(false)}
                title="장소 추가"
                description="집, 회사, 자주 들르는 안전 거점을 저장할 수 있습니다."
                footer={
                    <button type="button" onClick={handleAddPlace} className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white">
                        장소 저장하기
                    </button>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="place-name">
                            장소 이름
                        </label>
                        <input
                            id="place-name"
                            type="text"
                            value={newPlace.name}
                            onChange={(event) => setNewPlace((prev) => ({ ...prev, name: event.target.value }))}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            placeholder="예: 엄마 집, 학원, 편의점"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="place-address">
                            주소
                        </label>
                        <input
                            id="place-address"
                            type="text"
                            value={newPlace.address}
                            onChange={(event) => setNewPlace((prev) => ({ ...prev, address: event.target.value }))}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            placeholder="예: 서울 강남구 ..."
                        />
                    </div>
                </div>
            </BottomSheet>

            <BottomSheet
                open={Boolean(activePlace)}
                onClose={() => setActivePlace(null)}
                title={activePlace?.name}
                description={activePlace?.address}
                footer={
                    activePlace ? (
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard?.writeText(activePlace.address)
                                    showToast({ tone: 'success', title: '주소를 복사했습니다.' })
                                }}
                                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                            >
                                주소 복사
                            </button>
                            <button
                                type="button"
                                onClick={() => removePlace(activePlace.id)}
                                className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white"
                            >
                                장소 삭제
                            </button>
                        </div>
                    ) : null
                }
            >
                {activePlace ? (
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">안심 메모</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                자주 이동하는 장소는 저장해 두고, 야간 귀가 시작 전 목적지로 빠르게 설정할 수 있습니다.
                            </p>
                        </div>
                    </div>
                ) : null}
            </BottomSheet>

            <BottomSheet
                open={Boolean(activeDoc)}
                onClose={() => setActiveDocKey(null)}
                title={activeDoc?.title}
                description={activeDoc?.description}
            >
                <div className="space-y-4">
                    {activeDoc?.sections.map((section) => (
                        <section key={section.heading} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{section.heading}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{section.body}</p>
                        </section>
                    ))}
                </div>
            </BottomSheet>
        </>
    )
}

export default Settings
