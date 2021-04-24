import { useEffect, useState } from 'react'
import axios from 'axios'

export default function KitchenSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [kitchens, setKitchens] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setKitchens([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        const splitQ = query.split(" ").join()
        axios.get(`/api/search/${splitQ}/${pageNumber}`)
            .then(res => {
                console.log(res.data)
                setKitchens(prevKitchens => {
                    return [...new Set([...prevKitchens, ...res.data.kitchens])]
                })
                setLoading(false)
                setHasMore(res.data.kitchens.length > 0)
            }).catch(e => {
                setLoading(false)
                setError(true)
            })
    }, [query, pageNumber])

    return { loading, error, kitchens, hasMore }
}
