import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChefAnalytics, getChefDetails, getOwnReviews } from '../../actions/chef'
import ReviewTable from './tables/ChefHomeReviews'

const ChefHome =({getChefAnalytics,getChefDetails, getOwnReviews, chefDetails}) => {
    useEffect(() => {
        getChefAnalytics()
        getChefDetails()
        getOwnReviews()
        console.log(chefDetails)
    }, [])


return (
    <div className="container-fluid login-container pb-3">
        <div className="row justify-content-center pt-3">
            <div className="col-md-3 col-lg-3 pt-5 col-sm-10">
                <div className="card login-card">
                    <div className="card-body">
                        <div className="col text-center">
                            <img className="img-responsive img-circle" src="./img/icons/shopLogo.png" alt="" srcSet=""/>
                            <div className="info-heading">{chefDetails.kitchenName}</div>
                            <button className="button buttonadet buttond btn-sm">Edit Details</button>
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
                                <img className="img-responsive analytics-icons"  src="./img/icons/shopping-bag.png" alt="" srcSet=""/>
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
                                <img className="img-responsive analytics-icons"  src="./img/icons/star.png" alt="" srcSet=""/>
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
            <div className="col-md-3 col-lg-3 pt-5 col-sm-7">
                <div className="card chef-analytics-card">
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-5  col-sm-7 text-center">
                                <img className="img-responsive analytics-icons"  src="./img/icons/watch.png" alt="" srcSet=""/>
                            </div>
                            <div className="col-md-8 col-lg-7 col-sm-7 text-center">
                                <div className=" info-heading-medium pt-3"><p>75min</p></div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="info-heading pt-3">
                                <p>Average time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center pt-3">
            <div className="col-md-10 col-lg-10 pt-5 col-sm-12">
                <div className="card login-card">
                    <div className="card-body">
                        <div className="row justify-content-center align-items-center pb-3">
                            <div className="col text-center">
                                <div className="btn-group flex-wrap pt-3">
                            <button className="button buttontop buttonnow button-text">Monthly Revenue</button>
                            <button className="button buttontop buttonswitch button-text">Daily Orders</button>
                            <button className="button buttontop buttonswitch button-text">Reviews</button>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center pb-3 pt-3">
                        {<ReviewTable chefDetails={chefDetails}/>
                        /* <div className="chart">
                            <ul className="numbers">
                              <li><span>100%</span></li>
                              <li><span>50%</span></li>
                              <li><span>0%</span></li>
                            </ul>
                            <ul className="bars">
                              <li><div className="bar" data-percentage="50"></div><span>Option 01</span></li>
                              <li><div className="bar" data-percentage="30"></div><span>Option 02</span></li>
                              <li><div className="bar" data-percentage="60"></div><span>Option 03</span></li>
                              <li><div className="bar" data-percentage="100"></div><span>Option 04</span></li>
                              <li><div className="bar" data-percentage="80"></div><span>Option 05</span></li>
                            </ul>
                          </div>
                          <script type="text/javascript">
                            $(function(){
                              $('.bars li .bar').each(function(key, bar){
                                var percentage = $(this).data('percentage');
                                $(this).animate({
                                  'height' : percentage + '%'
                                },1000);
                              });
                            });
                            </script>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
)}

const mapStatesToProps = (state) => {
    return {
        chefDetails: state.chefDetails
    }
}

export default connect(mapStatesToProps, { getChefAnalytics, getChefDetails, getOwnReviews })(ChefHome)