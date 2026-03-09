import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        if (!email || !password) {
            setErrorMsg('이메일과 비밀번호를 입력해주세요.')
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)

        if (error) {
            console.error('Login error:', error)
            alert(`로그인 실패 원인: ${error.message}`) // Add detailed alert for user to see
            // 에러 메시지 한글화 처리 (간이)
            if (error.message.includes('Invalid login credentials')) {
                setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.')
            } else {
                setErrorMsg('로그인 중 오류가 발생했습니다.')
            }
        } else {
            // 성공 시 홈으로 이동
            navigate('/')
        }
    }

    return (
        <div className="flex-1 flex flex-col justify-center px-6 pb-20 mt-[-60px]">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4">
                    <span className="material-symbols-outlined text-4xl">shield_person</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">안전 지킴이</h1>
                <p className="text-sm text-slate-500 mt-2">안전한 우리 동네를 위한 첫걸음</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                {errorMsg && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl text-center">
                        {errorMsg}
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1" htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow"
                        placeholder="example@email.com"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1" htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow"
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                <div className="flex justify-end pt-1">
                    <button onClick={() => alert('비밀번호 찾기 기능은 준비 중입니다.')} type="button" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                        비밀번호를 잊으셨나요?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 mt-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary shadow-lg shadow-primary/30 active:scale-[0.98]'}`}
                >
                    {loading ? '로그인 중...' : '로그인'}
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-slate-500">계정이 없으신가요? </span>
                <Link to="/signup" className="font-bold text-primary hover:underline">회원가입</Link>
            </div>
        </div>
    )
}

export default Login
