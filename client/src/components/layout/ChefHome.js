import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChefAnalytics, getChefDetails, getOwnReviews, getMonthlyOrders, getDailyOrders } from '../../actions/chef'
import ReviewTable from './tables/ChefHomeReviews'
import BarChartDaily from './tables/barChartFirst'
import BarChartMonthly from './tables/barChartSecond'
import ChefOrders from './ChefOrders'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ChefHome = ({ getChefAnalytics, getChefDetails, getOwnReviews, chefDetails, getMonthlyOrders, getDailyOrders, chefOrders }) => {
    useEffect(() => {
        getChefAnalytics()
        getChefDetails()
        getOwnReviews()
        getMonthlyOrders()
        getDailyOrders()
        // console.log(chefDetails)
        // console.log(chefOrders)
    }, [])
    const [toggle, toggleSet] = React.useState(1)
    const [btn1, setBtn1] = React.useState("button buttontop buttonnow button-text")
    const [btn2, setBtn2] = React.useState("button buttontop buttonswitch button-text")
    const [btn3, setBtn3] = React.useState("button buttontop buttonswitch button-text")

    const returnState = () => {
        if (toggle === 1) {
            return (
                <BarChartMonthly chartDataMonthly={chefDetails.MonthlyOrder} />

            )
        }
        if (toggle === 2) {
            return (
                <BarChartDaily chartDataDaily={chefDetails.dailyOrder} />
            )
        }
        if (toggle === 3) {
            return (
                <ReviewTable chefDetails={chefDetails} />
            )
        }
    }
    const toggleClick1 = () => {
        toggleSet(1)
        setBtn1("button buttontop buttonnow button-text")
        setBtn2("button buttontop buttonswitch button-text")
        setBtn3("button buttontop buttonswitch button-text")
    }
    const toggleClick2 = () => {
        toggleSet(2)
        setBtn1("button buttontop buttonswitch button-text")
        setBtn2("button buttontop buttonnow button-text")
        setBtn3("button buttontop buttonswitch button-text")

    }
    const toggleClick3 = () => {
        toggleSet(3)
        setBtn1("button buttontop buttonswitch button-text")
        setBtn2("button buttontop buttonswitch button-text")
        setBtn3("button buttontop buttonnow button-text")

    }


    return (
        <div className="container-fluid login-container pb-3">
            <div className="row justify-content-center pt-3">
                <div className="col-md-3 col-lg-3 pt-5 col-sm-10">
                    <div className="card login-card">
                        <div className="card-body">
                            <div className="col text-center">
                                <LazyLoadImage effect="blur" src={`/uploads/kitchen-logos/${chefDetails.kitchenLogo}`} className="card-img-top rounded-image" alt="Logo" />
                                <div className="info-heading pt-2">{chefDetails.kitchenName}</div>
                                <Link to='/chef/edit-profile'>
                                    <button className="button buttonadet buttond btn-sm">Edit Details</button>
                                </Link>
                                <div className="info-text">
                                    <p>{chefDetails.phone}</p>
                                    <p> {chefDetails.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-lg-3 pt-5 col-sm-7">
                    <div className="card chef-analytics-card">
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-5  col-sm-7 text-center">
                                    <img className="img-responsive analytics-icons" src="./img/icons/shopping-bag.png" alt="" srcSet="" />
                                </div>
                                <div className="col-md-8 col-lg-7 col-sm-7 pt-3 text-center">
                                    <div className=" info-heading-big"><p>{chefDetails.totalOrders}</p></div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="info-heading pt-3">
                                    <p>Orders Completed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-lg-3 pt-5 col-sm-7">
                    <div className="card chef-analytics-card">
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-5 col-sm-7 pt-3 text-center">
                                    <img className="img-responsive analytics-icons" src="./img/icons/star.png" alt="" srcSet="" />
                                </div>
                                <div className="col-md-8 col-lg-7 col-sm-7 pt-3 text-center">
                                    <div className=" info-heading-big"><p>{chefDetails.kitchenAvgRating}/5</p></div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="info-heading pt-3">
                                    <p>Average Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3 col-lg-3 pt-5 col-sm-7">
                <div className="card chef-analytics-card">
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-5  col-sm-7 text-center">
                                <img className="img-responsive analytics-icons"  src="./img/icons/watch.png" alt="" srcSet=""/>
                            </div>
                            <div className="col-md-8 col-lg-7 col-sm-7 text-center">
                                <div className=" info-heading-medium pt-3"><p></p></div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="info-heading pt-3">
                                <p>Average time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>
            <div className="row justify-content-center pt-3">
                <div className="col-md-10 col-lg-10 pt-5 col-sm-12">
                    <div className="card login-card">
                        <div className="card-body">
                            <div className="row justify-content-center align-items-center pb-3">
                                <div className="col text-center">
                                    <div className="btn-group flex-wrap pt-3">
                                        <button className={btn1} onClick={() => toggleClick1()} >Monthly Orders</button>
                                        <button className={btn2} onClick={() => toggleClick2()}>Daily Orders</button>
                                        <button className={btn3} onClick={() => toggleClick3()}>Reviews</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center pb-3 pt-3">
                                {returnState()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStatesToProps = (state) => {
    return {
        chefDetails: state.chefDetails,
        chefOrders: state.ChefOrders
    }
}

export default connect(mapStatesToProps, { getChefAnalytics, getChefDetails, getOwnReviews, getMonthlyOrders, getDailyOrders })(ChefHome)