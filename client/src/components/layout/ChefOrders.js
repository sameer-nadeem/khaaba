import React, { useEffect } from 'react'
import './css/haseeb.css'
import { connect } from 'react-redux'
import { getChefActiveOrders } from '../../actions/chef'
const ChefOrders = ({ getChefActiveOrders }) => {
    useEffect(() => {
        getChefActiveOrders()
    }, [])


    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center pt-3">
                <div className="col-md-10 col-lg-10 pt-5 col-sm-10">
                    <div className="panel panel-table">
                        <div className="panel-body">
                            <div className="row justify-content-center align-items-center pb-3">
                                <div className="col text-center">
                                    <div className="btn-group pt-3">
                                        <button className="button buttontop buttonnow">Queue</button>
                                        <button className="button buttontop buttonswitch">History</button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="table-responsive"
                            // style="filter: blur(0px) brightness(100%)"
                            >
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="tble-heading">Order Id</th>
                                            <th className="tble-heading">Date</th>
                                            <th className="tble-heading">Customer</th>
                                            <th className="tble-heading">Items</th>
                                            <th className="tble-heading">Quantity</th>
                                            <th className="tble-heading">Total(Pkr)</th>
                                            <th className="tble-heading">Order Type</th>
                                            <th className="tble-heading">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="tble-heading">8675</td>
                                            <td className="tble-heading">4-20-69</td>
                                            <td className="tble-heading">Jhon Cena</td>
                                            <td className="tble-heading">
                                                <ul>abcd</ul>
                                                <ul>fghj</ul>
                                            </td>
                                            <td className="tble-heading">8</td>
                                            <td className="tble-heading">6699</td>
                                            <td className="tble-heading">meow</td>
                                            <td className="tble-heading">
                                                <button className="button buttonar buttona btn-sm">Accept</button>
                                                <button className="button buttonar buttonr btn-sm">Reject</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="tble-heading">8675</td>
                                            <td className="tble-heading">4-20-69</td>
                                            <td className="tble-heading">Jhon Cena</td>
                                            <td className="tble-heading">
                                                <ul>abcd</ul>
                                                <ul>fghj</ul></td>
                                            <td className="tble-heading">8</td>
                                            <td className="tble-heading">6699</td>
                                            <td className="tble-heading">meow</td>
                                            <td className="tble-heading">
                                                <button className="button buttonar buttona btn-sm">Accept</button>
                                                <button className="button buttonar buttonr btn-sm">Reject</button>
                                            </td>
                                        </tr><tr>
                                            <td className="tble-heading">8675</td>
                                            <td className="tble-heading">4-20-69</td>
                                            <td className="tble-heading">Jhon Cena</td>
                                            <td className="tble-heading">
                                                <ul>abcd</ul>
                                                <ul>fghj</ul></td>
                                            <td className="tble-heading">8</td>
                                            <td className="tble-heading">6699</td>
                                            <td className="tble-heading">meow</td>
                                            <td className="tble-heading">
                                                <button className="button buttonar buttona btn-sm">Accept</button>
                                                <button className="button buttonar buttonr btn-sm">Reject</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h5 className="card-title text-center login-heading pt-3">In Progress</h5>
                            <div
                                className="table-responsive"
                            // style="filter: blur(0px) brightness(100%)"
                            >
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="tble-heading">Order Id</th>
                                            <th className="tble-heading">Date</th>
                                            <th className="tble-heading">Customer</th>
                                            <th className="tble-heading">Items</th>
                                            <th className="tble-heading">Quantity</th>
                                            <th className="tble-heading">Total(Pkr)</th>
                                            <th className="tble-heading">Order Type</th>
                                            <th className="tble-heading">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="tble-info">8675</td>
                                            <td className="tble-info">4-20-69</td>
                                            <td className="tble-info">
                                                <ol>Jhon Cena</ol>
                                                <ol><button className="button buttonar buttond btn-sm">Details</button></ol>
                                            </td>
                                            <td className="tble-info">
                                                <ul>abcd</ul>
                                                <ul>fghj</ul></td>
                                            <td className="tble-info">8</td>
                                            <td className="tble-info">6699</td>
                                            <td className="tble-info">meow</td>
                                            <td className="tble-info">
                                                <button className="button buttonar buttond btn-sm">Prepare</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="tble-info">8675</td>
                                            <td className="tble-info">4-20-69</td>
                                            <td className="tble-info">
                                                <ol>Jhon Cena</ol>
                                                <ol><button className="button buttonar buttond btn-sm">Details</button></ol>
                                            </td>
                                            <td className="tble-info">
                                                <ul>abcd</ul>
                                                <ul>fghj</ul></td>
                                            <td className="tble-info">8</td>
                                            <td className="tble-info">6699</td>
                                            <td className="tble-info">meow</td>
                                            <td className="tble-info">
                                                <button className="button buttonar buttond btn-sm">Prepare</button>
                                            </td>
                                        </tr><tr>
                                            <td className="tble-info">8675</td>
                                            <td className="tble-info">4-20-69</td>
                                            <td className="tble-info">
                                                <ol>Jhon Cena</ol>
                                                <ol><button className="button buttonar buttond btn-sm">Details</button></ol>
                                            </td>
                                            <td className="tble-info">
                                                <ul>abcd</ul>
                                                <ul>fghj</ul></td>
                                            <td className="tble-info">8</td>
                                            <td className="tble-info">6699</td>
                                            <td className="tble-info">meow</td>
                                            <td className="tble-info">
                                                <button className="button buttonar buttond btn-sm">Done</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { getChefActiveOrders })(ChefOrders)
