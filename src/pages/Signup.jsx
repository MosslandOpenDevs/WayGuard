import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/feedback/ToastProvider'
import { supabase } from '../utils/supabaseClient'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const { showToast } = useToast()

    const handleSignup = async (event) => {
        event.preventDefault()
        setErrorMsg('')

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

    return (
        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-20 pt-10">
            <div className="mb-8">
                <Link to="/login" className="mb-6 inline-flex items-center text-slate-400 transition-colors hover:text-slate-600">
                    <span className="material-symbols-outlined mr-1">arrow_back</span>
                    <span className="text-sm font-bold">뒤로가기</span>
                </Link>
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">회원가입</h1>
                <p className="text-sm text-slate-500">안전 지킴이와 함께 우리 동네를 지켜보세요.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                {errorMsg && (
                    <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {errorMsg}
                    </div>
                )}

                <div>
                    <label className="ml-1 mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="email">
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                        placeholder="example@email.com"
                    />
                </div>

                <div>
                    <label className="ml-1 mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="nickname">
                        닉네임
                    </label>
                    <input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={(event) => setNickname(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                        placeholder="이웃에게 보여질 이름을 입력해 주세요"
                        maxLength={10}
                    />
                </div>

                <div>
                    <label className="ml-1 mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="password">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                        placeholder="6자 이상 비밀번호 입력"
                    />
                </div>

                <div>
                    <label className="ml-1 mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="passwordConfirm">
                        비밀번호 확인
                    </label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(event) => setPasswordConfirm(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                        placeholder="비밀번호를 다시 입력해 주세요"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-xl py-4 font-bold text-white transition-all ${loading ? 'cursor-not-allowed bg-primary/70' : 'bg-primary shadow-lg shadow-primary/30 active:scale-[0.98]'}`}
                    >
                        {loading ? '가입 중...' : '가입하기'}
                    </button>
                </div>
            </form>

            <p className="mx-auto mt-8 max-w-[280px] text-center text-xs leading-relaxed text-slate-400">
                가입 시 안전 지킴이의{' '}
                <span onClick={() => showToast({ title: '이용약관 페이지는 준비 중입니다.' })} className="cursor-pointer underline transition-colors hover:text-primary">
                    이용약관
                </span>
                {' '}및{' '}
                <span onClick={() => showToast({ title: '개인정보처리방침 페이지는 준비 중입니다.' })} className="cursor-pointer underline transition-colors hover:text-primary">
                    개인정보처리방침
                </span>
                에 동의하게 됩니다.
            </p>
        </div>
    )
}

export default Signup
