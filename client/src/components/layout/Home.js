import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { addToCart } from '../../actions/customer'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { setQuery, setPageNumber } from '../../actions/search'
import DishCard from './subComponents/DishCard'
import KitchenCard from './subComponents/KitchenCard'
import history from '../../util/history'
const Home = ({ addToCart, setQuery, setPageNumber, query }) => {

  const [byHistory, sethistory] = React.useState([])

  const [dishcounter, setdishcounter] = React.useState([1, 1, 1, 1])

  const increasecounter = (index) => {

    let temparray = [...dishcounter]
    temparray[index] = temparray[index] + 1

    setdishcounter(temparray)
    console.log(temparray)
  }

  const decreasecounter = (index) => {

    let temparray = [...dishcounter]
    if (temparray[index] !== 1) {
      temparray[index] = temparray[index] - 1

      setdishcounter(temparray)
      console.log(temparray)
    }

  }
  const [popkitchens, setpopkitchens] = useState([])
  const [popLoading, setPopLoading] = useState(true)
  const [popkitchensCity, setPopkitchensCity] = useState([])
  const [popLoadingCity, setPopLoadingCity] = useState(true)
  useEffect(async () => {
    try {
      const res = await axios.get('/api/recommendations/byhistory')

      console.log(res.data.khaabay);

      sethistory(res.data.khaabay)

    }
    catch (error) {
      console.log(error);

      //toast error something went wrong please try again
    }


    try {
      const res = await axios.get('/api/recommendations/bypopularity')

      setPopkitchensCity(res.data.chefs)
      setPopLoadingCity(false)

    }
    catch (error) {
      console.log(error);

      //toast error something went wrong please try again
    }




    let nav = await navigator.geolocation.getCurrentPosition(async (position) => {
      const res = await axios.get(`/api/recommendations/bylocation/${position.coords.latitude}/${position.coords.longitude}`)
      setpopkitchens(res.data.chefs)
      setPopLoading(false)
      console.log(position.coords.latitude, position.coords.longitude)

    }, showError);

    function showError(error) {
      toast.error("Geolocation Error");
      setPopLoading(false)

    }

    // const res= await axios.get('/api/recommendations/bylocation/31.401068715387026/74.26103820925032')
    // setpopkitchens(res.data.chefs)
    // getPopularKitchens()
  }, []
  )




  
  console.log(popkitchens)

  let ratingcheck = (avgRating) => {

    if (avgRating === 0) {
      return `--`
    }
    return `${avgRating}/5.00`

  }


  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  const onSearch = () => {
    if (query !== '')
      history.push('/search')
  }



  return (


    <Fragment>

      <div className="container-fluid home-container fitted justify-content-center">

        <div className="row">

          <div className="col-12 col-sm-5 align-bottom ">

            <h5 className="search-heading "> All your favourite Kitchens under <br />one roof</h5>

          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <h4 className="search-subheading ">Khaaba is the place to satisfy all your <br></br>cravings for delicious homecooked food  </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="input-group ">
              <input style={{ zIndex: "1" }} value={query} onChange={handleSearch} type="search" className="form-control rounded-edges " placeholder="Find Food/Kitchen" aria-label="Search"
                aria-describedby="search-addon" />
              <button type="button" onClick={onSearch} className="btn findfood-btn find-heading">Find Food</button>
            </div>
          </div>
        </div>
      </div>







      {/* </div> */}
      <div className="container-fluid  ">

        <div className="row strip"> </div>


        <div className="col-md-5">


          <div className="khaabatry-card p-5">
            <div className="row"> <h3 className="color-orange semibold"> Instant Khaaba</h3></div>
            <div className="row">
              <h4> Instant Khaaba is a quick way to find your nearest ready made meals.  Select from a list ready to eat servings in your area</h4>
            </div>
            <div className="row justify-content-end">
              <div className="col-md-4 form-group">


                <button className="btn pull-right orange-btn" type="submit" onClick={() => history.push('/instant-khaaba')}>Try Now</button>

              </div>

            </div>
          </div>
        </div>

      </div>


      <div className="container-fluid pb-5 bg-white" >
        <div className="row justify-content-sm-center pb-5">
          {
            popkitchens.length !== 0 && <div className=" review-heading d-inline "> Kitchens<span className="color-orange semibold"> Near You</span> </div>
          }
        </div>
        <div className="row justify-content-center">
          <div className="col-4 text-center">
            {
              popLoading && <img className='float-center' src="/img/Ellipsis-1s-200px.gif" />

            }
          </div>
        </div>
        <div className="row justify-content-sm-evenly px-5 ">


          {

            !popLoading && popkitchens.map((chef, index) => (
              <div key={`${index}`} className="col-sm-12 col-md-6 col-lg-3 pb-2 d-flex justify-content-center">
                <KitchenCard kitchen={chef.kitchen} />
                {/* <div className="card justify-content-md-center kitchen-card">

                  <LazyLoadImage effect="blur" src={`/uploads/kitchen-logos/${chef.kitchen.logo}`} className="card-img-top rounded-image" alt="Logo" />
                  <div className="row px-3  justify-content-sm-center">
                    <div className="card-body">

                      <h5 className="card-title text-center pb-2">{`${chef.kitchen.title}`}</h5>
                      <div className="bottom-0 ">
                        <span className="d-inline-block bottom-0">
                          <i className="fa fa-star checked star1"> </i>
                          <span className="d-inline-block text-align-center rating-font">{ratingcheck(chef.kitchen.avgRating)}</span>
                        </span>
                        <a className="btn pull-right orange-btn" style={{ color: "white" }} onClick={() => toast.error(`Feature underconstruction`)}>Menu </a>

                      </div>
                    </div>
                  </div>


                </div> */}

              </div>
            ))

          }





        </div>
      </div>
      <div className="container-fluid pt-5 pb-5 bg-orange" >
        <div className="row justify-content-sm-center pb-5">
          <div className="review-heading d-inline "> Available<span className="color-white semibold"> Cuisines</span> </div>
        </div>
        <div className="row justify-content-center px-lg-5 ">
          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card"  >
              <div className="image-container">
                <LazyLoadImage className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Appetizer</h5>

                </div>
              </div>
            </div>

          </div>
          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card" >
              <div className="image-container">
                <LazyLoadImage effect="blur" className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Pizzas</h5>


                </div>
              </div>
            </div>
          </div>

          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card"  >
              <div className="image-container">
                <LazyLoadImage effect="blur" className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Burgers</h5>

                </div>
              </div>
            </div>
          </div>

          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card"  >
              <div className="image-container">
                <LazyLoadImage effect="blur" className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Desserts</h5>

                </div>
              </div>
            </div>
          </div>

          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card" >
              <div className="image-container">
                <LazyLoadImage effect="blur" className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Salad</h5>

                </div>
              </div>
            </div>
          </div>

          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card"  >
              <div className="image-container">
                <LazyLoadImage effect="blur" className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Desi</h5>

                </div>
              </div>
            </div>
          </div>

          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card" >
              <div className="image-container">
                <LazyLoadImage effect="blur" className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Beverages</h5>

                </div>
              </div>
            </div>
          </div>


          <div className="col col-md-3 d-flex justify-content-center pb-4" >

            <div className="card cusine-card"  >
              <div className="image-container">
                <LazyLoadImage effect="blur" className="dish-image-small" src="appetizer.jpg" alt="Dish preview" />
              </div>
              <div className="row px-3">
                <div className="card-body">

                  <h5 className="card-title text-center pb-2">Baked</h5>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="container-fluid pt-5 pb-5 bg-white" >
        <div className="row justify-content-sm-center pb-5">
          <div className=" review-heading d-inline "> Popular Kitchens<span className="color-orange semibold"> in your City</span> </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4 text-center">
            {
              popLoadingCity && <img className='float-center' src="/img/Ellipsis-1s-200px.gif" />

            }
          </div>
        </div>
        <div className="row justify-content-sm-evenly px-5 ">


          {

            !popLoadingCity && popkitchensCity.map((chef, index) => (
              <div key={`${index}`} className="col-sm-12 col-md-6 col-lg-3 pb-2 d-flex justify-content-center">
                <KitchenCard kitchen={chef.kitchen} />
                {/* <div className="card justify-content-md-center kitchen-card">

                  <LazyLoadImage effect="blur" src={`/uploads/kitchen-logos/${chef.kitchen.logo}`} className="card-img-top rounded-image" alt="Logo" />
                  <div className="row px-3  justify-content-sm-center">
                    <div className="card-body">

                      <h5 className="card-title text-center pb-2">{`${chef.kitchen.title}`}</h5>
                      <div className="bottom-0 ">
                        <span className="d-inline-block bottom-0">
                          <i className="fa fa-star checked star1"> </i>
                          <span className="d-inline-block text-align-center rating-font">{ratingcheck(chef.kitchen.avgRating)}</span>
                        </span>
                        <a className="btn pull-right orange-btn" style={{ color: "white" }} onClick={() => toast.error(`Feature underconstruction`)}>Menu </a>

                      </div>
                    </div>
                  </div>


                </div> */}

              </div>
            ))

          }





        </div>
      </div>
      <div className="container-fluid pt-5 pb-5 bg-orange" >

        {byHistory.length !== 0 && <div className="row justify-content-sm-center pb-5">
          <div className="review-heading d-inline"> Loved it?<span className="color-white semibold"> Order again...</span> </div>
        </div>
        }
        <div className="row dish-card-row px-5  pb-4 justify-content-center ">


          {

            byHistory.map((khaabay, index) => (


              <div className="col-md-3 col-sm-10 d-flex justify-content-center  pb-2">

                <DishCard khaaba={khaabay.khaaba} />

                {/* <div className="card dish-card">
                  <div className="image-container">
                    <LazyLoadImage effect="blur" className="dish-image-small2" src="appetizer.jpg" alt="Dish preview" />
                  </div>
                  <div className="row align-items-end justify-content-center height-80 px-1">
                    <div className="row justify-content-between">
                      <div className="col dishname">{`${khaabay.khaaba.title}`} </div>
                      <div className="col-2 text-end price" > {`Rs ${khaabay.khaaba.price}`} </div>
                    </div>
                    <div className="row">

                      <div className="col"> {`${khaabay.khaaba.description}`} </div>
                    </div>
                  </div>
                  <div className="row justify-content-start px-1">

                    <div className="row justify-content-between">
                      <div className="col dishname"><button onClick={() => addToCart(khaabay.khaaba.kitchen, khaabay.khaaba._id, dishcounter[index], khaabay.khaaba.price, khaabay.khaaba.title)} type="submit" className=" add-to-cart-btn " >Add to cart</button></div>
                      <div className="col-2 text-end price dish-count" >
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" className="counter-button-left" onClick={() => decreasecounter(index)} >-</button>
                          <button type="button" className="number-box text-center"> { `${dishcounter[index]}`}</button>
                          <button type="button" className="counter-button-right" onClick={() => increasecounter(index)}>+</button>
                        </div>  </div>
                    </div>
                  </div>
                </div> */}
              </div>
            ))
          }

        </div>

      </div>



    </Fragment >


  )
}

const mapStateToProps = state => (
  {
    query: state.search.query
  }
)

export default connect(mapStateToProps, { addToCart, setQuery, setPageNumber })(Home)

