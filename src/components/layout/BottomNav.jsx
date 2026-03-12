import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/app';

function BottomNav() {
    return (
        <nav className="relative bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-6 pt-2 w-full flex items-center z-50">
            <div className="w-1/5 flex justify-center">
                <NavLink
                    to={NAV_ITEMS[0].path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                    }
                >
                    <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[0].icon}</span>
                    <span className="text-[10px] font-medium">{NAV_ITEMS[0].label}</span>
                </NavLink>
            </div>
            <div className="w-1/5 flex justify-center">
                <NavLink
                    to={NAV_ITEMS[1].path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                    }
                >
                    <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[1].icon}</span>
                    <span className="text-[10px] font-medium">{NAV_ITEMS[1].label}</span>
                </NavLink>
            </div>
            <div className="w-1/5 flex flex-col items-center justify-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3">
                    <NavLink
                        to="/safe-return"
                        className={({ isActive }) =>
                            `w-[60px] h-[60px] rounded-full shadow-lg shadow-primary/30 flex items-center justify-center border-4 border-white dark:border-slate-900 ${isActive ? 'bg-secondary' : 'bg-primary'} text-white`
                        }
                    >
                        <span className="material-symbols-outlined text-[32px] pt-1">shield_person</span>
                    </NavLink>
                </div>
            </div>
            <div className="w-1/5 flex justify-center">
                <NavLink
                    to={NAV_ITEMS[2].path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                    }
                >
                    <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[2].icon}</span>
                    <span className="text-[10px] font-medium">{NAV_ITEMS[2].label}</span>
                </NavLink>
            </div>
            <div className="w-1/5 flex justify-center">
                <NavLink
                    to={NAV_ITEMS[3].path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
                    }
                >
                    <span className="material-symbols-outlined text-2xl">{NAV_ITEMS[3].icon}</span>
                    <span className="text-[10px] font-medium">{NAV_ITEMS[3].label}</span>
                </NavLink>
            </div>
        </nav>
    );
}

export default BottomNav;
