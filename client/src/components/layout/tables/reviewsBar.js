import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CarousalCard from './carousalCard'
import CarousalItem from './carouselItem'
import axios from 'axios'

import { getKitchenReviews } from '../../../actions/customer'

const ReviewsBar = ({ getKitchenReviews, kitchenReviews, kitchenid }) => {
  const [reviewsArr, setReviews] = React.useState([])
  const [arr2d, setarr2d] = React.useState([])

  const reviewsMath = (reviewsTest) => {
    let reviews = reviewsTest
    let newreviews = [...reviews]
    let lenreviews = reviews.length
    console.log(lenreviews)
    let div = lenreviews / 3
    let remainder = lenreviews % 3
    let newArr = [];
    while (newreviews.length) {
      newArr.push(newreviews.splice(0, 3));
    }
    console.log()
    console.log('set 2d', newArr)
    // spliceArray(reviews)
    setarr2d(newArr)
    if (div == 0 && remainder == 0) {

    }
    else if (div >= 1 && remainder == 0) {
      //     return(
      //         newArr.map=(reviews=> (
      //     <CarousalItem reviews = {reviews} />
      //     ))
      // )
    }
    else if (div < 1 && remainder == 0) {

    }
    else if (div < 1 && remainder != 0) {


    }
    else if (div >= 1 && remainder == 0) {

    }

  }

  const returnReviews = (async () => {

    // console.log(kitchenReviews)

    try {
      console.log(kitchenid)
      let reviews = await axios.get(`/api/user/view-reviews/${kitchenid}`)
      reviews = reviews.data.kitchenReviews
      console.log('get', reviews)
      reviewsMath(reviews)
      setReviews(reviews)
      return reviews
    } catch (error) {
      console.log('server ERror')
    }


  })

  // const spliceArray =(array) =>{
  //     let newArr = [];
  //     while(array.length){
  //     newArr.push(array.splice(0,3));
  //     }
  //     console.log(`!!!!!!!!!!!!!!!!!!`)
  //     console.log(newArr[0])
  // }

  useEffect(async () => {
    // await getKitchenReviews('6060e763bb69f004ab5db929')
    let res = await returnReviews()
    // console.log(kitchenReviews)
    // setReviews(kitchenReviews.kitchenReviews.kitchenReviews)
    // console.log(reviewsArr)
    // reviewsMath()
    // console.log(reviews)
    // console.log(chefOrders)
  }, [])

  return (
    <div className="container-fluid pt-5 pb-5 carousal-back">
      <div className="row justify-content-sm-center pb-5">
        <div className="review-heading d-inline"> Customer {'\u00A0'}<span className="fontclr-carousal"> Reviews</span> </div>
      </div>

      <div id="carouselExampleIndicators" className="carousel slide multi-item-carousel" data-bs-ride="carousel">



        {/* <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div> */}

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>



        <div className="carousel-inner">


          {/* <div className="carousel-item active">
               <div className="container">
                 <div className="row justify-content-sm-center">
                   <div className="col-12 col-md-4  mb-5">
                     <div>
                     <div className="card review-card" >
                      
                      <div className="card-body">
                                  
                        <div className="col d-flex justify-content-center text-center pt-2 ">
                        <i className="fa fa-star star-carousal checked " ></i>
                        <i className="fa fa-star star-carousal checked" ></i>
                        <i className="fa fa-star star-carousal checked" ></i>
                        <i className="fa fa-star star-carousal" ></i>
                        <i className="fa fa-star star-carousal" ></i>
                        
                      </div>
                     
                        
                        <p className="card-text pt-5">kuchumuchu</p>
                       
                        
                      </div>
                      
                    </div>
                       
                     </div>
                     
                   </div>
                   <div className="col-12 col-md-4  mb-5">
                     <div>
                     <div className="card review-card" >
                      
                      <div className="card-body">
                                  
                        <div className="col d-flex justify-content-center text-center pt-2 ">
                        <i className="fa fa-star star-carousal checked " ></i>
                        <i className="fa fa-star star-carousal checked" ></i>
                        <i className="fa fa-star star-carousal checked" ></i>
                        <i className="fa fa-star star-carousal" ></i>
                        <i className="fa fa-star star-carousal" ></i>
                        
                      </div>
                     
                        
                        <p className="card-text pt-5">kuchumuchu</p>
                       
                        
                      </div>
                      
                    </div>
                       
                     </div>
                     
                   </div>
                   
                   <div className="col-12 col-md-4  mb-5">
                     <div>
                     <div className="card review-card" >
                      
                      <div className="card-body">
                                  
                        <div className="col d-flex justify-content-center text-center pt-2 ">
                        <i className="fa fa-star star-carousal checked " ></i>
                        <i className="fa fa-star star-carousal checked" ></i>
                        <i className="fa fa-star star-carousal checked" ></i>
                        <i className="fa fa-star star-carousal" ></i>
                        <i className="fa fa-star star-carousal" ></i>
                        
                      </div>
                     
                        
                        <p className="card-text pt-5">kuchumuchu</p>
                       
                        
                      </div>
                      
                    </div>
                       
                     </div>
                     
                   </div>
                   
                 </div>
                 
               </div>
  
              
            </div> */}
          {arr2d.map((reviews, idx) => {
            if (idx === 0) {
              return (
                <CarousalItem reviews={reviews} active={'active'} />)
            }
            return (
              <CarousalItem reviews={reviews} active={''} />)

          })}

        </div>





      </div>
    </div>
  )
}

const mapStatesToProps = (state) => {
  return {
    kitchenReviews: state.kitchenReviews
  }
}

export default connect(mapStatesToProps, { getKitchenReviews, })(ReviewsBar)