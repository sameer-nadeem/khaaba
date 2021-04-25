import React from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios'

const OrderDetail = ({ id, show, handleClose }) => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');
  const [reviewHeader, setReviewHeader] = React.useState('');
  const StarClick = (rating) => {
    // console.log(rating)
    setRating(rating);}
  const myChangeHandlerMesg = (event) => {
      setReview( event.target.value);
      // console.log(review)
    }
  const myChangeHandlerHead = (event) => {
    setReviewHeader( event.target.value);
    // console.log(review)
  }

  const onSubmit = () => {
    axios.post(`/api/user/review/${id}`,
    {
      rating: rating,
      review: {
        heading: reviewHeader,
        body: review
      }
    })
    handleClose()
  }
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
      {id && (
        <Modal
          show={(show === "modal-two")}
          onHide={handleClose}
          // aria-labelledby="contained-modal-title-vcenter"
          // style={{ border: "5px solid green" }}
          centered
        >
         
          <Modal.Body>
          <a href="#" class="close" onClick={handleClose}></a>
          <h5 class="  pt-3" > Subject</h5>
                    <input type="text" onChange={myChangeHandlerHead} id="manual-operations-input" class="form-control subject-fields" placeholder=""></input>
                    <h5 class="  pt-3" > Message</h5>
                    <input type="text" onChange={myChangeHandlerMesg} id="manual-operations-input" class="form-control message-fields" placeholder=""/>

                    <div class="row justify-content-center pt-3">
                    <div className= 'col d-flex justify-content-center text-center pt-2 '>
                    <div class="starsDiv">
                    <div class="rate">

                        
                        <input type="radio" onClick={() => StarClick(5)} id="star5" name="rate" value="5" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" onClick={() => StarClick(4)} id="star4" name="rate" value="4" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" onClick={() => StarClick(3)} id="star3" name="rate" value="3" />
                        <label for="star3"  title="text">3 stars</label>
                        <input type="radio" onClick={() => StarClick(2)} id="star2" name="rate" value="2" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" onClick={() => StarClick(1)} id="star1" name="rate" value="1" />
                        <label for="star1" title="text">1 star</label>
                    


                      </div>
                    </div>
                    </div>
                    </div>

                    <div class="row justify-content-center">
                        <button onClick={() => onSubmit()} class="btn signup-btn">Submit</button>
                    </div>
          </Modal.Body>
          

        </Modal>
      )}
    </>
  );
};

export default OrderDetail;
