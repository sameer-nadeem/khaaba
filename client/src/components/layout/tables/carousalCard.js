import React, {useEffect} from 'react'
import Carousalstar from './reviewStarCarousal'
const CarousalCard =(review) =>
{
    useEffect(() => {
        console.log('1111111')
        console.log('card',review.review.rating)
    }, []);
    return(
                    
                    <div>
                    <div className="card review-card" >
                     
                     <div className="card-body">
                                 
                       <div className="col d-flex justify-content-center text-center pt-2 ">
                       <Carousalstar rating ={review.review.rating}/>
                       
                     </div>
                    
                     <h4 class="card-title pt-3 text-center crsl-heading">{review.review.review.heading}</h4>
                       <p className="card-text pt-5">{review.review.review.body}</p>
                      
                       
                     </div>
                     
                   </div>
                      
                    </div>
                    

                     
    )
}
export default CarousalCard