const DEFAULT_REPORT_POSITION = { lat: 37.5006, lng: 127.0364 }

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
        let lat = Number(report.latitude) || DEFAULT_REPORT_POSITION.lat
        let lng = Number(report.longitude) || DEFAULT_REPORT_POSITION.lng

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
            type: '주민 신고',
            position: { lat, lng },
            icon: 'campaign',
            bgColor: 'bg-primary',
            color: '#2764e7',
            info: report.description || '',
            imageUrl: normalizeReportImageUrl(supabase, report.image_url),
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
