import React, { useState, useEffect } from 'react'
import axios from 'axios'
import KitchenCard from './subComponents/KitchenCard'
import InfiniteScroll from 'react-infinite-scroll-component'
const Kitchens = () => {
    const [loading, setLoading] = useState(true)
    const [kitchens, setKitchens] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [sort, setSort] = useState('rating')


    const fetchData = (newReq = false, sortby = sort) => {
        setLoading(true)
        let page = newReq ? 1 : pageNumber
        axios.get(`/api/search/all/${page}/${sortby}`)
            .then(res => {
                console.log(res.data)
                setKitchens(prevKitchens => {
                    return [...new Set([...prevKitchens, ...res.data.kitchens])]
                })
                setLoading(false)
                setHasMore(res.data.kitchens.length > 0)
                setPageNumber(page + 1)

            }).catch(e => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setKitchens([])
        fetchData(true)
    }, [])

    const onSort = (sortby) => {
        setKitchens([])
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
                            <li><button onClick={() => onSort('ratingd')} style={{ color: "#ff6433" }} className="dropdown-item" >Rating Dsc</button></li>
                            <li><button onClick={() => onSort('ratinga')} style={{ color: "#ff6433" }} className="dropdown-item" >Rating Asc</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={kitchens.length}
                next={fetchData}
                hasMore={hasMore}
                className="row px-5 pb-5"
            >

                {
                    kitchens.map((kitchen, index) => {

                        return (
                            <div key={index} className="col-sm-12 col-md-6 col-lg-3 pb-5 d-flex justify-content-center">
                                <KitchenCard kitchen={kitchen} />
                            </div>
                        )


                    })
                }
                {
                    !loading && kitchens.length === 0 && <h1>Sorry nothing found..</h1>
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

export default Kitchens
