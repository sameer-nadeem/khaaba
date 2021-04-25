import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'
import DishCard from './subComponents/DishCard'
import ReviewsBar from './tables/ReviewsBar'
const Kitchen = () => {
    const { id } = useParams()
    const [khaabay, setKhaabay] = useState([])
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [chef, setChef] = useState({
        kitchen: {
            activeHours: {
                start: '--',
                end: '--'
            }
        },
        address: {}
    })
    const fetchData = () => {
        axios.get(`/api/kitchen/${id}`)
            .then(res => {
                setChef(res.data.kitchen)
                setLoading1(false)
                console.log(res.data.kitchen)

            })
            .catch(err => {
                setLoading1(false)
            })

        axios.get(`/api/kitchen/get-menu/${id}`)
            .then(res => {
                setKhaabay(res.data.khaabas)
                setLoading2(false)
            })
            .catch(err => {
                setLoading2(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    let ratingcheck = (avgRating) => {

        if (avgRating === 0) {
            return `--`
        }
        return `${avgRating}/5.00`

    }



    return (

        <>

            {!loading1 && !loading2 && < div className="menu-top-container" >

                <div className="container-fluid ">
                    <div className="row my-row align-items-end justify-content-between pb-2">


                        <div className="col-md-5 " style={{ width: "330px" }}>
                            <div className="row shopname"><p className="text-start">{chef.kitchen.title}</p></div>

                            <div className="row address"><p className="text-start">{ratingcheck(chef.kitchen.avgRating)}, Active Hours: {chef.kitchen.activeHours.start}-{chef.kitchen.activeHours.end} </p>  </div>


                            <div className="row address"> <p className="text-start">{chef.kitchen.description}</p></div>

                        </div>

                        <div className="col-md-5 " style={{ width: "330px" }} >

                            <div className="row  address"><p className="text-end">{chef.phone}</p></div>

                            <div className="row address text-end"><p className="text-end">{chef.address.addr}</p></div>


                        </div>


                    </div>
                </div>

            </div>
            }
            {!loading1 && !loading2 && <>
                <div className="container-fluid">

                    <div className="row tags-row justify-content-center pb-4">


                        <div className=" col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center pb-1" style={{ width: "150px" }}>
                            Appetizers
                      </div>

                        <div className="col-md-1 col-sm-12 menu-categories-btn d-flex  justify-content-center" style={{ width: "150px" }}>
                            Pizzas
                      </div>
                        <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center" style={{ width: "150px" }}>
                            Burgers
                      </div>
                        <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center" style={{ width: "150px" }}>
                            Desserts
                      </div>
                        <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center" style={{ width: "150px" }}>
                            Salad
                      </div>
                        <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center" style={{ width: "150px" }}>
                            Desi
                      </div>
                        <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center" style={{ width: "150px" }}>
                            Beverages
                      </div>
                        <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center" style={{ width: "150px" }}>
                            Baked
                      </div>


                    </div>


                    <div className="row dish-card-row px-5 pb-4">
                        {
                            console.log(khaabay)
                        }
                        {
                            khaabay.map((khaaba, i) => (

                                <div key={i} className="col-md-3 col-sm-10 d-flex justify-content-center pb-4">
                                    <DishCard khaaba={khaaba} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <ReviewsBar kitchenid={chef.kitchen._id} />
            </>
            }
            <div className="row justify-content-center">
                <div className="col-4 text-center">
                    {
                        (loading1 || loading2) && <img className='float-center' src="/img/Ellipsis-1s-200px.gif" />

                    }
                </div>
            </div>

        </>


    )

}

export default Kitchen
