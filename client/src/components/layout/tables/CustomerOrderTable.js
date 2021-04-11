import React, { useState } from 'react'
import moment from 'moment'
import OrderDetail from '../../modals/OrderDetail'
import { Link } from 'react-router-dom'
const CustomerOrderTable = ({ orders }) => {
    console.log(orders)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [orderDetail, setOrderDetail] = useState(null)
    const showOrderDetail = (order) => {
        setOrderDetail(order)
        setShow(true)
    }
    return (
        <>
            <OrderDetail order={orderDetail} show={show} handleClose={handleClose} handleShow={handleShow} />
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th className="text-dark">Order ID</th>
                        <th className="text-dark">Kitchen</th>
                        <th className="text-dark">Date</th>
                        <th className="text-dark">Order Details</th>
                        {/* <th className="text-dark">Order Type</th> */}
                        <th className="text-dark">Status</th>
                        {/* <th className="text-dark">Furthur Actions</th> */}
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
                                {/* <td className="text-dark"><button type="submit" className="btn detail-btn">Action</button></td> */}
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
                                {/* <td className="text-dark"><button type="submit" className="btn login-btn">Feedback</button></td> */}
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default CustomerOrderTable
