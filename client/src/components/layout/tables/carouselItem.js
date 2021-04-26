import React from 'react'
import CarousalCard from './carousalCard'

const CarousalItem = (reviews) => {
  const cardCaller = () => {
    let size = reviews.reviews.length
    console.log('--->', reviews)
    console.log(size)
    switch (size) {
      case 3:
        console.log('oof')
        return (
          <div className={`carousel-item ${reviews.active}`}>
            <div className="container">
              <div className="row justify-content-sm-center">
                <div className="col-12 col-md-4  mb-5">
                  <div>
                    <CarousalCard review={reviews.reviews[0]} />

                  </div>

                </div>
                <div className="col-12 col-md-4  mb-5">
                  <div>
                    <CarousalCard review={reviews.reviews[1]} />

                  </div>

                </div>

                <div className="col-12 col-md-4  mb-5">
                  <div>
                    <CarousalCard review={reviews.reviews[2]} />

                  </div>

                </div>

              </div>

            </div>


          </div>
        )
      case 2:
        return (
          <div className={`carousel-item ${reviews.active}`}>
            <div className="container">
              <div className="row justify-content-sm-center">
                <div className="col-12 col-md-4  mb-5">
                  <div>
                    <CarousalCard review={reviews.reviews[0]} />

                  </div>

                </div>
                <div className="col-12 col-md-4  mb-5">
                  <div>
                    <CarousalCard review={reviews.reviews[1]} />

                  </div>

                </div>


              </div>

            </div>


          </div>
        )
      case 1:
        return (
          <div className={`carousel-item ${reviews.active}`}>
            <div className="container">
              <div className="row justify-content-sm-center">


                <div className="col-12 col-md-4  mb-5">
                  <div>
                    {console.log('asasa', reviews.reviews[0])}
                    <CarousalCard review={reviews.reviews[0]} />

                  </div>

                </div>

              </div>

            </div>


          </div >
        )

    }
  }

  return (cardCaller())



}
export default CarousalItem