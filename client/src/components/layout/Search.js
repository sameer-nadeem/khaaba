import React, { useState, useRef, useCallback, useEffect } from 'react'
import KitchenCard from './subComponents/KitchenCard'
import KitchenSearch from './subComponents/KitchenSearch'
import { connect } from 'react-redux'
import { setQuery, setPageNumber } from '../../actions/search'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'

const Search = ({ query, pageNumber, setQuery, setPageNumber }) => {
    const [loading, setLoading] = useState(true)
    const [kitchens, setKitchens] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const fetchData = (newReq = false) => {
        setLoading(true)
        let page = newReq ? 1 : pageNumber
        axios.get(`/api/search/${query.split(" ").join()}/${page}`)
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
        fetchData(true)
    }, [])


    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)

    }

    const onSearch = () => {
        setKitchens([])
        setPageNumber(1)
        fetchData(true)
    }


    return (
        <div className="container-fluid pb-5 bg-white pt-5" >
            <div className="row justify-content-center mb-5">
                <div className="col-md-6 col-lg-6">
                    <div className="input-group ">
                        <input style={{ zIndex: "1" }} value={query} onChange={handleSearch} type="search" className="form-control rounded-edges " placeholder="Find Food/Kitchen" aria-label="Search"
                            aria-describedby="search-addon" />
                        <button type="button" onClick={onSearch} className="btn findfood-btn find-heading">Find Food</button>
                    </div>
                </div>
            </div>

            <InfiniteScroll
                dataLength={kitchens.length}
                next={fetchData}
                hasMore={hasMore}
                className="row px-5"
            >

                {
                    kitchens.map((kitchen, index) => {

                        return (
                            <div key={index} className="col-sm-12 col-md-6 col-lg-3 pb-2 d-flex justify-content-center">
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

const mapStateToProps = state => ({
    query: state.search.query,
    pageNumber: state.search.pageNumber
}
)

export default connect(mapStateToProps, { setQuery, setPageNumber })(Search)
