import React, { Fragment, useEffect, useState } from 'react'
import UserDetail from '../../modals/UserDetail'
import moment from 'moment'
const ChefOrderHsitoryTable = ({ chefOrders }) => {
    useEffect(() => {
        console.log(chefOrders)
    }, [])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userDetail, setUserDetail] = useState(null)
    const showUserDetail = (user) => {
        setUserDetail(user)
        setShow(true)
    }

    return (
        <Fragment>
            <UserDetail user={userDetail} show={show} handleClose={handleClose} handleShow={handleShow} />
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
                            <th className="table-heading">Quantity</th>

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
                                        <button onClick={() => showUserDetail(order.user)} className="button buttonar buttond btn-sm">Details</button>
                                    </td>
                                    <td className="table-heading text-break">
                                        <ul className="list-group list-group-flush">
                                            {
                                                order.khaabay.map((k, i) => (
                                                    <li key={i} className="list-group-item">{k.khaaba.title}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    <td className="table-heading text-break">
                                        <ul className="list-group list-group-flush">
                                            {
                                                order.khaabay.map((k, i) => (
                                                    <li key={i} className="list-group-item">{k.quantity}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    < td className="table-heading text-break" > {order.totalPrice}</td>
                                    {/* <td className="table-heading text-break">x</td> */}

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className="row justify-content-center">
                    <div className="col-4 text-center">
                        {
                            chefOrders.loading && <img className='float-center' width="15%" src="/img/Ellipsis-1s-200px.gif" />

                        }
                    </div>
                </div>
            </div >
        </Fragment >
    )
}

export default ChefOrderHsitoryTable
