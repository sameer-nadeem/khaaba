import React, { useState } from 'react'
import moment from 'moment'
import OrderDetail from '../../modals/OrderDetail'
import ReviewForm from '../../modals/reviewSubmit'
import { Link } from 'react-router-dom'
import axios from 'axios'
const CustomerOrderTable = ({ orders, getCustomerActiveOrders, getCustomerCompleteOrders }) => {
    console.log(orders)
    const [show, setShow] = useState("close");
    const handleClose = () => setShow("close");
    const handleShowOne = () => setShow("modal-one");
    const handleShowTwo = () => setShow("modal-two");


    const [orderDetail, setOrderDetail] = useState(null)
    const [kitchenID, setKitchenID] = useState(0)


    const showOrderDetail = (order) => {
        setOrderDetail(order)
        handleShowOne()
    }

    const showReviewForm = (order) => {
        setKitchenID(order.kitchen._id)
        handleShowTwo()
    }


    const onCancel = async (id) => {
        await axios.get(`/api/order/cancel/${id}`)
    }
    const onPickup = async (id) => {
        await axios.get(`/api/user/pickup/${id}`)
        getCustomerActiveOrders();
        getCustomerCompleteOrders();
    }

    const onFeedback = (id) => { }

    return (
        <>
            <OrderDetail order={orderDetail} show={show} handleClose={handleClose} />
            <ReviewForm id={kitchenID} show={show} handleClose={handleClose} />



            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th className="text-dark">Order ID</th>
                        <th className="text-dark">Kitchen</th>
                        <th className="text-dark">Date</th>
                        <th className="text-dark">Order Details</th>
                        {/* <th className="text-dark">Order Type</th> */}
                        <th className="text-dark">Status</th>
                        <th className="text-dark">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orders.activeOrders.map(order => (
                            <tr>
                                <td className="text-dark">{order._id}</td>
                                <td className="text-dark">{order.kitchen.title}</td>
                                <td className="text-dark">{moment(order.date).format('MM-dddd-YYYY hh:mm')}</td>
                                <td className="text-dark"><button onClick={() => showOrderDetail(order)} className="btn detail-btn">Details</button></td>
                                {/* <td className="text-dark">Delivery</td> */}
                                <td className="text-dark">{order.status}</td>
                                <td className="text-dark">--</td>
                            </tr>

                        ))

                    }
                    {
                        orders.completeOrders.map(order => (
                            <tr>
                                <td className="text-dark">{order._id}</td>
                                <td className="text-dark">{order.kitchen.title}</td>
                                <td className="text-dark">{moment(order.date).format('MM-dddd-YYYY hh:mm')}</td>
                                <td className="text-dark"><button onClick={() => showOrderDetail(order)} className="btn detail-btn">Details</button></td>
                                {/* <td className="text-dark">Delivery</td> */}
                                <td className="text-dark">{order.status}</td>
                                {order.status === 'Ready' && <td className="text-dark"><button onClick={() => onPickup(order._id)} type="submit" className="btn login-btn">Collect</button></td>}
                                {order.status === 'Cancelled' && <td className="text-dark">--</td>}
                                {order.status === 'Completed' && <td className="text-dark"><button onClick={() => showReviewForm(order)} className="btn login-btn">Feedback</button></td>}
                                {}
                            </tr>

                        ))
                    }
                </tbody>
            </table >
            <div className="row justify-content-center">
                <div className="col-4 text-center">
                    {
                        orders.loading && <img className='float-center' width="15%" src="/img/Ellipsis-1s-200px.gif" />

                    }
                </div>
            </div>
        </>
    )
}

export default CustomerOrderTable
