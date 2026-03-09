import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setErrorMsg('')

        if (!email || !password || !nickname) {
            setErrorMsg('모든 필드를 입력해주세요.')
            return
        }

        if (password !== passwordConfirm) {
            setErrorMsg('비밀번호가 일치하지 않습니다.')
            return
        }

        if (password.length < 6) {
            setErrorMsg('비밀번호는 6자리 이상이어야 합니다.')
            return
        }

        setLoading(true)

        // 1. Supabase Auth 가입
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nickname: nickname,
                }
            }
        })

        setLoading(false)

        if (error) {
            console.error('Signup error:', error)
            alert(`회원가입 실패 원인: ${error.message}`) // Add detailed alert for user to see
            if (error.message.includes('already registered')) {
                setErrorMsg('이미 가입된 이메일입니다.')
            } else {
                setErrorMsg('회원가입 중 오류가 발생했습니다.')
            }
        } else {
            alert('회원가입이 완료되었습니다! 로그인해주세요.')
            navigate('/login')
        }
    }

    return (
        <div className="flex-1 flex flex-col pt-10 px-6 pb-20 overflow-y-auto">
            <div className="mb-8">
                <Link to="/login" className="inline-flex items-center text-slate-400 hover:text-slate-600 transition-colors mb-6">
                    <span className="material-symbols-outlined mr-1">arrow_back</span>
                    <span className="text-sm font-bold">뒤로가기</span>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">회원가입</h1>
                <p className="text-sm text-slate-500">안전 지킴이의 새로운 이웃이 되어주세요!</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
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
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1" htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow"
                        placeholder="이웃들에게 보일 이름을 입력하세요"
                        maxLength={10}
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
                        placeholder="6자리 이상 비밀번호 입력"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1" htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-shadow"
                        placeholder="비밀번호를 다시 한 번 입력하세요"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary shadow-lg shadow-primary/30 active:scale-[0.98]'}`}
                    >
                        {loading ? '가입 중...' : '가입하기'}
                    </button>
                </div>
            </form>

            <p className="mt-8 text-center text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                가입 시 안전 지킴이의 <span onClick={() => alert('이용약관 페이지는 준비 중입니다.')} className="underline cursor-pointer hover:text-primary transition-colors">이용약관</span> 및 <span onClick={() => alert('개인정보처리방침 페이지는 준비 중입니다.')} className="underline cursor-pointer hover:text-primary transition-colors">개인정보처리방침</span>에 동의하게 됩니다.
            </p>
        </div>
    )
}

export default Signup
