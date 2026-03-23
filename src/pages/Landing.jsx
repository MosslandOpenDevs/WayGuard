import { Link } from 'react-router-dom'

const trustCards = [
    {
        title: '주변 제보 확인',
        value: '실시간 반영',
        description: '지도 위에서 가까운 신고와 동네 흐름을 바로 확인하고 필요한 행동으로 이어갈 수 있어요.',
        accent: 'text-primary',
        badge: '지도 기반',
    },
    {
        title: '동네 소식 공유',
        value: '주민 중심',
        description: '이웃이 실제로 체감하는 위험 정보와 주의 메모를 빠르게 올리고 함께 확인해요.',
        accent: 'text-emerald-600',
        badge: '커뮤니티',
    },
    {
        title: '안심 귀가 연결',
        value: '웹에서 시작',
        description: '설치 없이 바로 열고, 가족과 함께 보는 귀가 흐름으로 늦은 시간 이동도 차분하게 이어가요.',
        accent: 'text-amber-500',
        badge: '웹앱',
    },
]

const featureCards = [
    {
        title: '지도에서 바로 확인',
        description: '우리 동네 신고와 안전 정보를 지도 중심 화면으로 빠르게 확인할 수 있어요.',
        icon: 'map',
        accent: 'bg-primary/10 text-primary',
    },
    {
        title: '위험 상황 빠른 제보',
        description: '사진과 위치를 함께 남겨 더 빠르고 정확하게 위험 상황을 공유할 수 있어요.',
        icon: 'warning',
        accent: 'bg-red-500/10 text-red-500',
    },
    {
        title: '귀가 상황 공유',
        description: '이동 중인 상태를 가족이나 보호자와 간단히 공유해 안심 흐름을 이어갈 수 있어요.',
        icon: 'share_location',
        accent: 'bg-emerald-500/10 text-emerald-600',
    },
    {
        title: '동네 커뮤니티 소식',
        description: '주민이 직접 남기는 생활 안전 메모를 통해 지역 분위기를 함께 파악할 수 있어요.',
        icon: 'forum',
        accent: 'bg-sky-500/10 text-sky-600',
    },
]

const steps = [
    {
        index: '01',
        title: '주변 상황 먼저 확인',
        description: '지도를 열면 가까운 제보와 안심 지표를 바로 볼 수 있어 지금 필요한 판단이 쉬워져요.',
    },
    {
        index: '02',
        title: '바로 제보하고 공유',
        description: '보이는 위험 상황을 사진, 설명, 위치와 함께 남기면 동네 흐름에 빠르게 반영돼요.',
    },
    {
        index: '03',
        title: '귀가 흐름까지 이어가기',
        description: '늦은 시간 이동에도 가족과 안심 정보를 공유하면서 차분하게 귀가를 이어갈 수 있어요.',
    },
]

const useCases = [
    {
        title: '늦은 밤 귀가가 걱정될 때',
        description: '지금 주변에 어떤 제보가 있는지 먼저 확인하고, 안심 귀가 흐름으로 이어갈 수 있어요.',
        icon: 'nightlight',
    },
    {
        title: '아이 이동 경로를 볼 때',
        description: '주변 안전 흐름과 생활 제보를 함께 보면서 더 안심되는 동선을 확인할 수 있어요.',
        icon: 'child_care',
    },
    {
        title: '동네에서 바로 알려야 할 때',
        description: '작은 위험도 지나치지 않고 주민과 빠르게 공유해 생활 안전 대응을 도울 수 있어요.',
        icon: 'campaign',
    },
]

const accessCards = [
    {
        title: '아이폰에서는 Safari에서 연 뒤 홈화면에 추가',
        description: '링크만 열면 바로 쓸 수 있고, 홈화면에 추가해두면 다음에도 더 빠르게 들어올 수 있어요.',
        icon: 'phone_iphone',
    },
    {
        title: '안드로이드에서는 웹으로 바로 사용하거나 설치',
        description: '브라우저에서 바로 시작하고, 설치 안내가 보이면 홈 화면에 두고 앱처럼 사용할 수 있어요.',
        icon: 'android',
    },
]

function SectionIntro({ eyebrow, title, description, invert = false }) {
    return (
        <div className="max-w-2xl">
            <span className={`inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] ${invert ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'}`}>
                {eyebrow}
            </span>
            <h2 className={`mt-4 text-3xl font-extrabold leading-[1.16] tracking-[-0.035em] sm:text-[2.45rem] ${invert ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
            <p className={`mt-4 text-[1.02rem] leading-[1.76] tracking-[-0.01em] sm:text-[1.08rem] ${invert ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
        </div>
    )
}

function HeroVisual() {
    return (
        <div className="relative hidden lg:flex lg:justify-center">
            <div className="absolute left-8 top-16 h-56 w-56 rounded-full bg-primary/14 blur-3xl" />
            <div className="absolute bottom-12 right-12 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" />

            <div className="relative w-full max-w-[350px]">
                <div className="absolute inset-x-8 top-8 h-[90%] rounded-[56px] bg-[radial-gradient(circle_at_top,_rgba(120,214,196,0.3),_rgba(255,255,255,0)_62%)] blur-2xl" />

                <div className="relative shadow-[0_36px_90px_rgba(15,23,42,0.16)]">
                    <div className="min-h-[700px] overflow-hidden rounded-[46px] border border-white/80 bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcfd_100%)] px-6 pb-10 pt-12 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-[1.38rem] font-extrabold leading-none tracking-[-0.035em] text-primary">안전지킴이</p>
                            <span className="material-symbols-outlined text-[18px] text-slate-400">notifications</span>
                        </div>

                        <div className="mt-6 rounded-[26px] bg-[linear-gradient(135deg,_#8ccfc8_0%,_#9bd7d3_35%,_#a9d8d0_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                            <div className="relative mx-auto h-[188px] w-full max-w-[224px]">
                                <div className="absolute inset-y-0 left-0 w-[49.5%] rounded-[20px] rounded-r-[14px] border border-white/70 bg-[linear-gradient(180deg,_#fbf9f3_0%,_#eef2ee_100%)] shadow-[0_12px_20px_rgba(15,23,42,0.14)]">
                                    <div className="absolute left-4 top-5 h-9 w-16 rotate-[-28deg] rounded-lg bg-[#d7edd2]" />
                                    <div className="absolute left-16 top-3 h-8 w-10 rotate-[-28deg] rounded-lg bg-[#eef6e5]" />
                                    <div className="absolute left-8 top-16 h-[2px] w-24 rotate-[18deg] bg-white/80" />
                                    <div className="absolute left-3 top-24 h-[2px] w-28 rotate-[-10deg] bg-white/70" />
                                    <div className="absolute left-9 top-32 h-[2px] w-24 rotate-[12deg] bg-white/65" />
                                    <div className="absolute left-5 top-40 h-[2px] w-20 rotate-[-6deg] bg-white/60" />
                                </div>

                                <div className="absolute inset-y-0 right-0 w-[49.5%] rounded-[20px] rounded-l-[14px] border border-white/70 bg-[linear-gradient(180deg,_#fbf9f3_0%,_#edf1ed_100%)] shadow-[0_12px_20px_rgba(15,23,42,0.14)]">
                                    <div className="absolute right-7 top-9 h-12 w-14 rotate-[18deg] rounded-xl bg-[#d8edd0]" />
                                    <div className="absolute right-16 top-[4.5rem] h-[2px] w-24 rotate-[-16deg] bg-white/80" />
                                    <div className="absolute right-5 top-24 h-[2px] w-20 rotate-[10deg] bg-white/70" />
                                    <div className="absolute right-10 top-[8.5rem] h-[2px] w-24 rotate-[-8deg] bg-white/65" />
                                    <div className="absolute right-7 top-[10.5rem] h-[2px] w-20 rotate-[8deg] bg-white/60" />
                                </div>

                                <div className="absolute left-1/2 top-3 bottom-3 w-[1px] -translate-x-1/2 bg-slate-300/80" />
                                <div className="absolute bottom-[-8px] left-1/2 h-4 w-7 -translate-x-1/2 rounded-b-full bg-[#eef2f5] shadow-[0_3px_6px_rgba(15,23,42,0.08)]" />

                                <div className="absolute left-[20px] top-[104px] flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-[0_8px_14px_rgba(15,23,42,0.12)]">
                                    <span className="material-symbols-outlined text-[16px] text-sky-500">location_on</span>
                                </div>
                                <div className="absolute right-[22px] top-[54px] flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-[0_8px_14px_rgba(15,23,42,0.12)]">
                                    <span className="material-symbols-outlined text-[16px] text-sky-500">location_on</span>
                                </div>
                                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-[0_16px_24px_rgba(37,99,235,0.34)]">
                                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        location_on
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 rounded-[20px] bg-[#DDF8EB] p-4 shadow-[0_14px_30px_rgba(22,163,74,0.08)]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#63EEB1] text-emerald-900">
                                    <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        shield
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold leading-[1.32] tracking-[-0.02em] text-emerald-900">현재 위치: 안심 구역</p>
                                    <p className="mt-1 text-[11px] font-medium leading-[1.45] tracking-[-0.01em] text-emerald-800/70">주변 500m 내 특이 사항 없음</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-[20px] bg-[#F2F4F7] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
                            <p className="text-[14px] font-bold leading-none tracking-[-0.015em] text-slate-800">최근 동네 제보</p>
                            <div className="mt-3 flex items-center gap-3 rounded-[16px] bg-white/70 p-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFE4D5] text-[#B45309]">
                                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        location_on
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold leading-[1.35] tracking-[-0.015em] text-slate-700">가로등 고장 제보</p>
                                    <p className="mt-0.5 text-[11px] font-medium leading-[1.4] tracking-[-0.01em] text-slate-400">2시간 전 접수</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Landing() {
    const year = new Date().getFullYear()

    return (
        <div id="top" className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-900">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8%] top-16 h-72 w-72 rounded-full bg-primary/14 blur-3xl" />
                <div className="absolute right-[-10%] top-80 h-80 w-80 rounded-full bg-emerald-500/12 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
            </div>

            <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center gap-3 text-primary">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                            <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
                        </span>
                        <div>
                            <p className="text-[1.06rem] font-extrabold leading-none tracking-[-0.03em] text-slate-900">안전지킴이</p>
                            <p className="text-[11px] font-medium leading-[1.35] tracking-[-0.01em] text-slate-500">우리 동네 안심 정보 웹앱</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-8 text-[15px] font-semibold tracking-[-0.01em] text-slate-600 md:flex">
                        <a href="#features" className="transition-colors hover:text-primary">
                            주요 기능
                        </a>
                        <a href="#how-it-works" className="transition-colors hover:text-primary">
                            이용 방식
                        </a>
                        <a href="#access" className="transition-colors hover:text-primary">
                            시작하기
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold tracking-[-0.01em] text-slate-700 transition-colors hover:border-primary/30 hover:text-primary sm:inline-flex"
                        >
                            로그인
                        </Link>
                        <Link
                            to="/app"
                            className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold tracking-[-0.01em] text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
                        >
                            웹에서 바로 시작
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.04fr)_430px] lg:items-center">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-primary">
                                주민 중심 안전 서비스
                            </span>
                            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-[3.65rem]">
                                우리 동네 안심 정보,
                                <br />
                                <span className="text-primary">바로 보고 바로 공유하세요</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-[1.06rem] leading-[1.82] tracking-[-0.01em] text-slate-600 sm:text-[1.1rem]">
                                위험 제보부터 귀가 안심 공유까지, 주민이 함께 만드는 생활 안전 서비스를 웹에서 바로 시작할 수 있습니다.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/app"
                                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-bold tracking-[-0.015em] text-white shadow-[0_18px_40px_rgba(39,100,231,0.28)] transition-transform hover:-translate-y-0.5"
                                >
                                    웹에서 바로 시작
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-base font-bold tracking-[-0.015em] text-slate-700 transition-colors hover:border-primary/30 hover:text-primary"
                                >
                                    기능 둘러보기
                                </a>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur">
                                    <p className="text-[15px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900">웹에서 바로 사용</p>
                                    <p className="mt-2 text-[13px] leading-[1.65] tracking-[-0.01em] text-slate-500">설치를 기다리지 않고 링크만 열면 바로 시작할 수 있어요.</p>
                                </div>
                                <div className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur">
                                    <p className="text-[15px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900">주민 제보 중심</p>
                                    <p className="mt-2 text-[13px] leading-[1.65] tracking-[-0.01em] text-slate-500">생활 속에서 체감하는 정보를 빠르게 확인하고 이어갈 수 있어요.</p>
                                </div>
                                <div className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur">
                                    <p className="text-[15px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900">안심 귀가 연결</p>
                                    <p className="mt-2 text-[13px] leading-[1.65] tracking-[-0.01em] text-slate-500">이동 중에도 안심 흐름을 공유하며 차분하게 확인할 수 있어요.</p>
                                </div>
                            </div>
                        </div>
                        <HeroVisual />
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                    <div className="grid gap-5 lg:grid-cols-3">
                        {trustCards.map((card) => (
                            <article
                                key={card.title}
                                className="rounded-[30px] border border-white/80 bg-white/85 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-[1.06rem] font-bold leading-[1.3] tracking-[-0.02em] text-slate-900">{card.title}</p>
                                    <span className={`text-sm font-bold tracking-[-0.01em] ${card.accent}`}>{card.value}</span>
                                </div>
                                <p className="mt-4 text-[14px] leading-[1.72] tracking-[-0.01em] text-slate-600">{card.description}</p>
                                <span className="mt-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold tracking-[0.04em] text-slate-500">{card.badge}</span>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <SectionIntro
                        eyebrow="주요 기능"
                        title="보고, 제보하고, 공유하는 생활 안전 흐름"
                        description="안전지킴이는 복잡한 행정 화면이 아니라 주민의 생활 속에서 바로 닿는 동네 안전 웹앱입니다."
                    />

                    <div className="mt-10 grid gap-5 lg:grid-cols-2">
                        {featureCards.map((feature) => (
                            <article
                                key={feature.title}
                                className="group rounded-[30px] border border-white/80 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-1"
                            >
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.accent}`}>
                                    <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                                </div>
                                <h3 className="mt-5 text-2xl font-bold leading-[1.24] tracking-[-0.03em] text-slate-900">{feature.title}</h3>
                                <p className="mt-3 text-base leading-[1.72] tracking-[-0.01em] text-slate-600">{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="how-it-works" className="bg-white/60 py-16">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="이용 방식"
                            title="복잡하지 않게, 필요한 흐름만 빠르게"
                            description="처음 보는 사람도 바로 이해할 수 있도록 실제 사용 순서에 맞춘 간결한 흐름으로 구성했습니다."
                        />

                        <div className="mt-10 grid gap-5 lg:grid-cols-3">
                            {steps.map((step) => (
                                <article key={step.index} className="rounded-[30px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                                    <span className="text-sm font-black tracking-[0.16em] text-primary">{step.index}</span>
                                    <h3 className="mt-4 text-2xl font-bold leading-[1.24] tracking-[-0.03em] text-slate-900">{step.title}</h3>
                                    <p className="mt-3 text-base leading-[1.72] tracking-[-0.01em] text-slate-600">{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <SectionIntro
                        eyebrow="사용 장면"
                        title="생활 속에서 바로 떠오르는 실제 사용 장면"
                        description="너무 무겁지 않지만, 실제로 필요한 순간에 자연스럽게 꺼내 볼 수 있도록 구성했습니다."
                    />

                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {useCases.map((item) => (
                            <article key={item.title} className="rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-primary">
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <h3 className="mt-5 text-2xl font-bold leading-[1.24] tracking-[-0.03em] text-slate-900">{item.title}</h3>
                                <p className="mt-3 text-base leading-[1.72] tracking-[-0.01em] text-slate-600">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="access" className="bg-slate-900 py-16 text-white">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="웹으로 시작하기"
                            title="앱스토어를 찾지 않아도 바로 시작할 수 있어요"
                            description="안전지킴이는 웹앱으로 먼저 열고 사용할 수 있습니다. 기기에 따라 홈화면에 추가해 더 빠르게 다시 들어올 수도 있어요."
                            invert
                        />

                        <div className="mt-10 grid gap-5 lg:grid-cols-2">
                            {accessCards.map((card) => (
                                <article key={card.title} className="rounded-[30px] border border-white/10 bg-white/10 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                        <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                                    </div>
                                    <h3 className="mt-5 text-2xl font-bold leading-[1.24] tracking-[-0.03em]">{card.title}</h3>
                                    <p className="mt-3 text-base leading-[1.72] tracking-[-0.01em] text-slate-300">{card.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-primary to-blue-600 px-6 py-10 text-white shadow-[0_30px_90px_rgba(39,100,231,0.28)] sm:px-10">
                        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white/80">
                                    바로 시작
                                </span>
                                <h2 className="mt-4 text-3xl font-extrabold leading-[1.16] tracking-[-0.035em] sm:text-[2.45rem]">지금 바로 우리 동네 안전 흐름을 확인해보세요</h2>
                                <p className="mt-4 max-w-2xl text-[1.02rem] leading-[1.76] tracking-[-0.01em] text-white/85">
                                    주변 정보를 보고 공유하는 작은 습관이 생활 안전을 더 빠르고 자연스럽게 이어줍니다.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <Link
                                    to="/app"
                                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-base font-bold tracking-[-0.015em] text-primary transition-transform hover:-translate-y-0.5"
                                >
                                    웹에서 바로 시작
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-4 text-base font-bold tracking-[-0.015em] text-white transition-colors hover:bg-white/10"
                                >
                                    기능 둘러보기
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200/70 bg-white/80">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <div>
                        <p className="font-bold tracking-[-0.02em] text-slate-800">안전지킴이</p>
                        <p className="mt-2 leading-[1.65] tracking-[-0.01em]">우리 동네 안심 정보를 함께 보고, 더 빠르게 공유하는 웹앱</p>
                    </div>
                    <div className="flex flex-wrap gap-4 font-medium">
                        <a href="#top" className="transition-colors hover:text-primary">
                            서비스 소개
                        </a>
                        <span>개인정보 처리방침</span>
                        <span>문의하기</span>
                    </div>
                    <p className="text-xs text-slate-400">© {year} 안전지킴이. 주민과 함께 만드는 생활 안전 서비스.</p>
                </div>
            </footer>
        </div>
    )
}

export default Landing
