import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChefActiveOrders } from '../../actions/chef'
import ChefOrderTable from './tables/ChefOrderTable'
const ChefOrders = ({ getChefActiveOrders, chefOrders }) => {
    useEffect(() => {
        getChefActiveOrders()
    }, [])

    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center pt-3 pb-5">
                <div className="col-md-10 col-lg-10 pt-5 col-sm-10" style={{ width: "90%" }}>
                    <div className="panel panel-table">
                        <div className="panel-body">
                            <div className="row justify-content-center align-items-center pb-3">
                                <div className="col text-center">
                                    <div className="btn-group pt-3">
                                        <Link to="/chef/orders">
                                            <button className="button buttontop buttonnow">Queue</button>
                                        </Link>
                                        <Link to="/chef/order-history">
                                            <button className="button buttontop buttonswitch">History</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <ChefOrderTable chefOrders={chefOrders} getChefOrders={getChefActiveOrders} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStatesToProps = (state) => {
    return {
        chefOrders: state.chefOrders
    }
}

export default connect(mapStatesToProps, { getChefActiveOrders })(ChefOrders)
