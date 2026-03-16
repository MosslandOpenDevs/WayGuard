const CATEGORY_COMMUNITY = '\uCEE4\uBBA4\uB2C8\uD2F0 \uC81C\uBCF4'
const CATEGORY_ROUTE = '\uC548\uC2EC \uACBD\uB85C'
const CATEGORY_HUB = '\uC548\uC804 \uAC70\uC810'

export const MOCK_CATEGORIES = {
    community: CATEGORY_COMMUNITY,
    route: CATEGORY_ROUTE,
    hub: CATEGORY_HUB,
}

export const generateMockSafetyData = (center, count = 12, radius = 0.005) => {
    const categories = [
        {
            type: CATEGORY_COMMUNITY,
            icon: 'forum',
            color: '#10B981',
            bgColor: 'bg-emerald-500',
            info: '\uC774\uC6C3\uC774 \uB0A8\uAE34 \uC548\uC804 \uBA54\uBAA8\uAC00 \uBAA8\uC778 \uC9C0\uC810',
            spawnCount: count,
        },
        {
            type: CATEGORY_ROUTE,
            icon: 'route',
            color: '#2563EB',
            bgColor: 'bg-blue-600',
            info: '\uADC0\uAC00 \uB3D9\uC120\uC5D0\uC11C \uC790\uC8FC \uC120\uD0DD\uB418\uB294 \uC548\uC2EC \uC774\uB3D9 \uCD95',
            spawnCount: Math.max(4, Math.floor(count * 0.75)),
        },
        {
            type: CATEGORY_HUB,
            icon: 'shield_person',
            color: '#F59E0B',
            bgColor: 'bg-amber-500',
            info: '\uB3C4\uC6C0 \uC694\uCCAD \uC2DC \uBE60\uB974\uAC8C \uCC3E\uC744 \uC218 \uC788\uB294 \uB3D9\uB124 \uC548\uC2EC \uAC70\uC810',
            spawnCount: Math.max(3, Math.floor(count * 0.5)),
        },
    ]

    const mockData = []
    let idCounter = 1

    categories.forEach((category) => {
        for (let index = 0; index < category.spawnCount; index += 1) {
            const latOffset = (Math.random() - 0.5) * 2 * radius
            const lngOffset = (Math.random() - 0.5) * 2 * radius

            mockData.push({
                id: idCounter,
                type: category.type,
                icon: category.icon,
                color: category.color,
                bgColor: category.bgColor,
                position: {
                    lat: center.lat + latOffset,
                    lng: center.lng + lngOffset,
                },
                info: `${category.info} #${idCounter}`,
            })

            idCounter += 1
        }
    })

    return mockData
}
