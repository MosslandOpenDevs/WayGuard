import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

let nextToastId = 1

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const dismiss = useCallback((id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id))
    }, [])

    const showToast = useCallback(({ title, description = '', tone = 'default', duration = 2800 }) => {
        const id = nextToastId++
        setToasts((current) => [...current, { id, title, description, tone }])

        window.setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id))
        }, duration)
    }, [])

    const value = useMemo(() => ({ showToast, dismiss }), [dismiss, showToast])

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] mx-auto flex w-full max-w-[430px] flex-col gap-2 px-4">
                {toasts.map((toast) => {
                    const toneClassName = toast.tone === 'error'
                        ? 'border-red-200 bg-red-50 text-red-700'
                        : toast.tone === 'success'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 bg-white text-slate-700'

                    return (
                        <div
                            key={toast.id}
                            className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur animate-slide-up ${toneClassName}`}
                            role="status"
                            aria-live="polite"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">{toast.title}</p>
                                    {toast.description && (
                                        <p className="mt-1 text-xs leading-relaxed opacity-90">{toast.description}</p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => dismiss(toast.id)}
                                    className="rounded-full p-1 opacity-60 transition-opacity hover:opacity-100"
                                    aria-label="알림 닫기"
                                >
                                    <span className="material-symbols-outlined text-base">close</span>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ToastContext.Provider>
    )
}

function useToast() {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }

    return context
}

export { ToastProvider, useToast }
