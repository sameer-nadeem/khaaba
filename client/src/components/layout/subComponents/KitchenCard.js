import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { toast } from 'react-toastify'
import history from '../../../util/history'
const KitchenCard = ({ kitchen }) => {
    let ratingcheck = (avgRating) => {

        if (avgRating === 0) {
            return `--`
        }
        return `${avgRating}/5.00`

    }
    return (
        <div className="card justify-content-md-center kitchen-card">
            <LazyLoadImage effect="blur" src={`/uploads/kitchen-logos/${kitchen.logo}`} className="card-img-top rounded-image" alt="Logo" />
            <div className="row px-3  justify-content-sm-center">
                <div className="card-body">
                    <h5 className="card-title text-center pb-2">{`${kitchen.title}`}</h5>
                    <div className="bottom-0 ">
                        <span className="d-inline-block bottom-0">
                            <i className="fa fa-star checked star1"> </i>
                            <span className="d-inline-block text-align-center rating-font">{ratingcheck(kitchen.avgRating)}</span>
                        </span>
                        <a className="btn pull-right orange-btn" style={{ color: "white" }} onClick={() => history.push(`/kitchen/${kitchen._id}`)}>Menu </a>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default KitchenCard
