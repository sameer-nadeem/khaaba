import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'

const Kitchen = () => {
    const { id } = useParams()
    const [khaabay, setKhaabay] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        axios.get(`/api/kitchen/get-menu/${id}`)
            .then(res => {
                setKhaabay(res.data.khaabas)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='pt-5'>
            {
                khaabay.map(khaaba => <h4>{khaaba.title}</h4>)
            }

        </div>
    )

}

export default Kitchen
