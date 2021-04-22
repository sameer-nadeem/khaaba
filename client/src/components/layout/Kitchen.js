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
        <>
            <div className="menu-top-container" >

                <div className="container-fluid ">
                    <div className="row my-row align-items-end justify-content-between pb-2">


                        <div className="col-md-5 " style={{ width: "330px" }}>
                            <div className="row shopname"><p className="text-start">Aloo Shop</p></div>

                            <div className="row address"><p className="text-start">4.4/5       24:00-24:00 </p>  </div>


                            <div className="row address"> <p className="text-start">Authentic Local food at best prices </p></div>

                        </div>

                        <div className="col-md-5 " style={{ width: "330px" }} >

                            <div className="row  address"><p className="text-end">090078601</p></div>

                            <div className="row address text-end"><p className="text-end">DHA Phase 5,  Khayaban-e-Jinnah Road, Lahore</p></div>


                        </div>


                    </div>
                </div>

            </div>
            <div className="container-fluid">


                <div className="row tags-row justify-content-center pb-4">

                    <div className=" col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center pb-1" style={{ width: "150px" }}>
                        Just for you
        </div>

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

                <div className="row dish-card-row  pb-4 justify-content-center ">

                    <div className="col-md-4 col-sm-10 d-flex justify-content-center justify-content-md-end pb-2">

                        <div className="card dish-card">
                            <div className="image-container">
                                <img className="dish-image" src="/img/icons/white.png" alt="Dish preview" />
                            </div>

                            <div className="row align-items-end  justify-content-center" style={{ height: "80px" }}>
                                <div className="instant-khaaba-tag ">instant khaaba</div>
                                <div className="available-serving">  available servings: 4</div>

                                <div className="row justify-content-between">
                                    <div className="col dishname" >chicken karahi </div>
                                    <div className="col-1 text-end price " > Rs 0000 </div>
                                </div>
                                <div className="row justify-content-between">



                                    <div className="col dish-description">  steam cooekd steam cooked ekd steam cekd steam c </div>

                                </div>

                            </div>

                            <div className="row justify-content-start">

                                <div className="row justify-content-between">
                                    <div className="col dishname"><button type="submit" className=" add-to-cart-btn ">Add to cart</button></div>
                                    <div className="col-2 text-end price dish-count" >
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="counter-button-left">+</button>
                                            <button type="button" className="number-box">00</button>
                                            <button type="button" className="counter-button-right">-</button>
                                        </div>  </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>

        </>

    )

}

export default Kitchen
