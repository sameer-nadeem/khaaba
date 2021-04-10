import React, { Fragment, useEffect } from 'react'
import moment from 'moment'
const ChefOrderHsitoryTable = ({ chefOrders }) => {
    useEffect(() => {
        console.log(chefOrders)
    }, [])

    return (
        <Fragment>
            <h5 className="card-title text-center login-heading pt-3">In Progress</h5>
            <div
                className="table-responsive"
            // style="filter: blur(0px) brightness(100%)"
            >
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th className="table-heading">Order Id</th>
                            <th className="table-heading">Date</th>
                            <th className="table-heading">Customer</th>
                            <th className="table-heading">Items</th>
                            <th className="table-heading">Total(Pkr)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chefOrders.completeOrders.map(order => (
                                <tr key={order._id}>
                                    <td className="table-heading text-break">{order._id}</td>
                                    <td className="table-heading text-break">{moment(order.date).format('MM-dddd-YYYY hh:mm')}</td>
                                    <td className="table-heading text-break">{order.user.firstName}
                                        <br />
                                        <button className="button buttonar buttond btn-sm">Details</button>
                                    </td>
                                    <td className="table-heading text-break w-25">
                                        <ul className="list-group">
                                            {
                                                order.khaabay.map((k, i) => (
                                                    <li key={i} className="list-group-item">{k.khaaba.title}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    {/* <td className="table-heading text-break">x</td> */}
                                    < td className="table-heading text-break" > {order.totalPrice}</td>
                                    {/* <td className="table-heading text-break">x</td> */}

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div >
        </Fragment >
    )
}

export default ChefOrderHsitoryTable
