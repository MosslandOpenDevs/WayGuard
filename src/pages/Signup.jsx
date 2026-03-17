import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomSheet from '../components/feedback/BottomSheet'
import { useToast } from '../components/feedback/ToastProvider'
import { LEGAL_CONTENT } from '../constants/legal'
import { isSupabaseConfigured, supabase, supabaseAuthSetupMessage } from '../utils/supabaseClient'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [activeDoc, setActiveDoc] = useState(null)
    const navigate = useNavigate()
    const { showToast } = useToast()

    const handleSignup = async (event) => {
        event.preventDefault()
        setErrorMsg('')

        if (!isSupabaseConfigured) {
            setErrorMsg(supabaseAuthSetupMessage)
            showToast({
                tone: 'error',
                title: '회원가입 설정이 필요합니다.',
                description: supabaseAuthSetupMessage,
            })
            return
        }

        if (!email || !password || !nickname) {
            setErrorMsg('모든 항목을 입력해 주세요.')
            return
        }

        if (password !== passwordConfirm) {
            setErrorMsg('비밀번호가 일치하지 않습니다.')
            return
        }

        if (password.length < 6) {
            setErrorMsg('비밀번호는 6자 이상이어야 합니다.')
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nickname,
                },
            },
        })
        setLoading(false)

        if (error) {
            console.error('Signup error:', error)

            if (error.message.includes('already registered')) {
                setErrorMsg('이미 가입된 이메일입니다.')
            } else {
                setErrorMsg('회원가입 중 오류가 발생했습니다.')
            }

            showToast({
                tone: 'error',
                title: '회원가입에 실패했습니다.',
                description: error.message,
            })
            return
        }

        showToast({
            tone: 'success',
            title: '회원가입이 완료되었습니다.',
            description: '이제 로그인해 주세요.',
        })
        navigate('/login')
    }

    const doc = activeDoc ? LEGAL_CONTENT[activeDoc] : null

    return (
        <>
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-10">
                <div className="mb-8">
                    <Link to="/login" className="mb-6 inline-flex items-center text-slate-400 transition-colors hover:text-slate-600">
                        <span className="material-symbols-outlined mr-1">arrow_back</span>
                        <span className="text-sm font-bold">돌아가기</span>
                    </Link>
                    <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">회원가입</h1>
                    <p className="text-sm text-slate-500">동네 안전 기록과 안심 귀가 기능을 바로 사용할 수 있어요.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    {!isSupabaseConfigured ? (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-900/60 dark:bg-amber-900/20 dark:text-amber-300">
                            {supabaseAuthSetupMessage}
                        </div>
                    ) : null}

                    {errorMsg ? (
                        <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            {errorMsg}
                        </div>
                    ) : null}

                    <div>
                        <label className="mb-1 ml-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="signup-email">
                            이메일
                        </label>
                        <input
                            id="signup-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label className="mb-1 ml-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="signup-nickname">
                            닉네임
                        </label>
                        <input
                            id="signup-nickname"
                            type="text"
                            value={nickname}
                            onChange={(event) => setNickname(event.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                            placeholder="이웃에게 보일 이름을 입력해 주세요."
                            maxLength={10}
                        />
                    </div>

                    <div>
                        <label className="mb-1 ml-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="signup-password">
                            비밀번호
                        </label>
                        <input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                            placeholder="6자 이상 비밀번호를 입력해 주세요."
                        />
                    </div>

                    <div>
                        <label className="mb-1 ml-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="signup-password-confirm">
                            비밀번호 확인
                        </label>
                        <input
                            id="signup-password-confirm"
                            type="password"
                            value={passwordConfirm}
                            onChange={(event) => setPasswordConfirm(event.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                            placeholder="비밀번호를 다시 입력해 주세요."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading || !isSupabaseConfigured}
                            className={`w-full rounded-xl py-4 font-bold text-white transition-all ${
                                loading || !isSupabaseConfigured ? 'cursor-not-allowed bg-primary/70' : 'bg-primary shadow-lg shadow-primary/30 active:scale-[0.98]'
                            }`}
                        >
                            {loading ? '가입 중...' : '가입하기'}
                        </button>
                    </div>
                </form>

                <p className="mx-auto mt-8 max-w-[300px] text-center text-xs leading-relaxed text-slate-400">
                    가입하면 WayGuard의{' '}
                    <button type="button" onClick={() => setActiveDoc('terms')} className="underline transition-colors hover:text-primary">
                        이용약관
                    </button>
                    {' '}및{' '}
                    <button type="button" onClick={() => setActiveDoc('privacy')} className="underline transition-colors hover:text-primary">
                        개인정보 처리방침
                    </button>
                    에 동의한 것으로 봅니다.
                </p>
            </div>

            <BottomSheet
                open={Boolean(doc)}
                onClose={() => setActiveDoc(null)}
                title={doc?.title}
                description={doc?.description}
            >
                <div className="space-y-4">
                    {doc?.sections.map((section) => (
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

export default Signup
