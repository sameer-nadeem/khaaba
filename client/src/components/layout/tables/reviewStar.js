import React, {useEffect} from 'react'

const ReviewStar = (rating)=>{
const setChecked = (rating) => {
  console.log(rating)
  switch (rating.rating) {
    case 5:
        return(
            <div>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            </div>
        )
    case 4:
        return(
            <div>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star `}></span>
            </div>
        )
    case 3:
        return(
            <div>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            </div>
        )
    case 2:
        return(
            <div>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            </div>
        )
    case 1:
        return(
            <div>
            <span className={`fa fa-star checked`}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            </div>
        )
    case 0:
        return(
            <div>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
            <span className={`fa fa-star `}></span>
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

export default ReviewStar