import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/feedback/ToastProvider'
import { supabase } from '../utils/supabaseClient'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const { showToast } = useToast()

    const handleLogin = async (event) => {
        event.preventDefault()
        setErrorMsg('')

        if (!email || !password) {
            setErrorMsg('이메일과 비밀번호를 입력해 주세요.')
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)

        if (error) {
            console.error('Login error:', error)
            if (error.message.includes('Invalid login credentials')) {
                setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.')
            } else {
                setErrorMsg('로그인 중 오류가 발생했습니다.')
            }

            showToast({
                tone: 'error',
                title: '로그인에 실패했습니다.',
                description: error.message,
            })
            return
        }

        navigate('/')
    }

    return (
        <div className="mt-[-60px] flex flex-1 flex-col justify-center px-6 pb-20">
            <div className="mb-10 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-4xl">shield_person</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">안전 지킴이</h1>
                <p className="mt-2 text-sm text-slate-500">안전한 우리 동네를 위한 연결 서비스</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
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
                    <label className="ml-1 mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="password">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
                        placeholder="비밀번호를 입력해 주세요"
                    />
                </div>

                <div className="flex justify-end pt-1">
                    <button
                        onClick={() => showToast({ title: '비밀번호 찾기 기능은 준비 중입니다.' })}
                        type="button"
                        className="text-xs font-bold text-slate-500 transition-colors hover:text-primary"
                    >
                        비밀번호를 잊으셨나요?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-4 w-full rounded-xl py-4 font-bold text-white transition-all ${loading ? 'cursor-not-allowed bg-primary/70' : 'bg-primary shadow-lg shadow-primary/30 active:scale-[0.98]'}`}
                >
                    {loading ? '로그인 중...' : '로그인'}
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-slate-500">계정이 없으신가요? </span>
                <Link to="/signup" className="font-bold text-primary hover:underline">
                    회원가입
                </Link>
            </div>
        </div>
    )
}

export default Login
