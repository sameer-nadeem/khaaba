import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
const CustomerOrderTable = ({ orders }) => {
    console.log(orders)
    return (
        <table className="table table-hover text-center">
            <thead>
                <tr>
                    <th className="text-dark">Order ID</th>
                    <th className="text-dark">Kitchen</th>
                    <th className="text-dark">Date</th>
                    <th className="text-dark">Order Details</th>
                    {/* <th className="text-dark">Order Type</th> */}
                    <th className="text-dark">Status</th>
                    <th className="text-dark">Furtur Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.activeOrders.map(order => (
                        <tr>
                            <td className="text-dark">{order._id}</td>
                            <td className="text-dark">{order.kitchen.title}</td>
                            <td className="text-dark">{moment(order.date).format('MM-dddd-YYYY hh:mm')}</td>
                            <td className="text-dark"><Link to="" className="btn detail-btn">Details</Link></td>
                            {/* <td className="text-dark">Delivery</td> */}
                            <td className="text-dark">{order.status}</td>
                            <td className="text-dark"><button type="submit" className="btn detail-btn">Action</button></td>
                        </tr>

                    ))

                }
                {
                    orders.completeOrders.map(order => (
                        <tr>
                            <td className="text-dark">{order._id}</td>
                            <td className="text-dark">{order.kitchen.title}</td>
                            <td className="text-dark">{moment(order.date).format('MM-dddd-YYYY hh:mm')}</td>
                            <td className="text-dark"><Link to="" className="btn detail-btn">Details</Link></td>
                            {/* <td className="text-dark">Delivery</td> */}
                            <td className="text-dark">{order.status}</td>
                            <td className="text-dark"><button type="submit" className="btn login-btn">Feedback</button></td>
                        </tr>

                    ))
                }
            </tbody>
        </table>
    )
}

export default CustomerOrderTable
