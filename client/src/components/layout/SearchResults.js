import React, { useState, useRef, useCallback } from 'react'
import KitchenCard from './subComponents/KitchenCard'
import KitchenSearch from './subComponents/KitchenSearch'
import { connect } from 'react-redux'
import { setQuery, setPageNumber } from '../../actions/search'
import InfiniteScroll from "react-infinite-scroll-component";


const SearchResults = ({ query, pageNumber, setQuery, setPageNumber }) => {
    const {
        kitchens,
        hasMore,
        loading,
        error
    } = KitchenSearch(query, pageNumber)
    const [qString, setQstring] = useState('')
    const observer = useRef()
    const lastElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(pageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(e) {
        setQstring(e.target.value)

    }

    const onSearch = () => {
        if (qString !== query && query !== '') {
            setQuery(qString)
            setPageNumber(1)
        }
    }


    return (
        <div className="container-fluid pb-5 bg-white pt-5" >
            <div className="row justify-content-center mb-5">
                <div className="col-md-6 col-lg-6">
                    <div className="input-group ">
                        <input style={{ zIndex: "1" }} value={qString} onChange={handleSearch} type="search" className="form-control rounded-edges " placeholder="Find Food/Kitchen" aria-label="Search"
                            aria-describedby="search-addon" />
                        <button type="button" onClick={onSearch} className="btn findfood-btn find-heading">Find Food</button>
                    </div>
                </div>
            </div>

            <div className="row px-5">


                {
                    kitchens.map((kitchen, index) => {
                        if (kitchens.length === index + 1) {
                            return (
                                <div ref={lastElementRef} key={index} className="col-sm-12 col-md-6 col-lg-3 pb-2 d-flex justify-content-center">
                                    <KitchenCard kitchen={kitchen} />
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="col-sm-12 col-md-6 col-lg-3 pb-2 d-flex justify-content-center">
                                    <KitchenCard kitchen={kitchen} />
                                </div>
                            )
                        }

                    })
                }
                {
                    !loading && kitchens.length === 0 && <h1>Sorry nothing found..</h1>
                }

            </div>
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

export default connect(mapStateToProps, { setQuery, setPageNumber })(SearchResults)
