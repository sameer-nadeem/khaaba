import React, { useEffect } from 'react'

const reviewTable = ({chefDetails}) =>{
return(
                      <div className="table-wrap">
                        <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                              <tr>
                                <th className="tble-heading">Rating</th>
                                <th className="tble-heading">Reviews</th>
                              </tr>
                            </thead>
                            <tbody>
                              {chefDetails.reviews.map(review => (
                                <tr key={review._id}>
                                  <td>{review.rating}</td>
                                  <td>{review.review}</td>
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

export default reviewTable