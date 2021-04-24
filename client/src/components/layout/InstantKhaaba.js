import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import DishCard from './subComponents/DishCard'
const InstantKhaaba = () => {
    const [loading, setLoading] = useState(true)
    const [khaabay, setKhaabay] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [sort, setSort] = useState('def')

    const fetchData = (newReq = false, sortby = sort) => {
        let page = newReq ? 1 : pageNumber
        setLoading(true)
        axios.get(`/api/search/all-instant/${page}/${sortby}`)
            .then(res => {
                console.log(res.data)
                setKhaabay(prevKhaabay => {
                    return [...new Set([...prevKhaabay, ...res.data.khaabay])]
                })
                setLoading(false)
                setHasMore(res.data.khaabay.length > 0)
                setPageNumber(page + 1)

            }).catch(e => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData(true)
    }, [])
    const onSort = (sortby) => {
        setKhaabay([])
        setSort(sortby)
        fetchData(true, sortby)
    }
    return (
        <div className="container-fluid pb-5 bg-white pt-5" >
            <div className="row justify-content-center mb-5">
                {/* <div className="col-md-6 col-lg-6">
                    <div className="input-group">
                        <input style={{ zIndex: "1" }} value={query} onChange={handleSearch} type="search" className="form-control rounded-edges " placeholder="Find Food/Kitchen" aria-label="Search"
                            aria-describedby="search-addon" />
                        <button type="button" onClick={onSearch} className="btn findfood-btn find-heading">Find Food</button>


                    </div>
                </div> */}
                <div className="col-1">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                            style={{ borderColor: "#ff6433", color: "#ff6433" }}
                        >
                            Sort
                            </button>
                        <ul className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1">
                            <li><button onClick={() => onSort('pricea')} style={{ color: "#ff6433" }} className="dropdown-item" >Price Asc</button></li>
                            <li><button onClick={() => onSort('priced')} style={{ color: "#ff6433" }} className="dropdown-item" >Price Desc</button></li>
                            <li><button onClick={() => onSort('serving')} style={{ color: "#ff6433" }} className="dropdown-item" >Available Servings</button></li>

                        </ul>
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={khaabay.length}
                next={fetchData}
                hasMore={hasMore}
                className="row px-5"
            >

                {
                    khaabay.map((khaaba, index) => {

                        return (
                            <div key={index} className="col-sm-12 col-md-6 col-lg-3 pb-5 d-flex justify-content-center">
                                <DishCard khaaba={khaaba} />
                            </div>
                        )


                    })
                }
                {
                    !loading && khaabay.length === 0 && <h1>Sorry nothing found..</h1>
                }

            </InfiniteScroll>


            <div className="row justify-content-center">
                <div className="col-4 text-center">
                    {
                        loading && <img className='float-center' src="/img/Ellipsis-1s-200px.gif" />

                    }
                </div>
            </div>
        </div>


    )
}

export default InstantKhaaba
