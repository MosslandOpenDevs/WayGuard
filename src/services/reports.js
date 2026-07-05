const DEFAULT_REPORT_POSITION = { lat: 37.5006, lng: 127.0364 }
const REPORT_LABEL = '\uC8FC\uBBFC \uC2E0\uACE0'
const REPORT_CATEGORY_LABELS = {
    light: '\uAC00\uB85C\uB4F1 \uACE0\uC7A5',
    cctv: 'CCTV \uC0AC\uAC01\uC9C0\uB300',
    facility: '\uC704\uD5D8 \uC2DC\uC124\uBB3C',
    suspicious: '\uC218\uC0C1\uD55C \uC0C1\uD669',
    other: '\uAE30\uD0C0 \uC704\uD5D8',
}

function toCoordinate(value, fallback) {
    if (value === null || value === undefined || value === '') {
        return fallback
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeReportImageUrl(supabase, imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.startsWith('http')) {
        return imageUrl
    }

    const { data } = supabase.storage.from('reports').getPublicUrl(imageUrl)
    return data?.publicUrl || imageUrl
}

export async function fetchReportMarkers(supabase) {
    const { data, error } = await supabase.from('reports').select('*')

    if (error) {
        throw error
    }

    const locationMap = new Map()

    return (data || []).map((report) => {
        let lat = toCoordinate(report.latitude, DEFAULT_REPORT_POSITION.lat)
        let lng = toCoordinate(report.longitude, DEFAULT_REPORT_POSITION.lng)

        const locKey = `${lat.toFixed(4)}_${lng.toFixed(4)}`
        if (locationMap.has(locKey)) {
            const count = locationMap.get(locKey)
            locationMap.set(locKey, count + 1)

            const radius = 0.00015 * Math.ceil(count / 6)
            const angle = count * (Math.PI / 3)
            lat += Math.sin(angle) * radius
            lng += Math.cos(angle) * radius
        } else {
            locationMap.set(locKey, 1)
        }

        return {
            id: `report_${report.id}`,
            type: REPORT_LABEL,
            category: report.category,
            categoryLabel: REPORT_CATEGORY_LABELS[report.category] || REPORT_LABEL,
            position: { lat, lng },
            icon: 'campaign',
            bgColor: 'bg-primary',
            color: '#2764e7',
            info: report.description || '',
            imageUrl: normalizeReportImageUrl(supabase, report.image_url),
            createdAt: report.created_at || null,
        }
    })
}

export async function uploadReportImage(supabase, userId, blob) {
    const fileName = `${userId}/${Date.now()}.jpg`
    const { error } = await supabase.storage
        .from('reports')
        .upload(fileName, blob, { contentType: 'image/jpeg' })

    if (error) {
        throw error
    }

    const { data } = supabase.storage.from('reports').getPublicUrl(fileName)
    return data?.publicUrl || null
}

export async function createReport(supabase, report) {
    const { error } = await supabase.from('reports').insert([report])

    if (error) {
        throw error
    }
}
