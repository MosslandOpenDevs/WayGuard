import { NavLink } from 'react-router-dom'

function Header({ title, isHome, session }) {
    return (
        <header className="z-20 shrink-0 bg-white px-4 pb-4 pt-4 shadow-sm dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-3xl font-bold">shield_with_heart</span>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
                </div>
                {session ? (
                    <NavLink
                        to="/settings"
                        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                        <span className="material-symbols-outlined text-slate-500">person</span>
                    </NavLink>
                ) : (
                    <NavLink
                        to="/login"
                        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                        <span className="material-symbols-outlined text-slate-500">person</span>
                    </NavLink>
                )}
            </div>

            {isHome && (
                <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                    </div>
                    <input
                        className="w-full rounded-xl border-none bg-slate-100 py-3 pl-12 pr-4 text-sm transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 dark:bg-slate-800"
                        placeholder={'\uB3D9\uB124\uB97C \uAC80\uC0C9\uD574\uBCF4\uC138\uC694'}
                        type="text"
                    />
                </div>
            )}
        </header>
    )
}

export default Header
