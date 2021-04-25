import React, {useEffect} from 'react'

const ReviewStarCarousal = (rating)=>{
const setChecked = (rating) => {
  console.log(rating.rating)
  switch (rating.rating) {
    case 5:
        return(
            <div>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            </div>
        )
    case 4:
        return(
            <div>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal `}></span>
            </div>
        )
    case 3:
        return(
            <div>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            </div>
        )
    case 2:
        return(
            <div>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            </div>
        )
    case 1:
        return(
            <div>
            <span className={`fa fa-star star-carousal checked`}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            </div>
        )
    case 0:
        return(
            <div>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            <span className={`fa fa-star star-carousal `}></span>
            </div>
        )
    default:
      break;
    }

}



    return (
        setChecked(rating)
    )
}

export default ReviewStarCarousal