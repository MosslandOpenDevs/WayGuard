/**
 * 중심 좌표 주변으로 임의의 안전 시설 데이터를 생성하는 함수
 * @param {object} center - 중심 좌표 { lat, lng }
 * @param {number} count - 생성할 각 카테고리별 마커 개수 
 * @param {number} radius - 생성 반경 (단위: 대략적인 도 단위 변위, 0.005 정도면 약 500m)
 */
export const generateMockSafetyData = (center, count = 15, radius = 0.005) => {
    const categories = [
        { type: 'CCTV', icon: 'videocam', color: '#10B981', bgColor: 'bg-emerald-500' },
        { type: '가로등', icon: 'lightbulb', color: '#F59E0B', bgColor: 'bg-amber-500' },
        { type: '비상벨', icon: 'notifications_active', color: '#EF4444', bgColor: 'bg-red-500' },
        { type: '지킴이집', icon: 'home_health', color: '#2563EB', bgColor: 'bg-blue-600' }
    ];

    const mockData = [];
    let idCounter = 1;

    categories.forEach(category => {
        // 지킴이집이나 비상벨은 상대적으로 스폰 개수를 적게 조절
        const spawnCount = (category.type === '지킴이집' || category.type === '비상벨')
            ? Math.floor(count / 2)
            : count;

        for (let i = 0; i < spawnCount; i++) {
            // 중심 좌표 기준으로 랜덤하게 흩뿌리기
            const latOffset = (Math.random() - 0.5) * 2 * radius;
            const lngOffset = (Math.random() - 0.5) * 2 * radius;

            mockData.push({
                id: idCounter++,
                type: category.type,
                icon: category.icon,
                color: category.color,
                bgColor: category.bgColor,
                position: {
                    lat: center.lat + latOffset,
                    lng: center.lng + lngOffset
                },
                // 임의의 정보 추가
                info: `${category.type} #${idCounter}`
            });
        }
    });

    return mockData;
};
