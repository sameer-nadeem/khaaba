import React, { useEffect } from 'react'
import ReviewStar from './reviewStar'

const ReviewTable = ({chefDetails}) =>{



return(
                      <div className="table-wrap">
                        <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                              <tr>
                                <th className="tble-heading">Rating</th>
                                <th className="tble-heading">Subject</th>
                                <th className="tble-heading">Reviews</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                              chefDetails.reviews.map(review => (
                               
                                <tr key={review._id}>
                                  <td>
                                    <ReviewStar rating = {review.rating}/>
                                  {/* {setChecked(review.rating)}
                                  <span className={`fa fa-star ${star1}`}></span>
                                  <span className={`fa fa-star ${star2}`}></span>
                                  <span className={`fa fa-star ${star3}`}></span>
                                  <span className={`fa fa-star ${star4}`}></span>
                                  <span className={`fa fa-star ${star5}`}></span> */}
                                  </td>
                                  <td>{review.review.heading}</td>
                                  <td>{review.review.body}</td>
                                </tr>
                              ))
                              
                              
                              
                              /* <tr>
                                <td>8675</td>
                                <td>Jhon Cena</td>
                                <td>4</td>
                                <td>Kamaaal shit hai yeh</td>
                            </tr>
                            <tr>
                                <td>8675</td>
                                <td>Jhon Cena</td>
                                <td>4</td>
                                <td>Kamaaal shit hai yeh</td>
                            </tr>
                            <tr>
                                <td>8675</td>
                                <td>Jhon Cena</td>
                                <td>4</td>
                                <td>Kamaaal shit hai yeh</td>
                            </tr>
                            <tr>
                                <td>8675</td>
                                <td>Jhon Cena</td>
                                <td>4</td>
                                <td>Kamaaal shit hai yeh</td>
                            </tr>
                            <tr>
                                <td>8675</td>
                                <td>Jhon Cena</td>
                                <td>4</td>
                                <td>Kamaaal shit hai yeh</td>
                            </tr>
                            <tr>
                                <td>8675</td>
                                <td>Jhon Cena</td>
                                <td>4</td>
                                <td>Kamaaal shit hai yeh</td>
                            </tr> */}
                          </tbody>
                        </table>
                        </div>
                        </div>











)}

export default ReviewTable