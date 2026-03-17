function BottomSheet({
    open,
    title,
    description = '',
    onClose,
    children,
    footer = null,
}) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-900/45 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-[430px] px-4 pb-4" onClick={(event) => event.stopPropagation()}>
                <div className="rounded-[28px] bg-white shadow-[0_-20px_50px_rgba(15,23,42,0.24)] dark:bg-slate-900">
                    <div className="flex justify-center pt-3">
                        <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                    </div>

                    <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-4">
                        <div className="min-w-0 flex-1">
                            {title ? <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3> : null}
                            {description ? (
                                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
                            ) : null}
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            aria-label="닫기"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto px-5 pb-5">{children}</div>

                    {footer ? <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">{footer}</div> : null}
                </div>
            </div>
        </div>
    )
}

export default BottomSheet
