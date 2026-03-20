import { Link } from 'react-router-dom'

const trustCards = [
    {
        title: '주변 제보 확인',
        value: '실시간',
        description: '지도에서 가까운 위험 제보와 안심 지점을 한 번에 살펴볼 수 있어요.',
        accent: 'text-primary',
        badge: '지도 기반',
    },
    {
        title: '동네 제보 공유',
        value: '주민 중심',
        description: '우리 동네에서 실제로 체감하는 정보를 빠르게 올리고 함께 확인해요.',
        accent: 'text-emerald-600',
        badge: '커뮤니티',
    },
    {
        title: '귀가 안심 지원',
        value: '바로 시작',
        description: '앱스토어를 거치지 않아도 웹에서 바로 열고 안심 귀가를 이어갈 수 있어요.',
        accent: 'text-amber-500',
        badge: '웹앱',
    },
]

const featureCards = [
    {
        title: '지도에서 바로 확인',
        description: '우리 동네 제보와 안심 정보를 지도 중심으로 빠르게 확인합니다.',
        icon: 'map',
        accent: 'bg-primary/10 text-primary',
    },
    {
        title: '위험 상황 빠른 제보',
        description: '사진과 위치를 함께 남겨 더 빠르고 정확하게 위험 상황을 공유합니다.',
        icon: 'warning',
        accent: 'bg-red-500/10 text-red-500',
    },
    {
        title: '귀가 안심 공유',
        description: '늦은 귀가나 이동 중인 상황을 가족과 안심 정보로 간단히 나눌 수 있어요.',
        icon: 'share_location',
        accent: 'bg-emerald-500/10 text-emerald-600',
    },
    {
        title: '동네 커뮤니티 제보',
        description: '주민이 직접 남기는 생활 안전 정보로 주변 분위기를 더 잘 파악할 수 있어요.',
        icon: 'forum',
        accent: 'bg-sky-500/10 text-sky-600',
    },
]

const steps = [
    {
        index: '01',
        title: '주변 상황을 확인하고',
        description: '지도를 열어 가까운 제보, 안전 지표, 지역 흐름을 빠르게 살펴봅니다.',
    },
    {
        index: '02',
        title: '직접 제보하거나 공유하고',
        description: '보이는 위험 상황을 사진과 위치로 남기고, 동네와 바로 연결합니다.',
    },
    {
        index: '03',
        title: '귀가하거나 가족과 안심 정보를 나눕니다',
        description: '늦은 시간 이동할 때도 안심 귀가 흐름을 이어갈 수 있습니다.',
    },
]

const useCases = [
    {
        title: '늦은 귀가가 걱정되는 날',
        description: '지금 주변에 어떤 제보가 있는지 먼저 확인하고, 안심 귀가 흐름으로 이어갈 수 있어요.',
        icon: 'nightlight',
    },
    {
        title: '아이 이동 경로를 살펴볼 때',
        description: '주변 안전 흐름과 생활 제보를 함께 보면서 오늘의 이동 동선을 더 차분하게 확인합니다.',
        icon: 'child_care',
    },
    {
        title: '동네에서 바로 알리고 싶을 때',
        description: '혼자 알고 끝내지 않고, 주민들과 빠르게 공유해 더 안전한 대응을 돕습니다.',
        icon: 'campaign',
    },
]

const accessCards = [
    {
        title: '아이폰에서는 Safari에서 홈 화면에 추가',
        description: '링크를 열고 홈 화면에 추가하면 앱처럼 빠르게 다시 들어올 수 있어요.',
        icon: 'phone_iphone',
    },
    {
        title: '안드로이드에서는 웹으로 바로 사용하거나 설치',
        description: '브라우저에서 바로 열 수 있고, 설치 안내가 보이면 홈 화면에 추가해서 쓸 수 있어요.',
        icon: 'android',
    },
]

function SectionIntro({ eyebrow, title, description, invert = false }) {
    const titleClassName = invert ? 'text-white' : 'text-slate-900'
    const descriptionClassName = invert ? 'text-slate-300' : 'text-slate-600'

    return (
        <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-[0.2em] text-primary">
                {eyebrow}
            </span>
            <h2 className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${titleClassName}`}>{title}</h2>
            <p className={`mt-4 text-base leading-7 sm:text-lg ${descriptionClassName}`}>{description}</p>
        </div>
    )
}

function AppPreview() {
    return (
        <div className="relative mx-auto w-full max-w-[530px]">
            <div className="absolute -left-8 top-10 hidden w-48 rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur md:block">
                <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                        <span className="material-symbols-outlined text-xl">shield</span>
                    </span>
                    <div>
                        <p className="text-sm font-bold text-slate-900">주변 제보 29건</p>
                        <p className="text-xs text-slate-500">실시간 반영</p>
                    </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    우리 동네 흐름을 지도에서 먼저 보고 필요한 행동으로 바로 이어갈 수 있어요.
                </p>
            </div>

            <div className="absolute -right-6 bottom-20 hidden w-44 rounded-[24px] border border-primary/10 bg-primary p-4 text-white shadow-[0_24px_60px_rgba(39,100,231,0.32)] lg:block">
                <p className="text-xs font-semibold tracking-[0.16em] text-white/70">안심 귀가</p>
                <p className="mt-2 text-lg font-bold">가족과 함께 보는 귀가 흐름</p>
                <p className="mt-2 text-sm leading-6 text-white/80">늦은 이동도 더 차분하게 확인하고 공유해요.</p>
            </div>

            <div className="relative mx-auto w-[320px] rounded-[40px] bg-slate-950 p-3 shadow-[0_40px_120px_rgba(15,23,42,0.3)] sm:w-[360px]">
                <div className="absolute left-1/2 top-0 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-950" />

                <div className="overflow-hidden rounded-[30px] bg-[#f6f8fc]">
                    <div className="bg-white px-4 pb-4 pt-5">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
                                <p className="text-lg font-bold text-slate-900">안전지킴이</p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100">
                                <span className="material-symbols-outlined text-slate-500">person</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-400">
                            <span className="material-symbols-outlined text-base">search</span>
                            동네를 검색해보세요
                        </div>
                    </div>

                    <div
                        className="relative h-[460px] overflow-hidden bg-[#dfe8f7]"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at top left, rgba(255,255,255,0.8), transparent 28%),
                                radial-gradient(circle at 80% 20%, rgba(16,185,129,0.12), transparent 18%),
                                linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px),
                                linear-gradient(135deg, #edf3ff 0%, #dfe8f7 100%)
                            `,
                            backgroundSize: 'auto, auto, 44px 44px, 44px 44px, auto',
                        }}
                    >
                        <div className="absolute left-4 right-4 top-4 flex gap-2 rounded-2xl bg-white/80 p-2 shadow-lg shadow-slate-200/70 backdrop-blur">
                            <button className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white">주민 신고</button>
                            <button className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white">커뮤니티 제보</button>
                        </div>

                        <div className="absolute right-4 top-20 flex flex-col gap-3">
                            {['add', 'remove'].map((icon) => (
                                <div key={icon} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-lg shadow-slate-300/60">
                                    <span className="material-symbols-outlined">{icon}</span>
                                </div>
                            ))}
                        </div>

                        <div className="absolute left-16 top-28 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                location_on
                            </span>
                        </div>
                        <div className="absolute left-28 top-44 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                warning
                            </span>
                        </div>
                        <div className="absolute right-20 top-56 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                forum
                            </span>
                        </div>
                        <div className="absolute left-24 bottom-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                home_pin
                            </span>
                        </div>

                        <div className="absolute bottom-5 left-4 right-4 rounded-[28px] bg-white/96 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-slate-900">현재 위치 안심 지수</h3>
                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">참고 지표</span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                                        <span className="material-symbols-outlined text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                        4.2 주민 활동 기반
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center">
                                            <p className="text-[11px] font-medium text-slate-500">커뮤니티</p>
                                            <p className="mt-1 text-lg font-bold text-emerald-600">16</p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center">
                                            <p className="text-[11px] font-medium text-slate-500">주민 신고</p>
                                            <p className="mt-1 text-lg font-bold text-red-500">13</p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center">
                                            <p className="text-[11px] font-medium text-slate-500">전체 제보</p>
                                            <p className="mt-1 text-lg font-bold text-primary">29</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-3 pt-1">
                                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-primary">
                                        <span className="text-3xl font-bold text-primary">85%</span>
                                    </div>
                                    <span className="text-xs font-bold text-primary">자세히 보기</span>
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
                            <p className="text-lg font-bold tracking-tight text-slate-900">안전지킴이</p>
                            <p className="text-xs font-medium text-slate-500">우리 동네 안심 정보 웹앱</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
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
                            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-primary/30 hover:text-primary sm:inline-flex"
                        >
                            로그인
                        </Link>
                        <Link
                            to="/app"
                            className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
                        >
                            웹에서 바로 시작
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary">
                                웹 중심 안전 서비스
                            </span>
                            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                우리 동네 안심 정보,
                                <br />
                                <span className="text-primary">한눈에 보고 바로 공유하세요</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                                위험 제보부터 귀가 안심 공유까지, 주민이 함께 만드는 생활 안전 서비스를 웹에서 바로 시작할 수 있습니다.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/app"
                                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(39,100,231,0.28)] transition-transform hover:-translate-y-0.5"
                                >
                                    웹에서 바로 시작
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-700 transition-colors hover:border-primary/30 hover:text-primary"
                                >
                                    기능 둘러보기
                                </a>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur">
                                    <p className="text-sm font-bold text-slate-900">웹에서 바로 사용</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">앱 설치를 기다리지 않고 링크를 열면 바로 시작됩니다.</p>
                                </div>
                                <div className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur">
                                    <p className="text-sm font-bold text-slate-900">주민 제보 중심</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">생활 속에서 체감하는 정보가 빠르게 이어지는 구조입니다.</p>
                                </div>
                                <div className="rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur">
                                    <p className="text-sm font-bold text-slate-900">귀가 안심 지원</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">이동 중에도 안심 흐름을 공유하며 더 차분하게 확인할 수 있어요.</p>
                                </div>
                            </div>
                        </div>

                        <AppPreview />
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
                                    <p className="text-lg font-bold text-slate-900">{card.title}</p>
                                    <span className={`text-sm font-bold ${card.accent}`}>{card.value}</span>
                                </div>
                                <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
                                <span className="mt-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{card.badge}</span>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <SectionIntro
                        eyebrow="주요 기능"
                        title="보고, 제보하고, 공유하는 생활 안전 흐름"
                        description="안전지킴이는 복잡한 보안 도구가 아니라, 주민이 생활 속에서 바로 열고 쓰는 동네 안전 웹앱입니다."
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
                                <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">{feature.title}</h3>
                                <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="how-it-works" className="bg-white/60 py-16">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="이용 방식"
                            title="복잡하지 않게, 필요한 흐름만 빠르게"
                            description="처음 보는 사람도 바로 이해할 수 있도록, 실제 사용 순서에 맞춘 짧은 흐름으로 구성했습니다."
                        />

                        <div className="mt-10 grid gap-5 lg:grid-cols-3">
                            {steps.map((step) => (
                                <article key={step.index} className="rounded-[30px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                                    <span className="text-sm font-black tracking-[0.24em] text-primary">{step.index}</span>
                                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{step.title}</h3>
                                    <p className="mt-3 text-base leading-7 text-slate-600">{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <SectionIntro
                        eyebrow="활용 장면"
                        title="생활 속에서 바로 떠오르는 안심 사용 장면"
                        description="너무 무겁지 않게, 하지만 실제로 도움이 되는 상황을 중심으로 구성했습니다."
                    />

                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {useCases.map((item) => (
                            <article key={item.title} className="rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-primary">
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                                <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="access" className="bg-slate-900 py-16 text-white">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionIntro
                            eyebrow="웹으로 시작하기"
                            title="앱스토어를 찾지 않아도 바로 시작할 수 있어요"
                            description="안전지킴이는 웹앱으로 먼저 열고 사용할 수 있습니다. 휴대폰 환경에 따라 홈 화면에 추가해서 더 빠르게 다시 들어올 수도 있어요."
                            invert
                        />

                        <div className="mt-10 grid gap-5 lg:grid-cols-2">
                            {accessCards.map((card) => (
                                <article key={card.title} className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                        <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                                    </div>
                                    <h3 className="mt-5 text-2xl font-bold tracking-tight">{card.title}</h3>
                                    <p className="mt-3 text-base leading-7 text-slate-300">{card.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-primary to-blue-600 px-6 py-10 text-white shadow-[0_30px_90px_rgba(39,100,231,0.28)] sm:px-10">
                        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-[0.18em] text-white/80">
                                    바로 시작
                                </span>
                                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">지금 바로 우리 동네 안전을 확인해보세요</h2>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                                    주민이 함께 보고 공유할수록, 지역 안전 정보는 더 빠르고 더 실용적으로 쌓입니다.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <Link
                                    to="/app"
                                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-base font-bold text-primary transition-transform hover:-translate-y-0.5"
                                >
                                    웹에서 바로 시작
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
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
                        <p className="font-bold text-slate-800">안전지킴이</p>
                        <p className="mt-2">우리 동네 안심 정보를 더 쉽게 보고, 더 빠르게 공유하는 웹앱</p>
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
